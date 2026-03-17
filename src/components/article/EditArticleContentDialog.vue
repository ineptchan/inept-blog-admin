<script lang="ts" setup>
import {computed, nextTick, onBeforeUnmount, ref, shallowRef, watch} from "vue"
import {ElMessage, ElMessageBox, ElNotification, type UploadRequestOptions} from "element-plus"
import {Crepe} from "@milkdown/crepe"
import {upload, uploadConfig} from "@milkdown/plugin-upload"
import {articleApi} from "@/api/modules/article.ts"
import {showError} from "@/util/errorUtil.ts"
import {uploadArticleAttachment, uploadArticleContentImage, uploadArticleVideo} from "@/util/articleUploadUtil.ts"
import "@milkdown/crepe/theme/common/style.css"
import "@milkdown/crepe/theme/nord.css"

const emit = defineEmits(['success'])

const isDialogVisible = ref(false)
const loading = ref(false)
const saving = ref(false)
const articleId = ref(0)
const articleTitle = ref('')
const loadToken = ref(0)

const originalContent = ref('')
const currentContent = ref('')

const isTitleDialogVisible = ref(false)
const titleDraft = ref('')
const titleSaving = ref(false)

const isVideoDialogVisible = ref(false)
const videoUploading = ref(false)
const uploadedVideoUrl = ref('')
const uploadedVideoName = ref('')

const isAttachmentDialogVisible = ref(false)
const attachmentUploading = ref(false)
const uploadedAttachmentUrl = ref('')
const uploadedAttachmentName = ref('')

const editorRootRef = ref<HTMLDivElement | null>(null)
const editorRef = shallowRef<Crepe | null>(null)

const dialogTitle = computed(() => {
  if (articleTitle.value) {
    return `编辑内容 - ${articleTitle.value}`
  }
  return '编辑内容'
})

const hasUnsavedChanges = computed(() => {
  if (loading.value) return false
  return currentContent.value !== originalContent.value
})

const contentStatusText = computed(() => {
  return hasUnsavedChanges.value ? '未保存修改' : '内容已保存'
})

const normalizeMarkdownLinkLabel = (rawName: string, fallback: string) => {
  const name = rawName.trim()
  const label = name ? name : fallback
  return label.replace(/[\[\]]/g, '')
}

const videoSnippet = computed(() => {
  if (!uploadedVideoUrl.value) return ''

  const filename = normalizeMarkdownLinkLabel(uploadedVideoName.value, '视频文件')
  return `[视频：${filename}](${uploadedVideoUrl.value})`
})

const videoHtmlSnippet = computed(() => {
  if (!uploadedVideoUrl.value) return ''

  return `<video src="${uploadedVideoUrl.value}" controls preload="metadata" style="max-width: 100%;"></video>`
})

const attachmentSnippet = computed(() => {
  if (!uploadedAttachmentUrl.value) return ''

  const filename = normalizeMarkdownLinkLabel(uploadedAttachmentName.value, '下载附件')
  return `[${filename}](${uploadedAttachmentUrl.value})`
})

const destroyEditor = async () => {
  const editor = editorRef.value
  if (!editor) return

  editorRef.value = null

  try {
    await editor.destroy()
  } catch {
    // Ignore editor destroy errors and continue cleanup.
  }

  if (editorRootRef.value) {
    editorRootRef.value.innerHTML = ''
  }
}

const uploadContentImage = async (file: File): Promise<string> => {
  if (!articleId.value) {
    ElMessage.warning('文章尚未加载完成，暂时无法上传图片')
    throw new Error('Article id is missing')
  }

  return uploadArticleContentImage(articleId.value, file)
}

const uploadContentImagesFromFiles = async (files: FileList, schema: any): Promise<any[]> => {
  const imageNode = schema?.nodes?.image
  if (!imageNode) return []

  const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
  if (imageFiles.length === 0) return []

  const nodes: any[] = []

  for (const file of imageFiles) {
    try {
      const url = await uploadContentImage(file)
      const node = imageNode.createAndFill({
        src: url,
        alt: file.name ?? '',
      })

      if (node) {
        nodes.push(node)
      }
    } catch {
      // Error is already surfaced by shared upload helper.
    }
  }

  return nodes
}

