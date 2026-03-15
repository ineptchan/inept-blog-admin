<script setup lang="ts">
import {useDark} from '@vueuse/core'
import {reactive, ref} from "vue"
import {authApi} from "@/api/modules/auth.ts"
import {userApi} from "@/api/modules/user.ts"
import {useUserStore} from "@/stores/userStore.ts"
import {storeToRefs} from "pinia"
import CreateUserForm from "@/components/user/CreateUserForm.vue"
import RoleSelect from "@/components/role/RoleSelect.vue"

let userStore = useUserStore()
const isDark = useDark()

const {accessToken} = storeToRefs(userStore)

type LoginForm = {
  account: string;
  password: string;
  remember: boolean;
};

const form = reactive<LoginForm>({
  account: "admintest",
  password: "admin123456",
  remember: true,
});

const loginMsg = reactive({
  id: 0,
  username: '',
  nickname: '',
  email: '',
  accessToken: '',
})
const logoutMsg = ref('')
const refreshMsg = ref('')

const login = async () => {
  const res = await authApi.login({username: form.account, password: form.password})
  if (res.ok) {
    loginMsg.id = res.data.id
    loginMsg.username = res.data.username
    loginMsg.nickname = res.data.nickname
    loginMsg.email = res.data.email ? res.data.email : ''
    loginMsg.accessToken = res.data.accessToken

    //
    userStore.saveAccessToken(res.data.accessToken);
    userStore.saveUser(
        {
          id: res.data.id,
          nickname: res.data.nickname,
          username: res.data.username,
          email: res.data.email
        }
    )
  }
}

const logout = async () => {
  const res = await authApi.logout()
  if (res.ok) {
    logoutMsg.value = res.data
  } else {
    logoutMsg.value = res.error.detail
  }
}
const refresh = async () => {
  const res = await authApi.refresh()
  if (res.ok) {
    refreshMsg.value = res.data.accessToken
  } else {
    refreshMsg.value = res.error.detail
  }
}
const users = ref<{
  id: number
  nickname: string
  username: string
  email?: string | undefined
}[]>([])
const page = ref({
  page: 0,
  size: 20,
  total: 0,
})

const getUsers = async () => {
  const res = await userApi.getUsers({keyword: '', page: 1, pageSize: 20})
  if (res.ok) {
    users.value = res.data.content
    page.value.total = res.data.totalElements
  }
}
</script>
<template>
  <div class="flex flex-col gap-4">
    <el-card>
      <template #header>Dark</template>
      <template #default>
        <el-switch v-model="isDark" inactive-text="深色模式"></el-switch>
      </template>
    </el-card>
    <el-card>
      <template #header>Auth</template>
      <template #default>
        <el-input v-model="form.account" placeholder="username"/>
        <el-input v-model="form.password" autocomplete="password"/>
        <el-button @click="login">登录</el-button>
        <el-button @click="logout">退出登录</el-button>
        <el-button @click="refresh">刷新令牌</el-button>
      </template>
      <template #footer>
        <el-card>
          <template #header><span class="text-4xl">Login</span></template>
          <label class="block"> id=<code>{{ loginMsg.id }}</code></label>
          <label class="block"> username=<code>{{ loginMsg.username }}</code></label>
          <label class="block"> nickname=<code>{{ loginMsg.nickname }}</code></label>
          <label class="block"> email=<code>{{ loginMsg.email }}</code></label>
          <label class="block"> accessToken=<code>{{ loginMsg.accessToken }}</code></label>
        </el-card>
        <span class="block">logoutMsg:<code>{{ logoutMsg }}</code></span>
        <span class="block">refresh:<code>{{ refreshMsg }}</code></span>
        <code></code>
      </template>
    </el-card>
    <el-card v-if="false">
      <template #header>User</template>
      <template #default>
        <el-table :data="users" border>
          <el-table-column prop="id" label="id"/>
          <el-table-column prop="nickname" label="nickname"/>
          <el-table-column prop="username" label="username"/>
          <el-table-column prop="email" label="email"/>
        </el-table>
        <el-pagination
            layout="sizes, prev, pager, next"
            :page-sizes="[20, 40, 60, 100]"
            :size="page.size"
            :total="50"
        />
      </template>
      <template #footer>
        <el-button @click="getUsers">获取用户</el-button>
      </template>
    </el-card>
    <el-card>
      <template #header>Pinia</template>
      <template #default>
        <div>{{ accessToken }}</div>
      </template>
    </el-card>
    <el-card>
      <CreateUserForm></CreateUserForm>
    </el-card>
    <el-card>
      <RoleSelect></RoleSelect>
    </el-card>
  </div>
</template>
<style scoped>
</style>
