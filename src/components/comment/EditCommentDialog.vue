<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElNotification, type FormInstance, type FormRules} from "element-plus"
import {commentApi} from "@/api/modules/comment.ts"
import {showError} from "@/util/errorUtil.ts"
import {updateCommentRules} from "@/util/formRules.ts"

const emit = defineEmits(["success"])
const isDialogVisible = ref(false)
const editId = ref(0)

const openDialog = (id: number) => {
  isDialogVisible.value = true
  editId.value = id
  fetchComment()
}

const onSuccess = () => {
  isDialogVisible.value = false
  emit("success")
}

defineExpose({
  openDialog,
})

const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({
  content: "",
  status: "PENDING" as CommentStatusType,
})

const statusOptions: { label: string, value: CommentStatusType }[] = [
  {label: "待审核", value: "PENDING"},
  {label: "已发布", value: "PUBLISHED"},
  {label: "已删除", value: "DELETED"},
  {label: "垃圾评论", value: "SPAM"},
]

const rules: FormRules = {
  ...updateCommentRules,
  status: [
    {
      validator: (_rule, value, callback) => {
        if (value !== "PENDING" && value !== "PUBLISHED" && value !== "DELETED" && value !== "SPAM") {
          callback(new Error("评论状态不合法"))
          return
        }
        callback()
      },
      trigger: "change",
    },
  ],
}

const submit = async () => {
  if (!formRef.value) return

  form.content = form.content.trim()
  await formRef.value.validate()
  loading.value = true

  const req: UpdateCommentRequest = {
    content: form.content || undefined,
    status: form.status,
  }

  const res = await commentApi.updateComment(editId.value, req)

  if (res.ok) {
    ElNotification.success({
      title: "更新评论成功",
      message: `评论 ID: ${res.data.id}`,
    })

    onSuccess()
  } else {
    showError(res.error)
  }

  loading.value = false
}

const reset = () => {
  fetchComment()
}

const fetchComment = async () => {
  loading.value = true

  const res = await commentApi.getCommentById(editId.value)

  if (res.ok) {
    form.content = res.data.content
    form.status = res.data.status
  } else {
    showError(res.error)
  }

  loading.value = false
}
</script>
<template>
  <el-dialog
      v-model="isDialogVisible"
      title="编辑评论"
      width="560"
  >
    <el-form
        ref="formRef"
        v-loading="loading"
        :model="form"
        :rules="rules"
        label-width="90px"
    >
      <el-form-item label="评论内容" prop="content">
        <el-input
            v-model="form.content"
            :rows="4"
            placeholder="请输入评论内容"
            type="textarea"
        />
      </el-form-item>
      <el-form-item label="评论状态" prop="status">
        <el-select v-model="form.status" class="w-full">
          <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">更新</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
