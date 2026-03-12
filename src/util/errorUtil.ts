import {ElNotification} from "element-plus"
import type {ApiError} from "@/api/request.ts"

export function showError(error: ApiError) {
    ElNotification({
        title: error.title,
        message: error.detail,
        type: 'error',
    })
}
