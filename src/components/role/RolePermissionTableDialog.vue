<script lang="ts" setup>
import {ref} from "vue"
import PermissionSelect from "@/components/permission/PermissionSelect.vue"
import {roleApi} from "@/api/modules/role.ts"
import {showError} from "@/util/errorUtil.ts"
import {ElNotification} from "element-plus"

// === dialog ===
const isDialogVisible = ref(false)
const roleId = ref(0)

const openDialog = (id: number) => {
  isDialogVisible.value = true
  roleId.value = id
  fetchRolePermissions()
}

defineExpose({
  openDialog
})

// ===获取绑定的权限===
const isRolePermissionListLoading = ref(false)
const rolePermissionList = ref<PermissionType[]>([])

const fetchRolePermissions = async () => {
  isRolePermissionListLoading.value = true

  const res = await roleApi.getRolePermissions(roleId.value)
  if (res.ok) {
    rolePermissionList.value = res.data.permissions
  }

  isRolePermissionListLoading.value = false
}

// ===移除权限====
const removePermission = async (permId: number) => {
  isRolePermissionListLoading.value = true

  const res = await roleApi.removePermission(roleId.value, permId)
  if (res.ok) {
    await fetchRolePermissions()
  } else {
    showError(res.error)
  }

  isRolePermissionListLoading.value = false
}

// ====绑定权限====
const currentSelectPermission = ref<number[]>([])

const addPermission = async () => {
  if (currentSelectPermission.value.length < 1) return

  const res = await roleApi.addPermission(roleId.value, currentSelectPermission.value)
  if (res.ok) {
    ElNotification.success('添加成功')
    fetchRolePermissions()
  } else {
    showError(res.error)
  }
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="绑定的权限"
      width="1260"
  >
    <div>
      <div class="flex mb-3">
        <PermissionSelect v-model="currentSelectPermission"/>
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
  </el-dialog>
</template>
