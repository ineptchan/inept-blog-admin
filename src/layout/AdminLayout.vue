<template>
  <div
      class="flex h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-linear-to-br dark:from-zinc-900 dark:via-slate-900 dark:to-zinc-900 dark:text-zinc-100">
    <aside
        class="flex w-64 flex-col bg-white/90 shadow-sm ring-1 ring-slate-200/70 backdrop-blur transition-all duration-300 dark:bg-zinc-900/75 dark:ring-zinc-700/50">
      <div class="flex h-16 items-center justify-center border-b border-slate-200/80 dark:border-zinc-700/60">
        <span class="text-xl font-bold tracking-wider text-indigo-600 dark:text-sky-300">{{ brandName }}</span>
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
      <header
          class="z-10 flex h-16 items-center justify-between bg-white/70 px-6 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:bg-zinc-900/55 dark:ring-zinc-700/50">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flex cursor-pointer items-center gap-4">
          <el-badge class="mt-1" @click="isDark = !isDark">
            <el-icon>
              <IcBaselineDarkMode v-if="!isDark"/>
              <IcBaselineLightMode v-else/>
            </el-icon>
          </el-badge>
          <el-badge is-dot class="mt-1">
            <el-icon class="text-xl text-gray-500 dark:text-zinc-400">
              <Bell/>
            </el-icon>
          </el-badge>
          <el-dropdown trigger="click">
            <span class="flex items-center gap-2 outline-none">
              <el-avatar :size="32" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
              <span class="text-sm text-gray-700 dark:text-zinc-200">{{ userName }}</span>
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
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100/70 p-6 dark:bg-zinc-950/50">
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
import {useDark} from "@vueuse/core"
import IcBaselineDarkMode from '~icons/ic/baseline-dark-mode'
import IcBaselineLightMode from '~icons/ic/baseline-light-mode'

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
  {index: '/articles', label: '文章管理', icon: IcRoundArticle},
  {index: '/categories', label: '类别管理', icon: IcBaselineCategory},
  {index: '/tag', label: '标签管理', icon: IcOutlineNewLabel},
  {index: '/comment', label: '评论管理', icon: IcOutlineComment},
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

// === 深色 ===
const isDark = useDark()
</script>
<style scoped>
.custom-menu {
  border-right: none;
  background-color: transparent;
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
