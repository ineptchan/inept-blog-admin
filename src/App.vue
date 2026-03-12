<script setup lang="ts">
import {onMounted} from "vue"
import {useUserStore} from "@/stores/userStore.ts"
import {authApi} from "@/api/modules/auth.ts"
import {useRouter} from "vue-router"

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  const res = await authApi.refresh()
  if (res.ok) {
    userStore.saveAccessToken(res.data.accessToken)
  } else {
    router.push("/login")
  }
})
</script>
<template>
  <RouterView/>
</template>
<style scoped>
</style>
