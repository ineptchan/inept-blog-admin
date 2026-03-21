<script lang="ts" setup>
import {ref} from "vue"
import CreateCommentForm from "@/components/comment/CreateCommentForm.vue"

const emit = defineEmits(['success'])
const isDialogVisible = ref(false)

const openDialog = () => {
  isDialogVisible.value = true
}

const onSuccess = (comment: CommentType) => {
  isDialogVisible.value = false
  emit('success', comment)
}

defineExpose({
  openDialog,
})
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="创建评论"
      width="560"
  >
    <CreateCommentForm @success="onSuccess"/>
  </el-dialog>
</template>
