<script setup lang="ts">
import PageCard from "@/components/PageCard.vue"
import { onMounted, ref } from "vue"
import { roleApi } from "@/api/modules/role.ts"
import BaseTablePagination from "@/components/BaseTablePagination.vue"

// TODO 提取到 type
interface RolePermissionItem {
  id: number
  code: string
  name: string
  description?: string
}

interface RoleItem {
  id: number
  code: string
  name: string
  description?: string
}

const isRoleListLoading = ref(false)
const isRolePermissionListLoading = ref(false)
const isRolePermissionDialogVisible = ref(false)

const rolePermissionList = ref<RolePermissionItem[]>([])

const roleSearchKeyword = ref("")
const pagination = ref({
  total: 100,
  currentPage: 1,
  pageSize: 20
})

const roleList = ref<RoleItem[]>([])

const fetchRoleList = async () => {
  if (isRoleListLoading.value) return

  isRoleListLoading.value = true

  const res = await roleApi.getRoles(
      roleSearchKeyword.value,
      pagination.value.currentPage,
      pagination.value.pageSize
  )

  if (res.ok) {
    roleList.value = res.data.content
    pagination.value.total = res.data.totalElements
  }

  isRoleListLoading.value = false
}

const fetchRolePermissions = async (roleId: number) => {
  isRolePermissionDialogVisible.value = true
  isRolePermissionListLoading.value = true

  const res = await roleApi.getRolePermissions(roleId)
  if (res.ok) {
    rolePermissionList.value = res.data
  }

  isRolePermissionListLoading.value = false
}

const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
  fetchRoleList()
}

onMounted(() => {
  fetchRoleList()
})
</script>

<template>
  <div>
    <PageCard>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div class="flex gap-2 w-full sm:w-auto">
          <el-input
              v-model="roleSearchKeyword"
              placeholder="搜索标识符/名字/描述..."
              class="w-64"
              clearable
          />
          <el-button type="primary" plain @click="fetchRoleList">搜索</el-button>
        </div>
      </div>

      <BaseTablePagination
          :table-data="roleList"
          :loading="isRoleListLoading"
          :page-data="pagination"
          @page-change="handlePageChange"
          @update:pageData="pagination = $event"
      >
        <template #table>
          <el-table-column prop="id" label="id" width="60" align="center" />
          <el-table-column prop="code" label="标识符" width="350" />
          <el-table-column prop="name" label="名字" width="250" />
          <el-table-column prop="description" label="描述" min-width="300" />
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button
                  size="small"
                  type="primary"
                  link
                  @click="fetchRolePermissions(row.id)"
              >
                权限
              </el-button>
              <el-button size="small" type="primary" link>编辑</el-button>
              <el-button size="small" type="danger" link disabled>删除</el-button>
            </template>
          </el-table-column>
        </template>
      </BaseTablePagination>
    </PageCard>

    <el-dialog
        v-model="isRolePermissionDialogVisible"
        title="绑定的权限"
        width="960"
    >
      <!-- TODO 提取 permissions 到统一的地方 -->
      <el-table
          :data="rolePermissionList"
          border
          stripe
          class="w-full"
          v-loading="isRolePermissionListLoading"
      >
        <el-table-column prop="id" label="id" width="60" align="center" />
        <el-table-column prop="code" label="标识符" width="350" />
        <el-table-column prop="name" label="名字" width="250" />
        <el-table-column prop="description" label="描述" min-width="300" />
      </el-table>
    </el-dialog>
  </div>
</template>
