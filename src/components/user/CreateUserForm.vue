<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {createUserRules} from "@/util/formRules.ts"
import RoleSelect from "@/components/role/RoleSelect.vue"
import {userApi} from "@/api/modules/user.ts"
import {showError} from "@/util/errorUtil.ts"

const emit = defineEmits(['success'])

const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<CreateUserRequest>({
  nickname: '',
  username: '',
  password: '',
  email: '',
  role: []
})

const submit = async () => {
  if (!formRef.value) return
  await formRef.value?.validate()
  loading.value = true
  const res = await userApi.createUser(form)
  if (res.ok) {
    formRef.value?.resetFields()
    loading.value = false

    ElNotification.success({
      title: '创建用户成功',
      message: res.data.nickname
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
      :rules="createUserRules"
      label-width="70px"
  >
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname" placeholder="请输入昵称"/>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
          v-model="form.password"
          placeholder="请输入密码"
          show-password
          type="password"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱"/>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <RoleSelect v-model="form.role"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">创建</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