const mountEditor = async (content: string) => {
  await destroyEditor()
  await nextTick()

  if (!editorRootRef.value) return

  const editor = new Crepe({
    root: editorRootRef.value,
    defaultValue: content,
    featureConfigs: {
      [Crepe.Feature.ImageBlock]: {
        onUpload: uploadContentImage,
      },
    },
  })

  editor.editor
    .config((ctx) => {
      ctx.update(uploadConfig.key, (value) => ({
        ...value,
        enableHtmlFileUploader: true,
        uploader: (files, schema) => uploadContentImagesFromFiles(files, schema),
      }))
    })
    .use(upload)

  editor.on((listener) => {
    listener.markdownUpdated((_ctx, markdown) => {
      currentContent.value = markdown
    })
  })

  await editor.create()

  const normalizedContent = editor.getMarkdown()
  originalContent.value = normalizedContent
  currentContent.value = normalizedContent
  editorRef.value = editor
}

const fetchArticleContent = async (id: number) => {
  const token = ++loadToken.value
  loading.value = true

  const res = await articleApi.getArticleById(id)

  if (token !== loadToken.value) return

  if (!res.ok) {
    showError(res.error)
    isDialogVisible.value = false
    loading.value = false
    return
  }

  articleTitle.value = res.data.title

  await mountEditor(res.data.content ?? '')

  if (token !== loadToken.value) return

  loading.value = false
}

const openDialog = async (id: number) => {
  articleId.value = id
  isDialogVisible.value = true

  await fetchArticleContent(id)
}

const confirmDiscardIfNeeded = async (): Promise<boolean> => {
  if (!hasUnsavedChanges.value) return true

  try {
    await ElMessageBox.confirm(
      '当前内容尚未保存，确定要关闭吗？',
      '提示',
      {
        type: 'warning',
        confirmButtonText: '放弃修改',
        cancelButtonText: '继续编辑',
      }
    )

    return true
  } catch {
    return false
  }
}

const requestClose = async (): Promise<boolean> => {
  if (saving.value) return false

  const canClose = await confirmDiscardIfNeeded()
  if (!canClose) return false

  isDialogVisible.value = false
  return true
}

const handleBeforeClose = (done: () => void) => {
  void requestClose().then((canClose) => {
    if (canClose) done()
  })
}

const onCancel = () => {
  void requestClose()
}

const onSaveContent = async () => {
  const editor = editorRef.value

  if (!editor || !articleId.value || loading.value || saving.value) return

  const markdown = editor.getMarkdown()

  if (!markdown.trim()) {
    ElMessage.warning('文章内容不能为空')
    return
  }

  saving.value = true

  const res = await articleApi.updateArticle(articleId.value, {
    content: markdown,
  })

  if (res.ok) {
    originalContent.value = markdown
    currentContent.value = markdown

    ElNotification.success({
      title: '文章内容已更新',
    })

    emit('success')
    isDialogVisible.value = false
  } else {
    showError(res.error)
  }

  saving.value = false
}

const onOpenTitleDialog = () => {
  titleDraft.value = articleTitle.value
  isTitleDialogVisible.value = true
}

const onUpdateTitle = async () => {
  if (!articleId.value || titleSaving.value) return

  const nextTitle = titleDraft.value.trim()
  if (!nextTitle) {
    ElMessage.warning('标题不能为空')
    return
  }

  if (nextTitle === articleTitle.value) {
    isTitleDialogVisible.value = false
    return
  }

  titleSaving.value = true

  const res = await articleApi.updateArticle(articleId.value, {
    title: nextTitle,
  })

  if (res.ok) {
    articleTitle.value = res.data.title

    ElNotification.success({
      title: '标题已更新',
    })

    emit('success')
    isTitleDialogVisible.value = false
  } else {
    showError(res.error)
  }

  titleSaving.value = false
}

const onOpenVideoDialog = () => {
  isVideoDialogVisible.value = true
}

const onOpenAttachmentDialog = () => {
  isAttachmentDialogVisible.value = true
}

const onUploadVideo = async (options: UploadRequestOptions) => {
  if (!articleId.value) {
    options.onError(new Error('文章不存在') as any)
    return
  }

  videoUploading.value = true

  try {
    const uploadedUrl = await uploadArticleVideo(articleId.value, options.file)
    uploadedVideoUrl.value = uploadedUrl
    uploadedVideoName.value = options.file.name

    options.onSuccess(uploadedUrl)

    ElNotification.success({
      title: '视频上传成功',
    })
  } catch (error) {
    options.onError((error instanceof Error ? error : new Error('视频上传失败')) as any)
  } finally {
    videoUploading.value = false
  }
}

const onUploadAttachment = async (options: UploadRequestOptions) => {
  if (!articleId.value) {
    options.onError(new Error('文章不存在') as any)
    return
  }

  attachmentUploading.value = true

  try {
    const uploadedUrl = await uploadArticleAttachment(articleId.value, options.file)
    uploadedAttachmentUrl.value = uploadedUrl
    uploadedAttachmentName.value = options.file.name

    options.onSuccess(uploadedUrl)

    ElNotification.success({
      title: '附件上传成功',
    })
  } catch (error) {
    options.onError((error instanceof Error ? error : new Error('附件上传失败')) as any)
  } finally {
    attachmentUploading.value = false
  }
}

