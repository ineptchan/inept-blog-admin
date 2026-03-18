<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {updateTagRules} from "@/util/formRules.ts"
import {tagApi} from "@/api/modules/tag.ts"
import {showError} from "@/util/errorUtil.ts"
import {toUrlSlug} from "@/util/slugUtil.ts"

// === dialog ===
const emit = defineEmits(['success'])
const isDialogVisible = ref(false)
const editId = ref(0)

const openDialog = (id: number) => {
  isDialogVisible.value = true
  editId.value = id
  fetchTag()
}

const onSuccess = () => {
  isDialogVisible.value = false
  emit('success')
}

defineExpose({
  openDialog
})

// === form ===
const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({
  name: '',
  slug: '',
})

const onSlugBlur = () => {
  form.slug = toUrlSlug(form.slug)
}

const submit = async () => {
  if (!formRef.value) return

  onSlugBlur()
  await formRef.value.validate()

  loading.value = true

  const req: UpdateTagRequest = {
    name: form.name.trim() || undefined,
    slug: form.slug || undefined,
  }

  const res = await tagApi.updateTag(editId.value, req)

  if (res.ok) {
    ElNotification.success({
      title: '更新标签成功',
      message: res.data.name
    })

    onSuccess()
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  fetchTag()
}

const fetchTag = async () => {
  loading.value = true

  const res = await tagApi.getTagById(editId.value)

  if (res.ok) {
    form.name = res.data.name
    form.slug = res.data.slug
  } else {
    showError(res.error)
  }

  loading.value = false
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="编辑标签"
      width="380"
  >
    <el-form
        ref="formRef"
        v-loading="loading"
        :model="form"
        :rules="updateTagRules"
        label-width="70px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入标签名称"/>
      </el-form-item>
      <el-form-item label="标识" prop="slug">
        <el-input
            v-model="form.slug"
            placeholder="请输入标签 URL 标识"
            @blur="onSlugBlur"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">更新</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
