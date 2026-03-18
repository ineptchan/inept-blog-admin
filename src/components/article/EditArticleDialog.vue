<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance, type FormRules, type UploadRequestOptions} from "element-plus"
import {articleApi} from "@/api/modules/article.ts"
import {categoryApi} from "@/api/modules/category.ts"
import {tagApi} from "@/api/modules/tag.ts"
import {showError} from "@/util/errorUtil.ts"
import {createArticleRules, updateArticleRules} from "@/util/formRules.ts"
import {uploadArticleFeaturedImage} from "@/util/articleUploadUtil.ts"
import CreateCategoryDialog from "@/components/category/CreateCategoryDialog.vue"
import CreateTagDialog from "@/components/tag/CreateTagDialog.vue"
import {toUrlSlug} from "@/util/slugUtil.ts"

const editArticleRules: FormRules = {
  title: createArticleRules.title,
  slug: createArticleRules.slug,
  categoryId: createArticleRules.categoryId,
  tagIds: createArticleRules.tagIds,
  articleStatus: updateArticleRules.articleStatus,
}

// === dialog ===
const emit = defineEmits(['success'])
const isDialogVisible = ref(false)
const editId = ref(0)

const openDialog = async (id: number) => {
  isDialogVisible.value = true
  editId.value = id
  await Promise.all([fetchCategoryOptions(), fetchTagOptions(), fetchArticle()])
}

const onSuccess = () => {
  isDialogVisible.value = false
  emit('success')
}

defineExpose({
  openDialog
})

// === option data ===
const categoryLoading = ref(false)
const categoryOptions = ref<CategoryType[]>([])

const fetchCategoryOptions = async () => {
  categoryLoading.value = true
  const res = await categoryApi.getCategories({
    keyword: '',
    page: 1,
    pageSize: 100,
  })

  if (res.ok) {
    categoryOptions.value = res.data.content
  } else {
    showError(res.error)
  }

  categoryLoading.value = false
}

const tagLoading = ref(false)
const tagOptions = ref<TagType[]>([])

const fetchTagOptions = async () => {
  tagLoading.value = true
  const res = await tagApi.getTags({
    keyword: '',
    page: 1,
    pageSize: 100,
  })

  if (res.ok) {
    tagOptions.value = res.data.content
  } else {
    showError(res.error)
  }

  tagLoading.value = false
}

const createCategoryDialogRef = ref<InstanceType<typeof CreateCategoryDialog> | null>(null)
const createTagDialogRef = ref<InstanceType<typeof CreateTagDialog> | null>(null)

const onOpenCreateCategoryDialog = () => {
  createCategoryDialogRef.value?.openDialog()
}

const onOpenCreateTagDialog = () => {
  createTagDialogRef.value?.openDialog()
}

const onCategoryCreated = async (category: CategoryType) => {
  await fetchCategoryOptions()
  form.categoryId = category.id
}

const onTagCreated = async (tag: TagType) => {
  await fetchTagOptions()
  if (!form.tagIds.includes(tag.id)) {
    form.tagIds.push(tag.id)
  }
}

// === form ===
const formRef = ref<FormInstance>()
const loading = ref(false)
const featuredImageUploading = ref(false)

const form = reactive<{
  title: string
  slug: string
  featuredImage: string
  categoryId: number | undefined
  tagIds: number[]
  articleStatus: ArticleStatusType
}>({
  title: '',
  slug: '',
  featuredImage: '',
  categoryId: undefined,
  tagIds: [],
  articleStatus: 'DRAFT',
})

const onSlugBlur = () => {
  form.slug = toUrlSlug(form.slug)
}

const onUploadFeaturedImage = async (options: UploadRequestOptions) => {
  if (!editId.value) {
    options.onError(new Error('文章不存在') as any)
    return
  }

  featuredImageUploading.value = true

  try {
    const uploadedUrl = await uploadArticleFeaturedImage(editId.value, options.file)
    form.featuredImage = uploadedUrl

    options.onSuccess(uploadedUrl)

    ElNotification.success({
      title: '封面上传成功',
    })
  } catch (error) {
    options.onError((error instanceof Error ? error : new Error('封面上传失败')) as any)
  } finally {
    featuredImageUploading.value = false
  }
}

