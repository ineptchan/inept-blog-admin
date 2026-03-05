<template>
  <div
      class="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900"
  >
    <div class="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
      <el-card
          shadow="never"
          class="w-full max-w-md rounded-2xl border-0 bg-white/90 backdrop-blur ring-1 ring-black/5
               dark:bg-slate-950/70 dark:ring-white/10"
          body-class="p-8"
      >
        <div class="space-y-2">
          <div class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            登录
          </div>
          <div class="text-sm text-slate-500 dark:text-slate-300">
            请输入账号信息以继续
          </div>
        </div>
        <div class="mt-6">
          <el-form :model="form" label-position="top" size="large">
            <el-form-item label="邮箱 / 用户名">
              <el-input
                  v-model="form.account"
                  placeholder="name@example.com"
                  clearable
                  autocomplete="username"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                  show-password
                  autocomplete="current-password"
              />
            </el-form-item>
            <div class="mt-1 flex items-center justify-between" v-if="false">
              <el-checkbox v-model="form.remember">记住我</el-checkbox>
              <el-link type="primary" underline="never">忘记密码？</el-link>
            </div>
            <el-button class="mt-6 w-full" type="primary" @click="login">
              登录
            </el-button>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import {useUserStore} from "@/stores/tokenStore.ts"
import {authApi} from "@/api/modules/auth.ts"
import {useRouter} from "vue-router"

const userStore = useUserStore()
const router = useRouter()

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

const login = async () => {
  const res = await authApi.login({username: form.account, password: form.password})

  if (res.ok) {
    userStore.saveAccessToken(res.data.accessToken);
    userStore.saveUser(
        {
          id: res.data.id,
          nickname: res.data.nickname,
          username: res.data.username,
          email: res.data.email
        }
    )

    router.replace('/dashboard')
  } else {
    // res.error 是 ApiError 类型
    if (res.error.errors) {
      res.error.errors.forEach((error) => {
        console.log('error:', error);
      })
    } else {
      // 400 等通用错误
      console.log(res.error.title); // "用户名或者密码错误"
    }
  }
}
</script>
