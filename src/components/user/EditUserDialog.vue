<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import RoleSelect from "@/components/role/RoleSelect.vue"
import {userApi} from "@/api/modules/user.ts"
import {showError} from "@/util/errorUtil.ts"
import {updateUserRules} from "@/util/formRules.ts"

// === dialog ===
const emit = defineEmits(['success'])
const isDialogVisible = ref(false)
const editId = ref(0)

const openDialog = (id: number) => {
  isDialogVisible.value = true
  editId.value = id
  fetchUser()
}

const onSuccess = () => {
  isDialogVisible.value = false
  emit('success')
}

defineExpose({
  openDialog
})

// === 表单 ===
const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<{
  nickname: string
  username: string
  password: string
  email: string
  status: boolean
  role: number[]
}>({
  nickname: '',
  username: '',
  password: '',
  email: '',
  status: true,
  role: []
})

const submit = async () => {
  if (!formRef.value) return
  await formRef.value.validate()

  loading.value = true

  const req: UpdateUserRequest = {
    nickname: form.nickname.trim() || undefined,
    username: form.username.trim() || undefined,
    password: form.password.trim() || undefined,
    email: form.email.trim() || undefined,
    status: form.status,
    role: form.role.length > 0 ? form.role : undefined
  }

  const res = await userApi.updateUser(editId.value, req)

  if (res.ok) {
    ElNotification.success({
      title: '更新用户成功',
      message: res.data.nickname
    })

    onSuccess()
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  fetchUser()
}

const fetchUser = async () => {
  loading.value = true

  const res = await userApi.getUserById(editId.value)

  if (res.ok) {
    form.nickname = res.data.nickname
    form.username = res.data.username
    form.password = ''
    form.email = res.data.email ?? ''
    form.status = res.data.status
    form.role = res.data.roles.map(role => role.id)
  } else {
    showError(res.error)
  }

  loading.value = false
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="编辑用户"
      width="520"
  >
    <el-form
        ref="formRef"
        v-loading="loading"
        :model="form"
        :rules="updateUserRules"
        label-width="70px"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
            v-model="form.password"
            placeholder="不修改可留空"
            show-password
            type="password"
        />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <RoleSelect v-model="form.role" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">更新</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
