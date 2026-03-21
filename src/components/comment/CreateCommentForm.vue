<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance, type FormRules} from "element-plus"
import {commentApi} from "@/api/modules/comment.ts"
import {showError} from "@/util/errorUtil.ts"
import {createCommentRules} from "@/util/formRules.ts"

const emit = defineEmits(['success'])

const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  articleId: 0,
  content: '',
  parentCommentId: undefined as number | undefined,
})

const rules: FormRules = {
  ...createCommentRules,
  articleId: [
    {
      validator: (_rule, value, callback) => {
        if (!Number.isInteger(value) || value <= 0) {
          callback(new Error('请输入有效的文章 ID'))
          return
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
}

const submit = async () => {
  if (!formRef.value) return

  form.content = form.content.trim()
  await formRef.value.validate()
  loading.value = true

  const req: CreateCommentRequest = {
    articleId: form.articleId,
    content: form.content,
    parentCommentId: form.parentCommentId || undefined,
  }

  const res = await commentApi.createComment(req)
  if (res.ok) {
    formRef.value.resetFields()
    form.articleId = 0
    form.parentCommentId = undefined

    ElNotification.success({
      title: '创建评论成功',
      message: `评论 ID: ${res.data.id}`,
    })

    emit('success', res.data)
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  formRef.value?.resetFields()
  form.articleId = 0
  form.parentCommentId = undefined
}
</script>
<template>
  <el-form
      ref="formRef"
      v-loading="loading"
      :model="form"
      :rules="rules"
      label-width="100px"
  >
    <el-form-item label="文章 ID" prop="articleId">
      <el-input-number v-model="form.articleId" :min="1" class="w-full"/>
    </el-form-item>
    <el-form-item label="评论内容" prop="content">
      <el-input
          v-model="form.content"
          :rows="4"
          placeholder="请输入评论内容"
          type="textarea"
      />
    </el-form-item>
    <el-form-item label="父评论 ID" prop="parentCommentId">
      <el-input-number v-model="form.parentCommentId" :min="1" class="w-full"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">创建</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
