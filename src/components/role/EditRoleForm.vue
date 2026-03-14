<script lang="ts" setup>
import {reactive, ref, watch} from "vue"
import {ElNotification, type FormInstance, type FormRules} from "element-plus"
import {roleApi} from "@/api/modules/role.ts"

const props = defineProps<{
  id: number
}>()
const emit = defineEmits(['success'])

const formRef = ref<FormInstance>()

const loading = ref(false)

const updateRoleRules: FormRules = {
  code: [
    {
      pattern: /^[A-Za-z]+$/,
      message: '角色标识符只能包含英文字母',
      trigger: 'blur',
    },
  ],
  name: [
    {min: 2, max: 24, message: '角色名字长度为 2~24 个字符', trigger: 'blur'},
  ],
  description: [],
}

const form = reactive({
  code: '',
  name: '',
  description: ''
})

const submit = async () => {
  if (!formRef.value) return
  await formRef.value?.validate()

  loading.value = true

  const code = form.code.trim() || undefined
  const name = form.name.trim() || undefined
  const description = form.description.trim() || undefined

  const res = await roleApi.updateRole(props.id, code, name, description)

  if (res.ok) {
    formRef.value?.resetFields()
    loading.value = false

    ElNotification.success({
      title: '更新角色成功',
      message: res.data.name
    })

    emit('success')
  }

  loading.value = false
}

const reset = () => {
  formRef.value?.resetFields()
}

const fetchRole = async () => {
  const res = await roleApi.getRoleById(props.id)
  if (res.ok) {
    form.code = res.data.code
    form.name = res.data.name
    form.description = res.data.description ? res.data.description : ''
  } else {
    // 通知id错误
  }
}

watch(() => props.id, (_) => {
  fetchRole()
}, {immediate: true})
</script>
<template>
  <el-form ref="formRef" v-loading="loading" :model="form" :rules="updateRoleRules" label-width="70px">
    <el-form-item label="标识符" prop="code">
      <el-input v-model="form.code" placeholder="输入标识符 (admin,user)"/>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input v-model="form.name" placeholder="输入名字"/>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" placeholder="描述"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
