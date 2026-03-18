<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {createArticleRules} from "@/util/formRules.ts"
import {articleApi} from "@/api/modules/article.ts"
import {categoryApi} from "@/api/modules/category.ts"
import {tagApi} from "@/api/modules/tag.ts"
import {showError} from "@/util/errorUtil.ts"
import CreateCategoryDialog from "@/components/category/CreateCategoryDialog.vue"
import CreateTagDialog from "@/components/tag/CreateTagDialog.vue"
import {toUrlSlug} from "@/util/slugUtil.ts"

const emit = defineEmits(['success'])

const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<{
  title: string
  slug: string
  content: string
  categoryId: number | undefined
  tagIds: number[]
}>({
  title: '',
  slug: '',
  content: '',
  categoryId: undefined,
  tagIds: [],
})

const isSlugManuallyEdited = ref(false)

const onSlugInput = (value: string | number) => {
  const input = String(value ?? '')
  isSlugManuallyEdited.value = input.trim().length > 0
}

const onSlugBlur = () => {
  form.slug = toUrlSlug(form.slug)
  isSlugManuallyEdited.value = form.slug.trim().length > 0
}

watch(() => form.title, (value) => {
  if (isSlugManuallyEdited.value) return
  form.slug = toUrlSlug(value)
})

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

const submit = async () => {
  if (!formRef.value) return

  onSlugBlur()
  await formRef.value.validate()
  loading.value = true

  const req: CreateArticleRequest = {
    title: form.title.trim(),
    slug: form.slug.trim(),
    content: form.content,
    categoryId: form.categoryId as number,
    tagIds: form.tagIds,
  }

  const res = await articleApi.createArticle(req)

  if (res.ok) {
    formRef.value.resetFields()
    isSlugManuallyEdited.value = false

    ElNotification.success({
      title: '创建文章成功',
      message: res.data.title,
    })

    emit('success')
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  formRef.value?.resetFields()
  isSlugManuallyEdited.value = false
}

onMounted(async () => {
  await Promise.all([fetchCategoryOptions(), fetchTagOptions()])
})
</script>
<template>
  <el-form
      ref="formRef"
      v-loading="loading"
      :model="form"
      :rules="createArticleRules"
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
          @input="onSlugInput"
      />
    </el-form-item>

    <el-form-item label="内容" prop="content">
      <el-input
          v-model="form.content"
          :rows="5"
          placeholder="请输入文章内容"
          type="textarea"
      />
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

    <el-form-item>
      <el-button type="primary" @click="submit">创建</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

  <CreateCategoryDialog ref="createCategoryDialogRef" @success="onCategoryCreated"/>
  <CreateTagDialog ref="createTagDialogRef" @success="onTagCreated"/>
</template>

