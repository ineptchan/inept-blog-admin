<script setup lang="ts">
import PageCard from "@/components/PageCard.vue"
import {onMounted, ref} from "vue"
import {permissionApi} from "@/api/modules/permission.ts"

interface PermissionItem {
  id: number
  code: string
  name: string
  description?: string
}

const isPermissionListLoading = ref(false)

const permissionListQuery = ref({
  keyword: "",
  total: 100,
  currentPage: 1,
  pageSize: 20
})

const permissionList = ref<PermissionItem[]>([])

const fetchPermissionList = async () => {
  if (isPermissionListLoading.value) return

  isPermissionListLoading.value = true

  const res = await permissionApi.getPermissions(
      permissionListQuery.value.keyword,
      permissionListQuery.value.currentPage,
      permissionListQuery.value.pageSize
  )

  if (res.ok) {
    permissionList.value = res.data.content
    permissionListQuery.value.total = res.data.totalElements
  }

  isPermissionListLoading.value = false
}

const handlePageChange = (page: number) => {
  permissionListQuery.value.currentPage = page
  fetchPermissionList()
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
        <el-button type="primary" plain @click="fetchPermissionList">搜索</el-button>
      </div>
    </div>
    <el-table
        :data="permissionList"
        border
        stripe
        class="w-full"
        v-loading="isPermissionListLoading"
    >
      <el-table-column prop="id" label="id" width="60" align="center"/>
      <el-table-column prop="code" label="标识符" width="350"/>
      <el-table-column prop="name" label="名字" width="250"/>
      <el-table-column prop="description" label="描述" min-width="300"/>
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
          :total="permissionListQuery.total"
          :page-size="permissionListQuery.pageSize"
          @current-change="handlePageChange"
      />
    </div>
  </PageCard>
</template>
