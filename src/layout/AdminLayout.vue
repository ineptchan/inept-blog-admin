<template>
  <!-- 外层容器：占满全屏高度，Flex 布局 -->
  <div class="flex h-screen bg-gray-50 overflow-hidden">

    <!-- 左侧侧边栏 -->
    <aside class="w-64 bg-white shadow-md flex flex-col transition-all duration-300">
      <!-- Logo 区域 -->
      <div class="h-16 flex items-center justify-center border-b border-gray-100">
        <span class="text-xl font-bold text-indigo-600 tracking-wider">ADMIN PANEL</span>
      </div>

      <!-- 菜单区域 (结合 Element Plus) -->
      <el-menu
          :default-active="$route.path"
          class="flex-1 overflow-y-auto border-r-0 !border-none custom-menu"
          router
      >
        <el-menu-item index="/dashboard">
          <el-icon><DataBoard /></el-icon>
          <span>控制台</span>
        </el-menu-item>

        <el-menu-item index="/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-sub-menu index="/settings">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/settings/role">角色管理</el-menu-item>
          <el-menu-item index="/settings/menu">菜单管理</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/dev">
          <el-icon><User /></el-icon>
          <span>开发</span>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 右侧主体区 -->
    <div class="flex-1 flex flex-col min-w-0">

      <!-- 顶部 Header -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
        <!-- 面包屑 -->
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 用户信息 -->
        <div class="flex items-center gap-4 hover:cursor-pointer">
          <el-badge is-dot class="mt-1">
            <el-icon class="text-xl text-gray-500"><Bell /></el-icon>
          </el-badge>
          <el-dropdown trigger="click">
            <span class="flex items-center gap-2 outline-none">
              <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              <span class="text-sm text-gray-700">Admin</span>
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided text-color="red">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 页面内容区 -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <!-- 路由出口，加入过渡动画 -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataBoard, User, Setting, Bell, CaretBottom } from '@element-plus/icons-vue'
</script>

<style scoped>
/* 隐藏 Element 菜单默认的右侧边框 */
.custom-menu {
  border-right: none;
}
/* 路由切换渐变动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
