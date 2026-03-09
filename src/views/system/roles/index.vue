<script setup lang="ts">
import {onMounted, ref} from "vue"
import PageCard from "@/components/PageCard.vue"
import {roleApi} from "@/api/modules/role.ts"
import {Plus} from "@element-plus/icons-vue"
import CreateRoleForm from "@/components/role/CreateRoleForm.vue"
import EditRoleForm from "@/components/role/EditRoleForm.vue"

const isRoleListLoading = ref(false)
const isRolePermissionListLoading = ref(false)
const isRolePermissionDialogVisible = ref(false)
const isCreateRoleDialogVisible = ref(false)
const isEditRoleDialogVisible = ref(false)
const editRoleId = ref(0)

const onEditRole = (role: RoleType) => {
  editRoleId.value = role.id
  isEditRoleDialogVisible.value = true
}

const onEditRoleSuccess = () => {
  isEditRoleDialogVisible.value = false
  fetchRoleList()
}


const onCreateRoleSuccess = () => {
  isCreateRoleDialogVisible.value = false
  fetchRoleList()
}

const rolePermissionList = ref<RoleType[]>([])

const roleListQuery = ref<PageQueryRequest>({
  keyword: "",
  page: 1,
  pageSize: 20
})

const roleListQueryResult = ref<PageQueryResponse<RoleType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0
})

const handlePageChange = (page: number) => {
  roleListQuery.value.page = page
  fetchRoleList()
}

const fetchRoleList = async () => {
  if (isRoleListLoading.value) return
  isRoleListLoading.value = true

  const res = await roleApi.getRoles(roleListQuery.value)
  if (res.ok) {
    roleListQueryResult.value = res.data
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
              v-model="roleListQuery.keyword"
              placeholder="搜索标识符/名字/描述..."
              class="w-64"
              clearable
          />
          <el-button type="primary" plain @click="fetchRoleList">搜索</el-button>
        </div>
        <el-button :icon="Plus" type="primary" @click="isCreateRoleDialogVisible = true">创建角色</el-button>
      </div>
      <el-table
          v-loading="isRoleListLoading"
          :data="roleListQueryResult.content"
          border
          class="w-full"
          stripe
      >
        <el-table-column align="center" label="id" prop="id" width="60"/>
        <el-table-column label="标识符" prop="code" width="350"/>
        <el-table-column label="名字" prop="name" width="250"/>
        <el-table-column label="描述" min-width="300" prop="description"/>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button
                link
                size="small"
                type="primary"
                @click="fetchRolePermissions(row.id)"
            >
              权限
            </el-button>
            <el-button link size="small" type="primary" @click="onEditRole(row)">编辑</el-button>
            <el-button disabled link size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-6 flex justify-end">
        <el-pagination
            :page-size="roleListQuery.pageSize"
            :total="roleListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>
    <el-dialog
        v-model="isRolePermissionDialogVisible"
        title="绑定的权限"
        width="960"
    >
      <el-table
          :data="rolePermissionList"
          border
          stripe
          class="w-full"
          v-loading="isRolePermissionListLoading"
      >
        <el-table-column align="center" label="id" prop="id" width="60"/>
        <el-table-column label="标识符" prop="code" width="350"/>
        <el-table-column label="名字" prop="name" width="250"/>
        <el-table-column label="描述" min-width="300" prop="description"/>
      </el-table>
    </el-dialog>
    <el-dialog
        v-model="isCreateRoleDialogVisible"
        title="创建角色"
        width="380"
    >
      <CreateRoleForm @success="onCreateRoleSuccess"/>
    </el-dialog>
    <el-dialog
        v-model="isEditRoleDialogVisible"
        title="编辑角色"
        width="380"
    >
      <EditRoleForm :id="editRoleId" @success="onEditRoleSuccess"/>
    </el-dialog>
  </div>
</template>
