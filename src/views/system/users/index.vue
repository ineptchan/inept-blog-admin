<template>
  <div class="bg-white p-6 rounded-xl shadow-sm">

    <!-- 顶部操作区 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <!-- 搜索框 -->
      <div class="flex gap-2 w-full sm:w-auto">
        <el-input v-model="searchQuery" placeholder="搜索用户名/邮箱..." class="w-64" clearable />
        <el-button type="primary" plain>搜索</el-button>
      </div>
      <!-- 操作按钮 -->
      <el-button type="primary" :icon="Plus">新增用户</el-button>
    </div>

    <!-- Element Plus 表格 -->
    <el-table :data="tableData" border stripe class="w-full" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="name" label="用户名" width="150" />
      <el-table-column prop="email" label="邮箱" min-width="200" />
      <el-table-column prop="role" label="角色" width="120">
        <template #default="{ row }">
          <el-tag :type="row.role === 'Admin' ? 'danger' : 'success'">
            {{ row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
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
          :total="100"
          :page-size="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const searchQuery = ref('')
const loading = ref(false)

// 模拟带有 TS 类型的表格数据
interface UserData {
  name: string
  email: string
  role: string
  status: boolean
}

const tableData = ref<UserData[]>([
  { name: 'Evan You', email: 'evan@vuejs.org', role: 'Admin', status: true },
  { name: 'John Doe', email: 'john@example.com', role: 'User', status: true },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: false }
])
</script>
