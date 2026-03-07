<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Plus} from "@element-plus/icons-vue"
import {userApi} from "@/api/modules/user.ts"
import PageCard from "@/components/PageCard.vue"

interface UserItem {
  id: number
  nickname: string
  username: string
  email?: string
  status: boolean
  // role: string
}

const isUserListLoading = ref(false)

const userListQuery = ref({
  keyword: "",
  total: 100,
  currentPage: 1,
  pageSize: 20
})

const userList = ref<UserItem[]>([])

const handlePageChange = (page: number) => {
  userListQuery.value.currentPage = page
  fetchUserList()
}

const fetchUserList = async () => {
  if (isUserListLoading.value) return

  isUserListLoading.value = true

  const res = await userApi.getUsers(
      userListQuery.value.keyword,
      userListQuery.value.currentPage,
      userListQuery.value.pageSize
  )

  if (res.ok) {
    userList.value = res.data.content
    userListQuery.value.total = res.data.totalElements
  }

  isUserListLoading.value = false
}

const handleBeforeStatusChange = async (user: UserItem) => {
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
    <el-table :data="userList" border stripe class="w-full" v-loading="isUserListLoading">
      <el-table-column prop="id" label="id" width="60" align="center"/>
      <el-table-column prop="nickname" label="用户昵称" width="150"/>
      <el-table-column prop="username" label="用户名" width="150"/>
      <el-table-column prop="email" label="邮箱" min-width="200"/>
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
          :total="userListQuery.total"
          :page-size="userListQuery.pageSize"
          @current-change="handlePageChange"
      />
    </div>
  </PageCard>
</template>
