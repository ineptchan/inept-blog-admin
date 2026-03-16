<script lang="ts" setup>
import {ref} from "vue"
import CreateUserForm from "@/components/user/CreateUserForm.vue"

// === dialog ===
const emit = defineEmits(['success'])
const isDialogVisible = ref(false)

const openDialog = () => {
  isDialogVisible.value = true
}

const onSuccess = () => {
  isDialogVisible.value = false
  emit('success')
}

defineExpose({
  openDialog
})
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="创建用户"
      width="380"
  >
    <CreateUserForm @success="onSuccess"/>
  </el-dialog>
</template>
