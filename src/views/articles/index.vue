<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {articleApi} from "@/api/modules/article.ts"
import {categoryApi} from "@/api/modules/category.ts"
import PageCard from "@/components/PageCard.vue"
import CreateArticleDialog from "@/components/article/CreateArticleDialog.vue"
import EditArticleDialog from "@/components/article/EditArticleDialog.vue"
import EditArticleContentDialog from "@/components/article/EditArticleContentDialog.vue"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()

const parseStatus = (value: unknown): ArticleStatusType | undefined => {
  if (value === 'DRAFT' || value === 'PUBLISHED' || value === 'ARCHIVED') {
    return value
  }
  return undefined
}

const parseCategory = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined
  const n = Number(value)
  return Number.isNaN(n) ? undefined : n
}

// === 表格 ===
const isArticleListLoading = ref(false)

const articleListQuery = reactive<ArticleQueryRequest>({
  keyword: String(route.query.keyword ?? ""),
  page: Number(route.query.page ?? 1),
  pageSize: Number(route.query["page-size"] ?? 20),
  category: parseCategory(route.query.category),
  articleStatus: parseStatus(route.query["article-status"]),
  tagIds: undefined,
})

const articleListQueryResult = ref<PageQueryResponse<HomeArticleType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0,
})

const fetchArticleList = async () => {
  if (isArticleListLoading.value) return
  isArticleListLoading.value = true

  const res = await articleApi.getArticles({
    keyword: articleListQuery.keyword,
    page: articleListQuery.page,
    pageSize: articleListQuery.pageSize,
    category: articleListQuery.category,
    articleStatus: articleListQuery.articleStatus,
    tagIds: articleListQuery.tagIds,
  })

  if (res.ok) {
    articleListQueryResult.value = res.data
  } else {
    showError(res.error)
  }

  isArticleListLoading.value = false
}

const replaceRouteQuery = async () => {
  await router.replace({
    query: {
      ...route.query,
      page: articleListQuery.page,
      "page-size": articleListQuery.pageSize,
      keyword: articleListQuery.keyword || undefined,
      category: articleListQuery.category ?? undefined,
      "article-status": articleListQuery.articleStatus ?? undefined,
    },
  })
}

const handlePageChange = async (page: number) => {
  articleListQuery.page = page
  await replaceRouteQuery()
}

const handleSearch = async () => {
  articleListQuery.page = 1
  await replaceRouteQuery()
}

const handleReset = async () => {
  articleListQuery.keyword = ''
  articleListQuery.category = undefined
  articleListQuery.articleStatus = undefined
  articleListQuery.page = 1
  await replaceRouteQuery()
}

watch(
    () => [route.query.page, route.query["page-size"], route.query.keyword, route.query.category, route.query["article-status"]],
    async ([page, pageSize, keyword, category, articleStatus]) => {
      articleListQuery.page = Number(page ?? 1)
      articleListQuery.pageSize = Number(pageSize ?? 20)
      articleListQuery.keyword = String(keyword ?? "")
      articleListQuery.category = parseCategory(category)
      articleListQuery.articleStatus = parseStatus(articleStatus)

      await fetchArticleList()
    },
    {immediate: true}
)

// === 分类筛选 ===
const categoryOptions = ref<CategoryType[]>([])

const fetchCategoryOptions = async () => {
  const res = await categoryApi.getCategories({
    keyword: '',
    page: 1,
    pageSize: 100,
  })

  if (res.ok) {
    categoryOptions.value = res.data.content
  } else {
    showError(res.error)
  }
}

onMounted(() => {
  fetchCategoryOptions()
})

// === 创建文章 ===
const createArticleDialogRef = ref<InstanceType<typeof CreateArticleDialog> | null>(null)

const onCreateArticle = () => {
  createArticleDialogRef.value?.openDialog()
}

const onCreateArticleSuccess = () => {
  fetchArticleList()
}

// === 编辑文章（元数据） ===
const editArticleDialogRef = ref<InstanceType<typeof EditArticleDialog> | null>(null)

const onEditArticle = (article: HomeArticleType) => {
  editArticleDialogRef.value?.openDialog(article.id)
}

