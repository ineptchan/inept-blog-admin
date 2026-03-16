<script lang="ts" setup>
import {onMounted, ref} from "vue"
import {permissionApi} from "@/api/modules/permission.ts"

const modelValue = defineModel<number[]>({
  default: () => []
})

const loading = ref(false)
const remoteMethodData = ref<PermissionType[]>([])

const remoteMethod = async (query: string) => {
  loading.value = true
  try {
    const res = await permissionApi.getPermissions({
      keyword: query,
      page: 1,
      pageSize: 100
    })
    if (res.ok) {
      remoteMethodData.value = res.data.content
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await remoteMethod("")
})
</script>
<template>
  <el-select
      v-model="modelValue"
      :loading="loading"
      :max-collapse-tags="4"
      :remote-method="remoteMethod"
      class="max-w"
      clearable
      collapse-tags
      collapse-tags-tooltip
      filterable
      multiple
      placeholder="请选择权限"
      remote
      remote-show-suffix
      reserve-keyword
  >
    <el-option
        v-for="item in remoteMethodData"
        :key="item.id"
        :label="item.name"
        :value="item.id"
    >
      <span class="float-left">{{ item.name }}</span>
      <span class="float-right text-[13px] text-(--el-text-color-secondary)">
        {{ item.code }}
      </span>
    </el-option>
  </el-select>
</template>
