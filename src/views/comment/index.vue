<script lang="ts" setup>
import {reactive, ref, watch} from "vue"
import {Plus} from "@element-plus/icons-vue"
import PageCard from "@/components/PageCard.vue"
import {commentApi} from "@/api/modules/comment.ts"
import {showError} from "@/util/errorUtil.ts"
import {formatUtcToLocal} from "@/util/dateUtil.ts"
import {ElNotification} from "element-plus"
import {useRoute, useRouter} from "vue-router"
import CreateCommentDialog from "@/components/comment/CreateCommentDialog.vue"
import EditCommentDialog from "@/components/comment/EditCommentDialog.vue"
import CommentRepliesDialog from "@/components/comment/CommentRepliesDialog.vue"

const route = useRoute()
const router = useRouter()

const parseStatus = (value: unknown): CommentStatusType | undefined => {
  if (value === "PENDING" || value === "PUBLISHED" || value === "DELETED" || value === "SPAM") {
    return value
  }
  return undefined
}

const isCommentListLoading = ref(false)

const commentListQuery = reactive<CommentQueryRequest>({
  keyword: String(route.query.keyword ?? ""),
  status: parseStatus(route.query.status),
  page: Number(route.query.page ?? 1),
  pageSize: Number(route.query["page-size"] ?? 20),
})

const commentListQueryResult = ref<PageQueryResponse<CommentType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0,
})

const fetchCommentList = async () => {
  if (isCommentListLoading.value) return
  isCommentListLoading.value = true

  const res = await commentApi.getComments({
    keyword: commentListQuery.keyword,
    status: commentListQuery.status,
    page: commentListQuery.page,
    pageSize: commentListQuery.pageSize,
  })

  if (res.ok) {
    commentListQueryResult.value = res.data
  } else {
    showError(res.error)
  }

  isCommentListLoading.value = false
}

const updateQuery = async (patch: Partial<CommentQueryRequest>) => {
  const nextStatus = Object.prototype.hasOwnProperty.call(patch, "status")
      ? patch.status
      : commentListQuery.status

  await router.replace({
    query: {
      ...route.query,
      page: patch.page ?? commentListQuery.page,
      "page-size": patch.pageSize ?? commentListQuery.pageSize,
      keyword: (patch.keyword ?? commentListQuery.keyword) || undefined,
      status: nextStatus ?? undefined,
    },
  })
}

const handlePageChange = async (page: number) => {
  await updateQuery({page})
}

const handleSearch = async () => {
  await updateQuery({
    page: 1,
    pageSize: commentListQuery.pageSize,
    keyword: commentListQuery.keyword,
    status: commentListQuery.status,
  })
}

const handleReset = async () => {
  await updateQuery({
    page: 1,
    pageSize: commentListQuery.pageSize,
    keyword: "",
    status: undefined,
  })
}

watch(
    () => [route.query.page, route.query["page-size"], route.query.keyword, route.query.status],
    async ([page, pageSize, keyword, status]) => {
      commentListQuery.page = Number(page ?? 1)
      commentListQuery.pageSize = Number(pageSize ?? 20)
      commentListQuery.keyword = String(keyword ?? "")
      commentListQuery.status = parseStatus(status)
      await fetchCommentList()
    },
    {immediate: true},
)

const createCommentDialogRef = ref<InstanceType<typeof CreateCommentDialog> | null>(null)

const onCreateComment = () => {
  createCommentDialogRef.value?.openDialog()
}

const onCreateCommentSuccess = () => {
  fetchCommentList()
}

const editCommentDialogRef = ref<InstanceType<typeof EditCommentDialog> | null>(null)

const onEditComment = (comment: CommentType) => {
  editCommentDialogRef.value?.openDialog(comment.id)
}

const onEditCommentSuccess = () => {
  fetchCommentList()
}

const onDeleteComment = async (comment: CommentType) => {
  const res = await commentApi.deleteComment(comment.id)
  if (res.ok) {
    ElNotification.success({
      title: "删除成功",
    })

    fetchCommentList()
  } else {
    showError(res.error)
  }
}

const commentRepliesDialogRef = ref<InstanceType<typeof CommentRepliesDialog> | null>(null)

const onViewReplies = (comment: CommentType) => {
  commentRepliesDialogRef.value?.openDialog(comment)
}

const commentStatusOptions: { label: string, value: CommentStatusType }[] = [
  {label: "待审核", value: "PENDING"},
  {label: "已发布", value: "PUBLISHED"},
  {label: "已删除", value: "DELETED"},
  {label: "垃圾评论", value: "SPAM"},
]

const getStatusType = (status: CommentStatusType): "" | "success" | "warning" | "info" | "danger" => {
  if (status === "PUBLISHED") return "success"
  if (status === "DELETED") return "info"
  if (status === "SPAM") return "danger"
  return "warning"
}

const getStatusLabel = (status: CommentStatusType): string => {
  if (status === "PUBLISHED") return "已发布"
  if (status === "DELETED") return "已删除"
  if (status === "SPAM") return "垃圾评论"
  return "待审核"
}
</script>
<template>
  <div>
    <PageCard>
      <div class="mb-6 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div class="grid w-full flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(280px,1fr)_200px_auto]">
          <el-input
              v-model="commentListQuery.keyword"
              class="w-full"
              clearable
              placeholder="搜索评论内容..."
          />
          <el-select
              v-model="commentListQuery.status"
              class="w-full"
              clearable
              placeholder="按状态筛选"
          >
            <el-option
                v-for="item in commentStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <div class="flex gap-2">
            <el-button plain type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </div>
        <el-button :icon="Plus" type="primary" @click="onCreateComment">新增评论</el-button>
      </div>
      <el-table v-loading="isCommentListLoading" :data="commentListQueryResult.content" border class="w-full" stripe>
        <el-table-column align="center" label="id" prop="id" width="70"/>
        <el-table-column label="评论内容" min-width="260" prop="content" show-overflow-tooltip/>
        <el-table-column label="文章" min-width="200">
          <template #default="{ row }">
            {{ row.article.title }}
          </template>
        </el-table-column>
        <el-table-column label="用户" min-width="120">
          <template #default="{ row }">
            {{ row.user.nickname }}
          </template>
        </el-table-column>
        <el-table-column label="父评论" min-width="220" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.parentComment?.content || "顶级评论" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="点赞数" min-width="90" prop="likeCount"/>
        <el-table-column label="创建时间" min-width="180">
          <template #default="{ row }">
            {{ formatUtcToLocal(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="{ row }">
            <el-button link size="small" type="primary" @click="onEditComment(row)">编辑</el-button>
            <el-button link size="small" type="primary" @click="onViewReplies(row)">回复</el-button>
            <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                title="确认删除这条评论吗？"
                @confirm="onDeleteComment(row)"
            >
              <template #reference>
                <el-button link size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-6 flex justify-end">
        <el-pagination
            :page-size="commentListQuery.pageSize"
            :total="commentListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>
    <CreateCommentDialog ref="createCommentDialogRef" @success="onCreateCommentSuccess"/>
    <EditCommentDialog ref="editCommentDialogRef" @success="onEditCommentSuccess"/>
    <CommentRepliesDialog ref="commentRepliesDialogRef"/>
  </div>
</template>