const copyByTextarea = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.top = '-9999px'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

const copySnippet = async (value: string, label: string) => {
  if (!value) {
    ElMessage.warning('请先上传文件，再复制插入代码')
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
    } else {
      copyByTextarea(value)
    }

    ElMessage.success(`${label}已复制`)
  } catch {
    ElMessage.error('复制失败，请手动复制')
  }
}

const onCopyVideoSnippet = () => {
  void copySnippet(videoSnippet.value, '视频插入代码')
}

const onCopyVideoHtmlSnippet = () => {
  void copySnippet(videoHtmlSnippet.value, '视频 HTML 代码')
}

const onCopyAttachmentSnippet = () => {
  void copySnippet(attachmentSnippet.value, '附件插入代码')
}


watch(isDialogVisible, async (visible) => {
  if (visible) return

  loadToken.value += 1
  await destroyEditor()

  articleId.value = 0
  articleTitle.value = ''
  originalContent.value = ''
  currentContent.value = ''

  isTitleDialogVisible.value = false
  titleDraft.value = ''
  titleSaving.value = false

  isVideoDialogVisible.value = false
  videoUploading.value = false
  uploadedVideoUrl.value = ''
  uploadedVideoName.value = ''

  isAttachmentDialogVisible.value = false
  attachmentUploading.value = false
  uploadedAttachmentUrl.value = ''
  uploadedAttachmentName.value = ''

  loading.value = false
  saving.value = false
})

onBeforeUnmount(() => {
  loadToken.value += 1
  void destroyEditor()
})

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog
      v-model="isDialogVisible"
      :before-close="handleBeforeClose"
      :close-on-click-modal="false"
      class="article-content-dialog"
      fullscreen
  >
    <template #header>
      <el-card class="content-toolbar-card" shadow="hover">
        <div class="content-toolbar">
          <div class="toolbar-main">
            <div class="title-line">
              <span class="dialog-title">{{ dialogTitle }}</span>
              <span :class="{dirty: hasUnsavedChanges}" class="status-chip">{{ contentStatusText }}</span>
            </div>
            <p class="toolbar-tip">支持 Ctrl+V 粘贴图片或拖拽图片到编辑器自动上传。</p>
          </div>

          <div class="toolbar-actions">
            <el-button :disabled="loading || saving" size="small" @click="onOpenTitleDialog">编辑标题</el-button>
            <el-button :disabled="loading || saving" size="small" @click="onOpenVideoDialog">上传视频</el-button>
            <el-button :disabled="loading || saving" size="small" @click="onOpenAttachmentDialog">上传附件</el-button>
          </div>
        </div>
      </el-card>
    </template>

    <div v-loading="loading" class="content-editor-body">
      <div ref="editorRootRef" class="content-editor-host"/>
    </div>

    <template #footer>
      <div class="flex w-full items-center justify-end gap-2">
        <el-button :disabled="saving" @click="onCancel">取消</el-button>
        <el-button
            :disabled="loading || saving || !hasUnsavedChanges"
            :loading="saving"
            type="primary"
            @click="onSaveContent"
        >
          保存内容
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="isTitleDialogVisible"
      append-to-body
      title="编辑标题"
      width="520"
  >
    <el-input
        v-model="titleDraft"
        maxlength="150"
        placeholder="请输入新的文章标题"
        show-word-limit
    />

    <template #footer>
      <div class="flex justify-end gap-2">
        <el-button :disabled="titleSaving" @click="isTitleDialogVisible = false">取消</el-button>
        <el-button :loading="titleSaving" type="primary" @click="onUpdateTitle">保存标题</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="isVideoDialogVisible"
      append-to-body
      title="上传视频"
      width="680"
  >
    <div class="asset-dialog-body">
      <div class="asset-preview">
        <video v-if="uploadedVideoUrl" :src="uploadedVideoUrl" class="preview-video" controls/>
        <div v-else class="preview-placeholder">上传后可在此预览视频</div>
      </div>

      <div class="asset-upload-row">
        <el-upload
            :disabled="videoUploading"
            :http-request="onUploadVideo"
            :show-file-list="false"
            accept="video/*"
        >
          <el-button :loading="videoUploading" plain type="primary">
            {{ uploadedVideoUrl ? '重新上传视频' : '选择视频上传' }}
          </el-button>
        </el-upload>

        <el-link v-if="uploadedVideoUrl" :href="uploadedVideoUrl" target="_blank" type="primary">打开视频地址</el-link>
      </div>

      <p class="snippet-tip">Milkdown 中建议使用 Markdown 链接。点击代码块可复制，再粘贴到正文即可。</p>
      <div :class="{disabled: !videoSnippet}" class="snippet-box" @click="onCopyVideoSnippet">
        <code>{{ videoSnippet || '[视频：视频文件.mp4](https://example.com/movie.mp4)' }}</code>
      </div>


      <p class="snippet-subtitle">可选：复制 HTML 嵌入代码（Milkdown 内可能显示为文本，取决于渲染配置）。</p>
      <div :class="{disabled: !videoHtmlSnippet}" class="snippet-box" @click="onCopyVideoHtmlSnippet">
        <code>{{ videoHtmlSnippet || '<video controls preload="metadata" src="..." style="max-width: 100%;"></video>' }}</code>
      </div>
    </div>
  </el-dialog>

  <el-dialog
      v-model="isAttachmentDialogVisible"
      append-to-body
      title="上传附件"
      width="680"
  >
    <div class="asset-dialog-body">
      <div class="asset-preview attachment-preview">
        <template v-if="uploadedAttachmentUrl">
          <p class="attachment-name">{{ uploadedAttachmentName || '附件' }}</p>
          <el-link :href="uploadedAttachmentUrl" target="_blank" type="primary">打开附件地址</el-link>
        </template>
        <div v-else class="preview-placeholder">上传后可在此查看附件链接</div>
      </div>

      <div class="asset-upload-row">
        <el-upload
            :disabled="attachmentUploading"
            :http-request="onUploadAttachment"
            :show-file-list="false"
        >
          <el-button :loading="attachmentUploading" plain type="primary">
            {{ uploadedAttachmentUrl ? '重新上传附件' : '选择附件上传' }}
          </el-button>
        </el-upload>

        <el-link v-if="uploadedAttachmentUrl" :href="uploadedAttachmentUrl" target="_blank" type="primary">打开附件地址</el-link>
      </div>

      <p class="snippet-tip">点击下方代码块可复制，粘贴到正文即可。</p>
      <div :class="{disabled: !attachmentSnippet}" class="snippet-box" @click="onCopyAttachmentSnippet">
        <code>{{ attachmentSnippet || '[附件名称](https://example.com/file.zip)' }}</code>
      </div>


    </div>
  </el-dialog>
