<script setup lang="ts">
import {onMounted, ref} from "vue"
import PageCard from "@/components/PageCard.vue"
import {permissionApi} from "@/api/modules/permission.ts"

interface PermissionItem {
  id: number
  code: string
  name: string
  description?: string
}

const isPermissionListLoading = ref(false)

const permissionListQuery = ref<PageQueryRequest>({
  keyword: "",
  page: 1,
  pageSize: 20
})

const permissionListQueryResult = ref<PageQueryResponse<PermissionItem>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0
})

const handlePageChange = (page: number) => {
  permissionListQuery.value.page = page
  fetchPermissionList()
}

const handleSearch = () => {
  permissionListQuery.value.page = 1
  fetchPermissionList()
}

const fetchPermissionList = async () => {
  if (isPermissionListLoading.value) return
  isPermissionListLoading.value = true

  const res = await permissionApi.getPermissions(permissionListQuery.value)
  if (res.ok) {
    permissionListQueryResult.value = res.data
  }

  isPermissionListLoading.value = false
}

onMounted(() => {
  fetchPermissionList()
})
</script>

<template>
  <PageCard>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div class="flex gap-2 w-full sm:w-auto">
        <el-input
            v-model="permissionListQuery.keyword"
            placeholder="搜索标识符/名字/描述..."
            class="w-64"
            clearable
        />
        <el-button plain type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>

    <el-table
        :data="permissionListQueryResult.content"
        border
        stripe
        class="w-full"
        v-loading="isPermissionListLoading"
    >
      <el-table-column align="center" label="id" prop="id" width="60" />
      <el-table-column label="标识符" prop="code" width="350" />
      <el-table-column label="名字" prop="name" width="250" />
      <el-table-column label="描述" min-width="300" prop="description" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="">
          <el-button size="small" type="primary" link>编辑</el-button>
          <el-button size="small" type="danger" link disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-6 flex justify-end">
      <el-pagination
          background
          layout="total, prev, pager, next"
          :total="permissionListQueryResult.totalElements"
          :page-size="permissionListQuery.pageSize"
          @current-change="handlePageChange"
      />
    </div>
  </PageCard>
</template>
