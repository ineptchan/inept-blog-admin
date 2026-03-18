<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance} from "element-plus"
import {updateCategoriesRules} from "@/util/formRules.ts"
import {categoryApi} from "@/api/modules/category.ts"
import {showError} from "@/util/errorUtil.ts"
import {toUrlSlug} from "@/util/slugUtil.ts"

// === dialog ===
const emit = defineEmits(['success'])
const isDialogVisible = ref(false)
const editId = ref(0)

const openDialog = (id: number) => {
  isDialogVisible.value = true
  editId.value = id
  fetchCategory()
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

  const req: UpdateCategoryRequest = {
    name: form.name.trim() || undefined,
    slug: form.slug || undefined,
  }

  const res = await categoryApi.updateCategory(editId.value, req)

  if (res.ok) {
    ElNotification.success({
      title: '更新分类成功',
      message: res.data.name
    })

    onSuccess()
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  fetchCategory()
}

const fetchCategory = async () => {
  loading.value = true

  const res = await categoryApi.getCategoryById(editId.value)

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
      title="编辑分类"
      width="380"
  >
    <el-form
        ref="formRef"
        v-loading="loading"
        :model="form"
        :rules="updateCategoriesRules"
        label-width="70px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名称"/>
      </el-form-item>
      <el-form-item label="标识" prop="slug">
        <el-input
            v-model="form.slug"
            placeholder="请输入分类 URL 标识"
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