const onEditArticleSuccess = () => {
  fetchArticleList()
}

// === 编辑文章内容 ===
const editArticleContentDialogRef = ref<InstanceType<typeof EditArticleContentDialog> | null>(null)

const onEditArticleContent = (article: HomeArticleType) => {
  editArticleContentDialogRef.value?.openDialog(article.id)
}

const onEditArticleContentSuccess = () => {
  fetchArticleList()
}

// === 删除文章 ===
const onDeleteArticle = async (article: HomeArticleType) => {
  const res = await articleApi.deleteArticle(article.id)
  if (res.ok) {
    ElNotification.success({
      title: '删除成功',
    })

    fetchArticleList()
  } else {
    showError(res.error)
  }
}

const articleStatusOptions: { label: string, value: ArticleStatusType }[] = [
  {label: '草稿', value: 'DRAFT'},
  {label: '已发布', value: 'PUBLISHED'},
  {label: '已归档', value: 'ARCHIVED'},
]

const getStatusType = (status: ArticleStatusType): 'info' | 'success' | 'warning' => {
  if (status === 'PUBLISHED') return 'success'
  if (status === 'ARCHIVED') return 'info'
  return 'warning'
}

const getStatusLabel = (status: ArticleStatusType): string => {
  if (status === 'PUBLISHED') return '已发布'
  if (status === 'ARCHIVED') return '已归档'
  return '草稿'
}
</script>
<template>
  <div>
    <PageCard>
      <div class="mb-6 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div class="grid w-full flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(280px,1fr)_220px_180px_auto]">
          <el-input
              v-model="articleListQuery.keyword"
              class="w-full"
              clearable
              placeholder="搜索标题/URL 标识/内容..."
          />

          <el-select
              v-model="articleListQuery.category"
              class="w-full"
              clearable
              filterable
              placeholder="按分类筛选"
          >
            <el-option
                v-for="item in categoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>

          <el-select
              v-model="articleListQuery.articleStatus"
              class="w-full"
              clearable
              placeholder="按状态筛选"
          >
            <el-option
                v-for="item in articleStatusOptions"
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

        <el-button :icon="Plus" type="primary" @click="onCreateArticle">新增文章</el-button>
      </div>

      <el-table v-loading="isArticleListLoading" :data="articleListQueryResult.content" border class="w-full" stripe>
        <el-table-column align="center" label="id" prop="id" width="70"/>
        <el-table-column label="标题" min-width="220" prop="title"/>
        <el-table-column label="URL 标识" min-width="200" prop="slug"/>
        <el-table-column label="分类" min-width="120">
          <template #default="{ row }">
            {{ row.category.name }}
          </template>
        </el-table-column>
        <el-table-column label="标签" min-width="200">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <el-tag
                  v-for="tag in row.tags"
                  :key="tag.id"
                  effect="light"
                  size="small"
                  type="primary"
              >
                {{ tag.name }}
              </el-tag>
              <span v-if="!row.tags || row.tags.length === 0" class="text-gray-400">暂无标签</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.articleStatus)">{{ getStatusLabel(row.articleStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="作者" min-width="100">
          <template #default="{ row }">
            {{ row.author.nickname }}
          </template>
        </el-table-column>
        <el-table-column label="内容预览" min-width="220" prop="homeContent" show-overflow-tooltip/>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="{ row }">
            <el-button link size="small" type="primary" @click="onEditArticle(row)">编辑信息</el-button>
            <el-button link size="small" type="primary" @click="onEditArticleContent(row)">编辑内容</el-button>
            <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                title="确认删除这篇文章吗？"
                @confirm="onDeleteArticle(row)"
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
            :page-size="articleListQuery.pageSize"
            :total="articleListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>

    <CreateArticleDialog ref="createArticleDialogRef" @success="onCreateArticleSuccess"/>
    <EditArticleDialog ref="editArticleDialogRef" @success="onEditArticleSuccess"/>
    <EditArticleContentDialog ref="editArticleContentDialogRef" @success="onEditArticleContentSuccess"/>
  </div>
</template>
