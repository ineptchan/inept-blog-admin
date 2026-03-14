<script lang="ts" setup>
import {ref, watch} from "vue"
import {roleApi} from "@/api/modules/role.ts"
import {showError} from "@/util/errorUtil.ts"
import {permissionApi} from "@/api/modules/permission.ts"
import {ElNotification} from "element-plus"

const props = defineProps<{
  id: number
}>()

// ===获取绑定的权限===
const isRolePermissionListLoading = ref(false)
const rolePermissionList = ref<PermissionType[]>([])

const fetchRolePermissions = async () => {
  isRolePermissionListLoading.value = true

  const res = await roleApi.getRolePermissions(props.id)
  if (res.ok) {
    rolePermissionList.value = res.data.permissions
  }

  isRolePermissionListLoading.value = false
}

watch(() => props.id, (_) => {
  fetchRolePermissions()
}, {immediate: true})

// ===移除权限====
const removePermission = async (permId: number) => {
  isRolePermissionListLoading.value = true

  const res = await roleApi.removePermission(props.id, permId)
  if (res.ok) {
    await fetchRolePermissions()
  } else {
    showError(res.error)
  }

  isRolePermissionListLoading.value = false
}

// ====绑定权限====
const querySearchPermissionsState = ref('')

const querySearchPermissionsAsync = async (queryString: string, cb: (arg: any) => void) => {
  //TODO 会显示不全
  const res = await permissionApi.getPermissions({keyword: queryString, page: 1, pageSize: 100})
  if (res.ok) {
    cb(res.data.content)
  }
}

const currentSelectPermission = ref<PermissionType | null>(null)

const handleSelect = (item: PermissionType) => {
  currentSelectPermission.value = item
}

const addPermission = async () => {
  const addPermissionData = currentSelectPermission.value

  //未选择
  if (!addPermissionData) return

  // 如果已经存在就不添加
  const exists = rolePermissionList.value.some(
      item => item.id === addPermissionData.id
  )
  if (exists) return

  const res = await roleApi.addPermission(props.id, [addPermissionData.id])

  if (res.ok) {
    ElNotification.info('添加成功')
    fetchRolePermissions()
  } else {
    showError(res.error)
  }
}
</script>
<template>
  <div>
    <div class="flex mb-3">
      <el-autocomplete
          v-model="querySearchPermissionsState"
          :fetch-suggestions="querySearchPermissionsAsync"
          class="w-80"
          clearable
          placeholder="选择权限"
          popper-class="permission-autocomplete-popper"
          value-key="name"
          @select="handleSelect"
      >
        <template #default="{ item }">
          <div class="px-1 py-2">
            <div class="flex items-center justify-between gap-3">
          <span class="truncate text-sm font-semibold text-slate-800">
            {{ item.name }}
          </span>
              <span class="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            {{ item.code }}
          </span>
            </div>
            <div v-if="item.description" class="mt-1 truncate text-xs leading-5 text-slate-400">
              {{ item.description }}
            </div>
          </div>
        </template>
      </el-autocomplete>
      <el-button class="ml-3" type="primary" @click="addPermission">绑定新权限</el-button>
    </div>
    <el-table
        v-loading="isRolePermissionListLoading"
        :data="rolePermissionList"
        border
        class="w-full"
        stripe
    >
      <el-table-column align="center" label="id" prop="id" width="60"/>
      <el-table-column label="标识符" prop="code" width="350"/>
      <el-table-column label="名字" prop="name" width="250"/>
      <el-table-column label="描述" min-width="280" prop="description"/>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default="{ row }">
          <el-button link size="small" type="danger" @click="removePermission(row.id)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
