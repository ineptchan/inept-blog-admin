<template>
  <div class="bg-white p-6 rounded-xl shadow-sm">
    <!-- 顶部操作区 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <!-- 搜索框 -->
      <div class="flex gap-2 w-full sm:w-auto">
        <el-input v-model="pageData.searchQuery" placeholder="搜索昵称/用户名/邮箱..." class="w-64" clearable/>
        <el-button type="primary" plain @click="onSearch">搜索</el-button>
      </div>
      <!-- 操作按钮 -->
      <el-button type="primary" :icon="Plus">新增用户</el-button>
    </div>
    <!-- Element Plus 表格 -->
    <el-table :data="tableData" border stripe class="w-full" v-loading="loading">
      <el-table-column prop="id" label="id" width="60" align="center"/>
      <el-table-column prop="nickname" label="用户昵称" width="150"/>
      <el-table-column prop="username" label="用户名" width="150"/>
      <el-table-column prop="email" label="邮箱" min-width="200"/>
      <!--      <el-table-column prop="role" label="角色" width="120">-->
      <!--        <template #default="{ row }">-->
      <!--          <el-tag :type="row.role === 'Admin' ? 'danger' : 'success'">-->
      <!--            {{ row.role }}-->
      <!--          </el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" :before-change="() => beforeStatusChange(row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="">
          <el-button size="small" type="primary" link>编辑</el-button>
          <el-button size="small" type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="mt-6 flex justify-end">
      <el-pagination
          background
          layout="total, prev, pager, next"
          :total="pageData.total"
          :page-size="pageData.pageSize"
          @current-change="onPageChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'
import {userApi} from "@/api/modules/user.ts"

const loading = ref(false)

const pageData = ref({
  searchQuery: '',
  total: 100,
  page: 1,
  pageSize: 20
})

interface UserData {
  id: number,
  nickname: string
  username: string
  email?: string | undefined,
  status: boolean
  // role: string
}

const tableData = ref<UserData[]>([])

const onPageChange = (page: number) => {
  pageData.value.page = page
  onSearch()
}

const onSearch = async () => {
  if (loading.value) return

  loading.value = true

  const res = await userApi.getUsers(pageData.value.searchQuery, pageData.value.page - 1, pageData.value.pageSize)
  if (res.ok) {
    tableData.value = res.data.content
    pageData.value.total = res.data.totalElements
  }

  loading.value = false
}

const beforeStatusChange = async (row: UserData) => {
  await userApi.updateUserStatus(row.id, !row.status)
  onSearch()
}

onMounted(() => {
  onSearch()
})
</script>
