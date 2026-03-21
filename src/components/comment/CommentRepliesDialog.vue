<script lang="ts" setup>
import {reactive, ref} from "vue"
import {commentApi} from "@/api/modules/comment.ts"
import {showError} from "@/util/errorUtil.ts"
import {formatUtcToLocal} from "@/util/dateUtil.ts"

const isDialogVisible = ref(false)
const loading = ref(false)

const currentComment = ref<CommentType | null>(null)

const repliesQuery = reactive<CommentReplyQueryRequest>({
  page: 1,
  pageSize: 10,
})

const repliesResult = ref<PageQueryResponse<CommentReplyType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0,
})

const openDialog = (comment: CommentType) => {
  currentComment.value = comment
  repliesQuery.page = 1
  isDialogVisible.value = true
  fetchReplies()
}

defineExpose({
  openDialog,
})

const fetchReplies = async () => {
  if (!currentComment.value || loading.value) return
  loading.value = true

  const res = await commentApi.getCommentReplies(currentComment.value.id, {
    page: repliesQuery.page,
    pageSize: repliesQuery.pageSize,
  })

  if (res.ok) {
    repliesResult.value = res.data
  } else {
    showError(res.error)
  }

  loading.value = false
}

const handlePageChange = async (page: number) => {
  repliesQuery.page = page
  await fetchReplies()
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="评论回复"
      width="900"
  >
    <div class="mb-3 text-sm text-gray-500">
      <span v-if="currentComment">评论 ID: {{ currentComment.id }}</span>
    </div>
    <el-table v-loading="loading" :data="repliesResult.content" border class="w-full" stripe>
      <el-table-column align="center" label="id" prop="id" width="70"/>
      <el-table-column label="回复内容" min-width="320" prop="content" show-overflow-tooltip/>
      <el-table-column label="用户" min-width="120">
        <template #default="{ row }">
          {{ row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="点赞数" min-width="90" prop="likeCount"/>
      <el-table-column label="创建时间" min-width="200">
        <template #default="{ row }">
          {{ formatUtcToLocal(row.createdAt) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-6 flex justify-end">
      <el-pagination
          :page-size="repliesQuery.pageSize"
          :total="repliesResult.totalElements"
          background
          layout="total, prev, pager, next"
          @current-change="handlePageChange"
      />
    </div>
  </el-dialog>
</template>
