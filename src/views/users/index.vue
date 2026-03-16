<script setup lang="ts">
import {reactive, ref, watch} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {userApi} from "@/api/modules/user.ts"
import PageCard from "@/components/PageCard.vue"
import CreateUserDialog from "@/components/user/CreateUserDialog.vue"
import EditUserDialog from "@/components/user/EditUserDialog.vue"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"
import {useRoute, useRouter} from "vue-router"

const route = useRoute()
const router = useRouter()

// === 表格 ===
const isUserListLoading = ref(false)

const userListQuery = reactive<PageQueryRequest>({
  keyword: String(route.query.keyword ?? ""),
  page: Number(route.query.page ?? 1),
  pageSize: Number(route.query["page-size"] ?? 20),
})

const userListQueryResult = ref<PageQueryResponse<UserRoleType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0
})

const handlePageChange = async (page: number) => {
  await updateQuery({page})
}

const fetchUserList = async () => {
  if (isUserListLoading.value) return
  isUserListLoading.value = true

  const res = await userApi.getUsers({
    keyword: userListQuery.keyword,
    page: userListQuery.page,
    pageSize: userListQuery.pageSize,
  })
  if (res.ok) {
    userListQueryResult.value = res.data
  } else {
    showError(res.error)
  }

  isUserListLoading.value = false
}

const updateQuery = async (patch: Partial<PageQueryRequest>) => {
  await router.replace({
    query: {
      ...route.query,
      page: patch.page ?? userListQuery.page,
      "page-size": patch.pageSize ?? userListQuery.pageSize,
      keyword: (patch.keyword ?? userListQuery.keyword) || undefined,
    },
  })
}

const handleSearch = async () => {
  await updateQuery({
    page: 1,
    pageSize: userListQuery.pageSize,
    keyword: userListQuery.keyword,
  })
}

watch(
    () => [route.query.page, route.query["page-size"], route.query.keyword],
    async ([page, pageSize, keyword]) => {
      userListQuery.page = Number(page ?? 1)
      userListQuery.pageSize = Number(pageSize ?? 20)
      userListQuery.keyword = String(keyword ?? "")
      await fetchUserList()
    },
    {immediate: true}
)

// === 更新用户 ===
const onStatusChange = async (user: UserRoleType) => {
  const res = await userApi.updateUser(user.id, {
    status: !user.status
  })

  if (res.ok) {
    fetchUserList()
    return true
  }

  showError(res.error)
  return false
}

// === 创建用户 ===
const createUserDialogRef = ref<InstanceType<typeof CreateUserDialog> | null>(null)

const onCreateUser = () => {
  createUserDialogRef.value?.openDialog()
}

const onCreateUserSuccess = () => {
  fetchUserList()
}

// === 编辑用户 ===
const editUserDialogRef = ref<InstanceType<typeof EditUserDialog> | null>(null)

const onEditUser = (user: UserRoleType) => {
  editUserDialogRef.value?.openDialog(user.id)
}

const onEditUserSuccess = () => {
  fetchUserList()
}

// === 删除用户 ===
const onDeleteUser = async (user: UserRoleType) => {
  const res = await userApi.deleteUser(user.id)
  if (res.ok) {
    ElNotification.success({
      title: '删除成功'
    })

    fetchUserList()
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
              v-model="userListQuery.keyword"
              class="w-64"
              clearable
              placeholder="搜索昵称/用户名/邮箱..."
          />
          <el-button plain type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <el-button :icon="Plus" type="primary" @click="onCreateUser">新增用户</el-button>
      </div>
      <el-table v-loading="isUserListLoading" :data="userListQueryResult.content" border class="w-full" stripe>
        <el-table-column align="center" label="id" prop="id" width="60"/>
        <el-table-column label="用户昵称" prop="nickname" width="150"/>
        <el-table-column label="用户名" prop="username" width="150"/>
        <el-table-column label="邮箱" min-width="200" prop="email"/>
        <el-table-column label="角色" min-width="220">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <el-tag
                  v-for="role in row.roles"
                  :key="role.id"
                  effect="light"
                  size="small"
                  type="primary"
              >
                {{ role.name }}
              </el-tag>
              <span v-if="!row.roles || row.roles.length === 0" class="text-gray-400">
        暂无角色
      </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" :before-change="() => onStatusChange(row)"/>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button link size="small" type="primary" @click="onEditUser(row)">编辑</el-button>
            <el-button link size="small" type="danger" @click="onDeleteUser(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-6 flex justify-end">
        <el-pagination
            :page-size="userListQuery.pageSize"
            :total="userListQueryResult.totalElements"
            background
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
        />
      </div>
    </PageCard>
    <CreateUserDialog ref="createUserDialogRef" @success="onCreateUserSuccess"/>
    <EditUserDialog ref="editUserDialogRef" @success="onEditUserSuccess"/>
  </div>
</template>
