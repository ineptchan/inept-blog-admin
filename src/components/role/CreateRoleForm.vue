<script lang="ts" setup>
import {reactive, ref} from "vue"
import type {FormInstance, FormRules} from "element-plus"
import {roleApi} from "@/api/modules/role.ts"

const emit = defineEmits(['success'])

const loading = ref(false)

const formRef = ref<FormInstance>()

const createRoleRules: FormRules = {
  code: [
    {required: true, message: '角色标识符不能为空', trigger: 'blur'},
    {
      pattern: /^[A-Za-z]+$/,
      message: '角色标识符只能包含英文字母',
      trigger: 'blur',
    },
  ],
  name: [
    {required: true, message: '角色名字不能为空', trigger: 'blur'},
    {min: 2, max: 24, message: '角色名字长度为 2~24 个字符', trigger: 'blur'},
  ],
  description: [],
}

const form = reactive({
  code: '',
  name: '',
  description: ''
})

const submit = async () => {
  if (!formRef.value) return
  await formRef.value?.validate()
  loading.value = true
  const res = await roleApi.createRole(form.code, form.name, form.description)
  if (res.ok) {
    formRef.value?.resetFields()
    loading.value = false
    emit('success')
  }
  loading.value = false
}

const reset = () => {
  formRef.value?.resetFields()
}
</script>
<template>
  <el-form ref="formRef" v-loading="loading" :model="form" :rules="createRoleRules" label-width="70px">
    <el-form-item label="标识符" prop="code">
      <el-input v-model="form.code" placeholder="输入标识符 (admin,user)"/>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="form.name" placeholder="输入名字"/>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" placeholder="描述"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">创建</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
