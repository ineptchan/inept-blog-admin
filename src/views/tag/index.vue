<script lang="ts" setup>
import {reactive, ref, watch} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {tagApi} from "@/api/modules/tag.ts"
import PageCard from "@/components/PageCard.vue"
import CreateTagDialog from "@/components/tag/CreateTagDialog.vue"
import EditTagDialog from "@/components/tag/EditTagDialog.vue"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()

// === 表格 ===
const isTagListLoading = ref(false)

const tagListQuery = reactive<PageQueryRequest>({
  keyword: String(route.query.keyword ?? ""),
  page: Number(route.query.page ?? 1),
  pageSize: Number(route.query["page-size"] ?? 20),
})

const tagListQueryResult = ref<PageQueryResponse<TagType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0,
})

const handlePageChange = async (page: number) => {
  await updateQuery({page})
}

const fetchTagList = async () => {
  if (isTagListLoading.value) return
  isTagListLoading.value = true

  const res = await tagApi.getTags({
    keyword: tagListQuery.keyword,
    page: tagListQuery.page,
    pageSize: tagListQuery.pageSize,
  })

  if (res.ok) {
    tagListQueryResult.value = res.data
  } else {
    showError(res.error)
  }

  isTagListLoading.value = false
}

const updateQuery = async (patch: Partial<PageQueryRequest>) => {
  await router.replace({
    query: {
      ...route.query,
      page: patch.page ?? tagListQuery.page,
      "page-size": patch.pageSize ?? tagListQuery.pageSize,
      keyword: (patch.keyword ?? tagListQuery.keyword) || undefined,
    },
  })
}

const handleSearch = async () => {
  await updateQuery({
    page: 1,
    pageSize: tagListQuery.pageSize,
    keyword: tagListQuery.keyword,
  })
}

watch(
    () => [route.query.page, route.query["page-size"], route.query.keyword],
    async ([page, pageSize, keyword]) => {
      tagListQuery.page = Number(page ?? 1)
      tagListQuery.pageSize = Number(pageSize ?? 20)
      tagListQuery.keyword = String(keyword ?? "")
      await fetchTagList()
    },
    {immediate: true}
)

// === 创建标签 ===
const createTagDialogRef = ref<InstanceType<typeof CreateTagDialog> | null>(null)

const onCreateTag = () => {
  createTagDialogRef.value?.openDialog()
}

const onCreateTagSuccess = () => {
  fetchTagList()
}

// === 编辑标签 ===
const editTagDialogRef = ref<InstanceType<typeof EditTagDialog> | null>(null)

const onEditTag = (tag: TagType) => {
  editTagDialogRef.value?.openDialog(tag.id)
}

const onEditTagSuccess = () => {
  fetchTagList()
}

// === 删除标签 ===
const onDeleteTag = async (tag: TagType) => {
  const res = await tagApi.deleteTag(tag.id)
  if (res.ok) {
    ElNotification.success({
      title: '删除成功'
    })

    fetchTagList()
  } else {
    showError(res.error)
  }
}
</script>
<template>
  <div>
    <PageCard>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div class="flex gap-2 w-full sm:w-auto">
          <el-input
              v-model="tagListQuery.keyword"
              class="w-64"
              clearable
              placeholder="搜索标签名称/URL 标识..."
          />
          <el-button plain type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-button :icon="Plus" type="primary" @click="onCreateTag">新增标签</el-button>
      </div>
      <el-table v-loading="isTagListLoading" :data="tagListQueryResult.content" border class="w-full" stripe>
        <el-table-column align="center" label="id" prop="id" width="60"/>
        <el-table-column label="标签名称" min-width="240" prop="name"/>
        <el-table-column label="URL 标识" min-width="240" prop="slug"/>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button link size="small" type="primary" @click="onEditTag(row)">编辑</el-button>
            <el-button link size="small" type="danger" @click="onDeleteTag(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-6 flex justify-end">
        <el-pagination
            :page-size="tagListQuery.pageSize"
            :total="tagListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>
    <CreateTagDialog ref="createTagDialogRef" @success="onCreateTagSuccess"/>
    <EditTagDialog ref="editTagDialogRef" @success="onEditTagSuccess"/>
  </div>
</template>
