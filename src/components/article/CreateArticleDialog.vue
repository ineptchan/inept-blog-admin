<script lang="ts" setup>
import {ref} from "vue"
import CreateArticleForm from "@/components/article/CreateArticleForm.vue"

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
      title="创建文章"
      width="760"
  >
    <CreateArticleForm @success="onSuccess"/>
  </el-dialog>
</template>
