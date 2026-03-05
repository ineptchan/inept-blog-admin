<template>
  <div>
    <!-- Tailwind 间距和文字排版 -->
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">数据概览</h2>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <el-card shadow="hover" class="rounded-xl border-none" v-for="item in stats" :key="item.title">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-sm text-gray-500 mb-1">{{ item.title }}</div>
            <div class="text-3xl font-bold text-gray-800">{{ item.value }}</div>
          </div>
          <div :class="`p-3 rounded-full ${item.bgColor} text-white flex items-center justify-center`">
            <el-icon class="text-xl"><component :is="item.icon" /></el-icon>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表或详情区占位 -->
    <div class="bg-white p-6 rounded-xl shadow-sm min-h-[400px]">
      <h3 class="text-lg font-medium text-gray-800 mb-4">最近一周访问趋势</h3>
      <div class="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded text-gray-400">
        ECharts 图表容器
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { View, User, ShoppingCart, Money } from '@element-plus/icons-vue'

const stats =[
  { title: '总访问量', value: '124,592', icon: View, bgColor: 'bg-blue-500' },
  { title: '新增用户', value: '3,214', icon: User, bgColor: 'bg-green-500' },
  { title: '今日订单', value: '542', icon: ShoppingCart, bgColor: 'bg-purple-500' },
  { title: '总营业额', value: '￥42,390', icon: Money, bgColor: 'bg-red-500' },
]
</script>
