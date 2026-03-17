<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {createTagRules} from "@/util/formRules.ts"
import {tagApi} from "@/api/modules/tag.ts"
import {showError} from "@/util/errorUtil.ts"

const emit = defineEmits(['success'])

const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<CreateTagRequest>({
  name: '',
  slug: '',
})

const submit = async () => {
  if (!formRef.value) return
  await formRef.value?.validate()
  loading.value = true

  const res = await tagApi.createTag(form)
  if (res.ok) {
    formRef.value?.resetFields()
    loading.value = false

    ElNotification.success({
      title: '创建标签成功',
      message: res.data.name
    })

    emit('success')
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  formRef.value?.resetFields()
}
</script>
<template>
  <el-form
      ref="formRef"
      v-loading="loading"
      :model="form"
      :rules="createTagRules"
      label-width="70px"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入标签名称"/>
    </el-form-item>
    <el-form-item label="标识" prop="slug">
      <el-input v-model="form.slug" placeholder="请输入标签 URL 标识"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">创建</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
