<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <aside class="flex w-64 flex-col shadow-md transition-all duration-300">
      <div class="flex h-16 items-center justify-center border-b border-gray-100">
        <span class="text-xl font-bold tracking-wider text-indigo-600">{{ brandName }}</span>
      </div>
      <el-menu :default-active="activePath" class="custom-menu flex-1 overflow-y-auto border-r-0 !border-none" router>
        <el-menu-item v-for="item in primaryMenuItems" :key="item.index" :index="item.index">
          <el-icon>
            <component :is="item.icon"/>
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu :index="systemMenu.index">
          <template #title>
            <el-icon>
              <component :is="systemMenu.icon"/>
            </el-icon>
            <span>{{ systemMenu.label }}</span>
          </template>
          <el-menu-item v-for="item in systemMenu.children" :key="item.index" :index="item.index">
            <el-icon v-if="item.icon">
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </aside>
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="z-10 flex h-16 items-center justify-between px-6 shadow-sm">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex cursor-pointer items-center gap-4">
          <el-badge is-dot class="mt-1">
            <el-icon class="text-xl text-gray-500">
              <Bell/>
            </el-icon>
          </el-badge>
          <el-dropdown trigger="click">
            <span class="flex items-center gap-2 outline-none">
              <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
              <span class="text-sm text-gray-700">{{ userName }}</span>
              <el-icon>
                <CaretBottom/>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                    v-for="action in userActions"
                    :key="action.label"
                    :divided="action.divided"
                    :text-color="action.textColor"
                >
                  {{ action.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import {type Component, computed, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {Bell, CaretBottom} from '@element-plus/icons-vue'
import {useUserStore} from "@/stores/userStore.ts"
import {storeToRefs} from "pinia"

import IcRoundDashboard from '~icons/ic/round-dashboard'
import IcRoundManageAccounts from '~icons/ic/round-manage-accounts'
import IcOutlineSettings from '~icons/ic/outline-settings'
import IcBaselineAdminPanelSettings from '~icons/ic/baseline-admin-panel-settings'
import IcRoundVpnKey from '~icons/ic/round-vpn-key'
import IcOutlineCode from '~icons/ic/outline-code'
import IcRoundArticle from '~icons/ic/round-article'
import IcBaselineCategory from '~icons/ic/baseline-category'
import IcOutlineNewLabel from '~icons/ic/outline-new-label'
import IcOutlineComment from '~icons/ic/outline-comment'

interface MenuItem {
  index: string
  label: string
  icon?: Component
}

interface MenuGroup {
  index: string
  label: string
  icon: Component
  children: readonly MenuItem[]
}

interface UserAction {
  label: string
  divided?: boolean
  textColor?: string
}

const route = useRoute()
const userStore = useUserStore()
const {profile} = storeToRefs(userStore)

const brandName = 'ADMIN PANEL'
const userName = ref<string>('未知用户')

const primaryMenuItems: readonly MenuItem[] = [
  {index: '/dashboard', label: '控制台', icon: IcRoundDashboard},
  {index: '/users', label: '用户管理', icon: IcRoundManageAccounts},
  { index: '/articles', label: '文章管理', icon: IcRoundArticle },
  { index: '/categories', label: '类别管理', icon: IcBaselineCategory },
  { index: '/tag', label: '标签管理', icon: IcOutlineNewLabel },
  { index: '/comment', label: '评论管理', icon: IcOutlineComment },
]

const systemMenu: MenuGroup = {
  index: '/settings',
  label: '系统设置',
  icon: IcOutlineSettings,
  children: [
    {index: '/roles', label: '角色管理', icon: IcBaselineAdminPanelSettings},
    {index: '/permissions', label: '权限管理', icon: IcRoundVpnKey},
    {index: '/dev', label: '开发', icon: IcOutlineCode},
  ],
}

const userActions: readonly UserAction[] = [
  {label: '个人中心'},
  {label: '退出登录', divided: true, textColor: 'red'},
]

const activePath = computed(() => route.path)
const currentPageTitle = computed(() => String(route.meta.title ?? ''))

watch(() => profile.value, (v) => {
  if (v) {
    userName.value = v.nickname
  }
})
</script>
<style scoped>
.custom-menu {
  border-right: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
