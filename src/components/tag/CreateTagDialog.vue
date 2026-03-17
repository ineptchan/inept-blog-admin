<script lang="ts" setup>
import {ref} from "vue"
import CreateTagForm from "@/components/tag/CreateTagForm.vue"

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
      title="创建标签"
      width="380"
  >
    <CreateTagForm @success="onSuccess"/>
  </el-dialog>
</template>
