<script lang="ts" setup>
import {reactive, ref} from "vue"
import {updateRoleRules} from "@/util/formRules.ts"
import {ElNotification, type FormInstance} from "element-plus"
import {roleApi} from "@/api/modules/role.ts"
import {showError} from "@/util/errorUtil.ts"

// === dialog ===
const emit = defineEmits(['success'])
const isDialogVisible = ref(false)
const editId = ref(0)

const openDialog = (id: number) => {
  isDialogVisible.value = true
  editId.value = id
  fetchRole()
}

const onSuccess = () => {
  isDialogVisible.value = false
  emit('success')
}

defineExpose({
  openDialog
})

// === 表单 ===
const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({
  code: '',
  name: '',
  description: ''
})

const submit = async () => {
  if (!formRef.value) return
  await formRef.value?.validate()

  loading.value = true

  const code = form.code.trim() || undefined
  const name = form.name.trim() || undefined
  const description = form.description.trim() || undefined

  const res = await roleApi.updateRole(editId.value, code, name, description)

  if (res.ok) {
    formRef.value?.resetFields()
    loading.value = false

    ElNotification.success({
      title: '更新角色成功',
      message: res.data.name
    })

    onSuccess()
  }

  loading.value = false
}

const reset = () => {
  fetchRole()
}

const fetchRole = async () => {
  const res = await roleApi.getRoleById(editId.value)
  if (res.ok) {
    form.code = res.data.code
    form.name = res.data.name
    form.description = res.data.description ? res.data.description : ''
  } else {
    showError(res.error)
  }
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="编辑角色"
      width="380"
  >
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="updateRoleRules" label-width="70px">
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
        <el-button type="primary" @click="submit">更新</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
