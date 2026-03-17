<script lang="ts" setup>
import {reactive, ref, watch} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {categoryApi} from "@/api/modules/category.ts"
import PageCard from "@/components/PageCard.vue"
import CreateCategoryDialog from "@/components/category/CreateCategoryDialog.vue"
import EditCategoryDialog from "@/components/category/EditCategoryDialog.vue"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()

// === 表格 ===
const isCategoryListLoading = ref(false)

const categoryListQuery = reactive<PageQueryRequest>({
  keyword: String(route.query.keyword ?? ""),
  page: Number(route.query.page ?? 1),
  pageSize: Number(route.query["page-size"] ?? 20),
})

const categoryListQueryResult = ref<PageQueryResponse<CategoryType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0,
})

const handlePageChange = async (page: number) => {
  await updateQuery({page})
}

const fetchCategoryList = async () => {
  if (isCategoryListLoading.value) return
  isCategoryListLoading.value = true

  const res = await categoryApi.getCategories({
    keyword: categoryListQuery.keyword,
    page: categoryListQuery.page,
    pageSize: categoryListQuery.pageSize,
  })

  if (res.ok) {
    categoryListQueryResult.value = res.data
  } else {
    showError(res.error)
  }

  isCategoryListLoading.value = false
}

const updateQuery = async (patch: Partial<PageQueryRequest>) => {
  await router.replace({
    query: {
      ...route.query,
      page: patch.page ?? categoryListQuery.page,
      "page-size": patch.pageSize ?? categoryListQuery.pageSize,
      keyword: (patch.keyword ?? categoryListQuery.keyword) || undefined,
    },
  })
}

const handleSearch = async () => {
  await updateQuery({
    page: 1,
    pageSize: categoryListQuery.pageSize,
    keyword: categoryListQuery.keyword,
  })
}

watch(
    () => [route.query.page, route.query["page-size"], route.query.keyword],
    async ([page, pageSize, keyword]) => {
      categoryListQuery.page = Number(page ?? 1)
      categoryListQuery.pageSize = Number(pageSize ?? 20)
      categoryListQuery.keyword = String(keyword ?? "")
      await fetchCategoryList()
    },
    {immediate: true}
)

// === 创建分类 ===
const createCategoryDialogRef = ref<InstanceType<typeof CreateCategoryDialog> | null>(null)

const onCreateCategory = () => {
  createCategoryDialogRef.value?.openDialog()
}

const onCreateCategorySuccess = () => {
  fetchCategoryList()
}

// === 编辑分类 ===
const editCategoryDialogRef = ref<InstanceType<typeof EditCategoryDialog> | null>(null)

const onEditCategory = (category: CategoryType) => {
  editCategoryDialogRef.value?.openDialog(category.id)
}

const onEditCategorySuccess = () => {
  fetchCategoryList()
}

// === 删除分类 ===
const onDeleteCategory = async (category: CategoryType) => {
  const res = await categoryApi.deleteCategory(category.id)
  if (res.ok) {
    ElNotification.success({
      title: '删除成功'
    })

    fetchCategoryList()
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
              v-model="categoryListQuery.keyword"
              class="w-64"
              clearable
              placeholder="搜索分类名称/URL 标识..."
          />
          <el-button plain type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-button :icon="Plus" type="primary" @click="onCreateCategory">新增分类</el-button>
      </div>
      <el-table v-loading="isCategoryListLoading" :data="categoryListQueryResult.content" border class="w-full" stripe>
        <el-table-column align="center" label="id" prop="id" width="60"/>
        <el-table-column label="分类名称" min-width="240" prop="name"/>
        <el-table-column label="URL 标识" min-width="240" prop="slug"/>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button link size="small" type="primary" @click="onEditCategory(row)">编辑</el-button>
            <el-button link size="small" type="danger" @click="onDeleteCategory(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-6 flex justify-end">
        <el-pagination
            :page-size="categoryListQuery.pageSize"
            :total="categoryListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>
    <CreateCategoryDialog ref="createCategoryDialogRef" @success="onCreateCategorySuccess"/>
    <EditCategoryDialog ref="editCategoryDialogRef" @success="onEditCategorySuccess"/>
  </div>
</template>
