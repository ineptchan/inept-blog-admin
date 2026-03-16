<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {roleApi} from "@/api/modules/role.ts"
import {createRoleRules} from "@/util/formRules.ts"

const emit = defineEmits(['success'])

const loading = ref(false)

const formRef = ref<FormInstance>()

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

    ElNotification.success({
      title: '创建角色成功',
      message: res.data.name
    })

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