const submit = async () => {
  if (!formRef.value) return

  onSlugBlur()
  await formRef.value.validate()

  loading.value = true

  const req: UpdateArticleRequest = {
    title: form.title.trim(),
    slug: form.slug.trim(),
    categoryId: form.categoryId,
    tagIds: form.tagIds,
    articleStatus: form.articleStatus,
  }

  const res = await articleApi.updateArticle(editId.value, req)

  if (res.ok) {
    ElNotification.success({
      title: '更新文章成功',
      message: res.data.title,
    })

    onSuccess()
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  fetchArticle()
}

const fetchArticle = async () => {
  loading.value = true

  const res = await articleApi.getArticleById(editId.value)

  if (res.ok) {
    form.title = res.data.title
    form.slug = res.data.slug
    form.featuredImage = res.data.featuredImage ?? ''
    form.categoryId = res.data.category.id
    form.tagIds = res.data.tags.map(tag => tag.id)
    form.articleStatus = res.data.articleStatus

    if (!categoryOptions.value.some(item => item.id === res.data.category.id)) {
      categoryOptions.value.push(res.data.category)
    }

    for (const tag of res.data.tags) {
      if (!tagOptions.value.some(item => item.id === tag.id)) {
        tagOptions.value.push(tag)
      }
    }
  } else {
    showError(res.error)
  }

  loading.value = false
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="编辑文章"
      width="760"
  >
    <el-form
        ref="formRef"
        v-loading="loading"
        :model="form"
        :rules="editArticleRules"
        label-width="90px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"/>
      </el-form-item>

      <el-form-item label="标识" prop="slug">
        <el-input
            v-model="form.slug"
            placeholder="请输入文章 URL 标识"
            @blur="onSlugBlur"
        />
      </el-form-item>

      <el-form-item label="封面">
        <div class="flex w-full flex-col gap-2">
          <el-upload
              :disabled="loading || featuredImageUploading"
              :http-request="onUploadFeaturedImage"
              :show-file-list="false"
              accept="image/*"
          >
            <el-button :loading="featuredImageUploading" plain type="primary">
              {{ form.featuredImage ? '更换封面' : '上传封面' }}
            </el-button>
          </el-upload>

          <el-input
              v-model="form.featuredImage"
              placeholder="暂无封面地址"
              readonly
          />

          <el-image
              v-if="form.featuredImage"
              :preview-src-list="[form.featuredImage]"
              :src="form.featuredImage"
              class="h-32 w-56 rounded border border-(--el-border-color-light)"
              fit="cover"
              preview-teleported
          />
        </div>
      </el-form-item>

      <el-form-item label="分类" prop="categoryId">
        <div class="flex w-full gap-2">
          <el-select
              v-model="form.categoryId"
              :loading="categoryLoading"
              class="flex-1"
              clearable
              filterable
              placeholder="请选择文章分类"
          >
            <el-option
                v-for="item in categoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
              <span class="float-left">{{ item.name }}</span>
              <span class="float-right text-[13px] text-(--el-text-color-secondary)">
                {{ item.slug }}
              </span>
            </el-option>
          </el-select>
          <el-button plain @click="onOpenCreateCategoryDialog">快捷新建</el-button>
        </div>
      </el-form-item>

      <el-form-item label="标签" prop="tagIds">
        <div class="flex w-full gap-2">
          <el-select
              v-model="form.tagIds"
              :loading="tagLoading"
              class="flex-1"
              clearable
              collapse-tags
              collapse-tags-tooltip
              filterable
              multiple
              placeholder="请选择文章标签"
          >
            <el-option
                v-for="item in tagOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
              <span class="float-left">{{ item.name }}</span>
              <span class="float-right text-[13px] text-(--el-text-color-secondary)">
                {{ item.slug }}
              </span>
            </el-option>
          </el-select>
          <el-button plain @click="onOpenCreateTagDialog">快捷新建</el-button>
        </div>
      </el-form-item>

      <el-form-item label="状态" prop="articleStatus">
        <el-select v-model="form.articleStatus" class="w-full" placeholder="请选择文章状态">
          <el-option label="草稿" value="DRAFT"/>
          <el-option label="已发布" value="PUBLISHED"/>
          <el-option label="已归档" value="ARCHIVED"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">更新</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <CreateCategoryDialog ref="createCategoryDialogRef" @success="onCategoryCreated"/>
  <CreateTagDialog ref="createTagDialogRef" @success="onTagCreated"/>
</template>
