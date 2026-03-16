<script setup lang="ts">
import {reactive, ref, watch} from "vue"
import PageCard from "@/components/PageCard.vue"
import {roleApi} from "@/api/modules/role.ts"
import {Plus} from "@element-plus/icons-vue"
import {useRoute, useRouter} from "vue-router"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"
import CreateRoleDialog from "@/components/role/CreateRoleDialog.vue"
import EditRoleDialog from "@/components/role/EditRoleDialog.vue"
import RolePermissionTableDialog from "@/components/role/RolePermissionTableDialog.vue"

const route = useRoute()
const router = useRouter()

// === 编辑角色 ===
const editRoleDialogRef = ref<InstanceType<typeof EditRoleDialog> | null>(null)

const onEditRole = (role: RoleType) => {
  editRoleDialogRef.value?.openDialog(role.id)
}

const onEditRoleSuccess = () => {
  fetchRoleList()
}

// === 创建角色 ===
const createRoleDialogRef = ref<InstanceType<typeof CreateRoleDialog> | null>(null)

const onCreateRole = () => {
  createRoleDialogRef.value?.openDialog()
}

const onCreateRoleSuccess = () => {
  fetchRoleList()
}

// === 表格 ===
const isRoleListLoading = ref(false)

const roleListQuery = reactive<PageQueryRequest>({
  keyword: String(route.query.keyword ?? ""),
  page: Number(route.query.page ?? 1),
  pageSize: Number(route.query["page-size"] ?? 20),
})

const roleListQueryResult = ref<PageQueryResponse<RoleType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0
})

const fetchRoleList = async () => {
  if (isRoleListLoading.value) return
  isRoleListLoading.value = true

  const res = await roleApi.getRoles({
    keyword: roleListQuery.keyword,
    page: roleListQuery.page,
    pageSize: roleListQuery.pageSize,
  })

  if (res.ok) {
    roleListQueryResult.value = res.data
  } else {
    showError(res.error)
  }

  isRoleListLoading.value = false
}

const updateQuery = async (patch: Partial<PageQueryRequest>) => {
  await router.replace({
    query: {
      ...route.query,
      page: patch.page ?? roleListQuery.page,
      "page-size": patch.pageSize ?? roleListQuery.pageSize,
      keyword: (patch.keyword ?? roleListQuery.keyword) || undefined,
    },
  })
}

const handlePageChange = async (page: number) => {
  await updateQuery({page})
}

const handleSearch = async () => {
  await updateQuery({
    page: 1,
    pageSize: roleListQuery.pageSize,
    keyword: roleListQuery.keyword,
  })
}

watch(
    () => [route.query.page, route.query["page-size"], route.query.keyword],
    async ([page, pageSize, keyword]) => {
      roleListQuery.page = Number(page ?? 1)
      roleListQuery.pageSize = Number(pageSize ?? 20)
      roleListQuery.keyword = String(keyword ?? "")
      await fetchRoleList()
    },
    {immediate: true}
)

// === 删除角色 ===
const onDeleteRole = async (role: RoleType) => {
  if (isRoleListLoading.value) return

  const res = await roleApi.deleteRole(role.id)
  if (res.ok) {
    ElNotification.success({
      title: '删除角色成功'
    })
  } else {
    showError(res.error)
  }
}

// === 角色权限 ===
const rolePermissionTableDialogRef = ref<InstanceType<typeof RolePermissionTableDialog> | null>(null)

const onOpenRolePermissionDialog = (row: RoleType) => {
  rolePermissionTableDialogRef.value?.openDialog(row.id)
}
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
          <el-button plain type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-button :icon="Plus" type="primary" @click="onCreateRole">创建角色</el-button>
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
                @click="onOpenRolePermissionDialog(row)"
            >
              权限
            </el-button>
            <el-button link size="small" type="primary" @click="onEditRole(row)">编辑</el-button>
            <el-popconfirm
                cancel-button-text="取消"
                confirm-button-text="确认"
                title="确认删除这个角色吗？"
                @confirm="onDeleteRole(row)"
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
            :page-size="roleListQuery.pageSize"
            :total="roleListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>
    <RolePermissionTableDialog ref="rolePermissionTableDialogRef"/>
    <CreateRoleDialog ref="createRoleDialogRef" @success="onCreateRoleSuccess"/>
    <EditRoleDialog ref="editRoleDialogRef" @success="onEditRoleSuccess"/>
  </div>
</template>