</template>

<style scoped>
.article-content-dialog :deep(.el-dialog) {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.article-content-dialog :deep(.el-dialog__header) {
  margin-right: 0;
  padding: 12px 24px 8px;
}

.article-content-dialog :deep(.el-dialog__body) {
  flex: 1;
  min-height: 0;
  padding: 16px 24px;
}

.article-content-dialog :deep(.el-dialog__footer) {
  padding: 12px 24px 20px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.content-toolbar-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  background: color-mix(in srgb, var(--el-bg-color) 88%, transparent);
  backdrop-filter: blur(4px);
}

.content-toolbar-card :deep(.el-card__body) {
  padding: 12px 14px;
}

.content-toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding-right: 8px;
}

.toolbar-main {
  min-width: 0;
}

.title-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.status-chip {
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 12px;
  color: var(--el-color-success);
  background: var(--el-color-success-light-9);
}

.status-chip.dirty {
  color: var(--el-color-warning);
  background: var(--el-color-warning-light-9);
}

.toolbar-tip {
  margin-top: 6px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.content-editor-body {
  height: 100%;
}

.content-editor-host {
  height: 100%;
  overflow: auto;
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  background: #fff;
}

.content-editor-host :deep(.milkdown) {
  min-height: 100%;
}

.asset-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.asset-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  background: var(--el-fill-color-lighter);
  padding: 12px;
}

.preview-video {
  width: 100%;
  max-height: 280px;
  border-radius: 6px;
  background: #000;
}

.attachment-preview {
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
}

.attachment-name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  word-break: break-all;
}

.preview-placeholder {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.asset-upload-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.snippet-tip {
  margin: 0;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.snippet-subtitle {
  margin: 0;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.snippet-box {
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;
  background: var(--el-fill-color-lighter);
  padding: 10px 12px;
  cursor: pointer;
  transition: border-color .2s ease;
}

.snippet-box:hover {
  border-color: var(--el-color-primary);
}

.snippet-box.disabled {
  color: var(--el-text-color-placeholder);
  cursor: not-allowed;
}


.snippet-box.disabled:hover {
  border-color: var(--el-border-color);
}

.snippet-box code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
}

@media (max-width: 900px) {
  .content-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-actions {
    justify-content: flex-start;
  }
}
</style>



