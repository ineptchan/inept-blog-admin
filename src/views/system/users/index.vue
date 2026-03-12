<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {userApi} from "@/api/modules/user.ts"
import PageCard from "@/components/PageCard.vue"

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

const handleBeforeStatusChange = async (user: UserRoleType) => {
  await userApi.updateUserStatus(user.id, !user.status)
  fetchUserList()
}

onMounted(() => {
  fetchUserList()
})
</script>
<template>
  <PageCard>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div class="flex gap-2 w-full sm:w-auto">
        <el-input
            v-model="userListQuery.keyword"
            placeholder="搜索昵称/用户名/邮箱..."
            class="w-64"
            clearable
        />
        <el-button type="primary" plain @click="fetchUserList">搜索</el-button>
      </div>
      <el-button type="primary" :icon="Plus">新增用户</el-button>
    </div>
    <el-table v-loading="isUserListLoading" :data="userListQueryResult.content" border class="w-full" stripe>
      <el-table-column prop="id" label="id" width="60" align="center"/>
      <el-table-column prop="nickname" label="用户昵称" width="150"/>
      <el-table-column prop="username" label="用户名" width="150"/>
      <el-table-column prop="email" label="邮箱" min-width="200"/>
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
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" :before-change="() => handleBeforeStatusChange(row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="">
          <el-button size="small" type="primary" link>编辑</el-button>
          <el-button size="small" type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-6 flex justify-end">
      <el-pagination
          background
          layout="total, prev, pager, next"
          :total="userListQueryResult.totalElements"
          :page-size="userListQuery.pageSize"
          @current-change="handlePageChange"
      />
    </div>
  </PageCard>
</template>
