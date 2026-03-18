<script lang="ts" setup>
import {reactive, ref, watch} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {createCategoriesRules} from "@/util/formRules.ts"
import {categoryApi} from "@/api/modules/category.ts"
import {showError} from "@/util/errorUtil.ts"
import {toUrlSlug} from "@/util/slugUtil.ts"

const emit = defineEmits(['success'])

const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<CreateCategoryRequest>({
  name: '',
  slug: '',
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

watch(() => form.name, (value) => {
  if (isSlugManuallyEdited.value) return
  form.slug = toUrlSlug(value)
})

const submit = async () => {
  if (!formRef.value) return

  onSlugBlur()
  await formRef.value.validate()
  loading.value = true

  const res = await categoryApi.createCategory(form)
  if (res.ok) {
    formRef.value.resetFields()
    isSlugManuallyEdited.value = false
    loading.value = false

    ElNotification.success({
      title: '创建分类成功',
      message: res.data.name
    })

    emit('success', res.data)
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  formRef.value?.resetFields()
  isSlugManuallyEdited.value = false
}
</script>
<template>
  <el-form
      ref="formRef"
      v-loading="loading"
      :model="form"
      :rules="createCategoriesRules"
      label-width="70px"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入分类名称"/>
    </el-form-item>
    <el-form-item label="标识" prop="slug">
      <el-input
          v-model="form.slug"
          placeholder="请输入分类 URL 标识"
          @blur="onSlugBlur"
          @input="onSlugInput"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">创建</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

