<script lang="ts" setup>
import {ref} from "vue"
import CreateCategoryForm from "@/components/category/CreateCategoryForm.vue"

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
      title="创建分类"
      width="380"
  >
    <CreateCategoryForm @success="onSuccess"/>
  </el-dialog>
</template>
