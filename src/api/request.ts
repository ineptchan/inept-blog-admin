import {client} from "./client";

// -------- 通用错误结构 --------
export interface ApiError {
    detail: string;
    instance: string;
    status: number;
    title: string;
    timestamp: string;
    errorCode?: string;
    errors?: { field: string, code: string, message: string }[]; // 422 字段校验错误
}

// -------- 封装结果类型 --------
export type ApiResult<T> =
    | { ok: true; data: T; response: Response }
    | { ok: false; error: ApiError; response: Response };

// -------- 核心包装函数 --------
// @ts-ignore
type ClientMethod =
    typeof client.GET
    | typeof client.POST
    | typeof client.PUT
    | typeof client.DELETE
    | typeof client.PATCH;

export async function request<T>(
    fn: () => Promise<{ data?: T; error?: unknown; response: Response }>
): Promise<ApiResult<T>> {
    const {data, error, response} = await fn();

    if (error) {
        // 统一处理 error 字段（422 包在 error.error 里，400 直接就是 error）
        const normalized = (error as any)?.error ?? error;
        return {
            ok: false,
            error: normalized as ApiError,
            response,
        };
    }

    return {
        ok: true,
        data: data as T,
        response,
    };
}

// -------- 导出快捷方法 --------
export const api = {
    get: <T>(
        ...args: Parameters<typeof client.GET>
    ) =>
        // @ts-ignore
        request<T>(() => (client.GET as any)(...args)),

    post: <T>(
        ...args: Parameters<typeof client.POST>
    ) =>
        // @ts-ignore
        request<T>(() => (client.POST as any)(...args)),

    put: <T>(
        ...args: Parameters<typeof client.PUT>
    ) =>
        // @ts-ignore
        request<T>(() => (client.PUT as any)(...args)),

    patch: <T>(
        ...args: Parameters<typeof client.PATCH>
    ) =>
        // @ts-ignore
        request<T>(() => (client.PATCH as any)(...args)),

    del: <T>(
        ...args: Parameters<typeof client.DELETE>
    ) =>
        // @ts-ignore
        request<T>(() => (client.DELETE as any)(...args)),
};
