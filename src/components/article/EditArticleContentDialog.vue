<script lang="ts" setup>
import {computed, nextTick, onBeforeUnmount, ref, shallowRef, watch} from "vue"
import {ElMessage, ElMessageBox, ElNotification} from "element-plus"
import {Crepe} from "@milkdown/crepe"
import {articleApi} from "@/api/modules/article.ts"
import {showError} from "@/util/errorUtil.ts"
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

const mountEditor = async (content: string) => {
  await destroyEditor()
  await nextTick()

  if (!editorRootRef.value) return

  const editor = new Crepe({
    root: editorRootRef.value,
    defaultValue: content,
  })

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

watch(isDialogVisible, async (visible) => {
  if (visible) return

  loadToken.value += 1
  await destroyEditor()

  articleId.value = 0
  articleTitle.value = ''
  originalContent.value = ''
  currentContent.value = ''
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
      <div class="flex items-center justify-between pr-8">
        <span class="text-base font-medium">{{ dialogTitle }}</span>
        <span class="text-xs text-(--el-text-color-secondary)">
          {{ hasUnsavedChanges ? '未保存修改' : '内容已保存' }}
        </span>
      </div>
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
</template>

<style scoped>
.article-content-dialog :deep(.el-dialog__header) {
  margin-right: 0;
  padding: 16px 24px 10px;
}

.article-content-dialog :deep(.el-dialog__body) {
  height: calc(100vh - 132px);
  padding: 0 24px;
}

.article-content-dialog :deep(.el-dialog__footer) {
  padding: 12px 24px 20px;
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
</style>
