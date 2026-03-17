import {ElMessage} from "element-plus"
import {articleApi} from "@/api/modules/article.ts"
import {showError} from "@/util/errorUtil.ts"

type ArticleImageKind = "content" | "featured"

const validateImageFile = (file: File) => {
  if (!file.type.startsWith("image/")) {
    ElMessage.warning("Only image files are supported")
    throw new Error("Invalid image file")
  }
}

const normalizeUploadedUrl = (value: string) => {
  const url = value.trim()
  if (!url) {
    ElMessage.error("Upload failed: server returned empty image URL")
    throw new Error("Empty uploaded image url")
  }

  return url
}

const validateVideoFile = (file: File) => {
  if (!file.type.startsWith("video/")) {
    ElMessage.warning("Only video files are supported")
    throw new Error("Invalid video file")
  }
}

const uploadArticleImageByKind = async (articleId: number, file: File, kind: ArticleImageKind): Promise<string> => {
  validateImageFile(file)

  const res = kind === "featured"
    ? await articleApi.uploadFeaturedImage(articleId, file)
    : await articleApi.uploadImage(articleId, file)

  if (!res.ok) {
    showError(res.error)
    throw new Error("Upload image failed")
  }

  return normalizeUploadedUrl(res.data)
}

export const uploadArticleContentImage = (articleId: number, file: File) => {
  return uploadArticleImageByKind(articleId, file, "content")
}

export const uploadArticleFeaturedImage = (articleId: number, file: File) => {
  return uploadArticleImageByKind(articleId, file, "featured")
}

export const uploadArticleVideo = async (articleId: number, file: File): Promise<string> => {
  validateVideoFile(file)

  const res = await articleApi.uploadVideo(articleId, file)
  if (!res.ok) {
    showError(res.error)
    throw new Error("Upload video failed")
  }

  return normalizeUploadedUrl(res.data)
}

export const uploadArticleAttachment = async (articleId: number, file: File): Promise<string> => {
  const res = await articleApi.uploadAttachment(articleId, file)
  if (!res.ok) {
    showError(res.error)
    throw new Error("Upload attachment failed")
  }

  return normalizeUploadedUrl(res.data)
}
