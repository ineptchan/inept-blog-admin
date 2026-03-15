<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {userApi} from "@/api/modules/user.ts"
import PageCard from "@/components/PageCard.vue"
import CreateUserForm from "@/components/user/CreateUserForm.vue"
import EditUserForm from "@/components/user/EditUserForm.vue"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"

// === 表格 ===
const isUserListLoading = ref(false)

const userListQuery = ref<PageQueryRequest>({
  keyword: '',
  page: 1,
  pageSize: 20
})

const userListQueryResult = ref<PageQueryResponse<UserRoleType>>({
  content: [],
  page: 1,
  size: 0,
  totalElements: 0,
  totalPages: 0
})

const handlePageChange = (page: number) => {
  userListQuery.value.page = page
  fetchUserList()
}

const fetchUserList = async () => {
  if (isUserListLoading.value) return
  isUserListLoading.value = true

  const res = await userApi.getUsers(userListQuery.value)
  if (res.ok) {
    userListQueryResult.value = res.data
  }

  isUserListLoading.value = false
}

onMounted(() => {
  fetchUserList()
})

// === 更新用户 ===
const onStatusChange = async (user: UserRoleType) => {
  await userApi.updateUserStatus(user.id, !user.status)
  fetchUserList()
}

// === 创建用户 ===
const isCreateUserDialogVisible = ref(false)

const onCreateUserSuccess = () => {
  isCreateUserDialogVisible.value = false
  fetchUserList()
}

// === 编辑用户 ===
const isEditUserDialogVisible = ref(false)
const editUserId = ref(0)

const onEditUser = (user: UserRoleType) => {
  editUserId.value = user.id
  isEditUserDialogVisible.value = true
}

const onEditUserSuccess = () => {
  isEditUserDialogVisible.value = false
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
          <el-button plain type="primary" @click="fetchUserList">搜索</el-button>
        </div>
        <el-button :icon="Plus" type="primary" @click="isCreateUserDialogVisible=true">新增用户</el-button>
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
    <el-dialog
        v-model="isCreateUserDialogVisible"
        title="创建用户"
        width="380"
    >
      <CreateUserForm @success="onCreateUserSuccess"/>
    </el-dialog>
    <el-dialog
        v-model="isEditUserDialogVisible"
        title="编辑用户"
        width="520"
    >
      <EditUserForm :id="editUserId" @success="onEditUserSuccess"/>
    </el-dialog>
  </div>
</template>
