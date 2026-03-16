<script setup lang="ts">
import {onMounted} from "vue"
import {useUserStore} from "@/stores/userStore.ts"
import {authApi} from "@/api/modules/auth.ts"
import {useRouter} from "vue-router"
import {userApi} from "@/api/modules/user.ts"
import {showError} from "@/util/errorUtil.ts"

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  const authRes = await authApi.refresh()
  if (!authRes.ok) {
    router.push("/login")
    return
  }

  userStore.saveAccessToken(authRes.data.accessToken)

  const userRes = await userApi.getProfile()
  if (userRes.ok) {
    userStore.saveProfile(userRes.data)
  } else {
    showError(userRes.error)
  }
})
</script>
<template>
  <RouterView/>
</template>
<style scoped>
</style>
