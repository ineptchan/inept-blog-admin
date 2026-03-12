import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "./schema";
import {useUserStore} from "@/stores/userStore.ts"
import router from "@/router";
import {authApi} from "@/api/modules/auth.ts"

export const client = createClient<paths>({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
});

// 认证头：每次请求都读取最新 token（避免状态不同步）
const authMiddleware: Middleware = {
    async onRequest({request}) {
        let token =  useUserStore().accessToken;
        if (token) request.headers.set("Authorization", `Bearer ${token}`);

        //TODO 等后端接口可返回过期时间，添加个过期时间检查，过期了刷新token

        return request;
    },
};

const unauthorizedMiddleware: Middleware = {
    async onResponse({response}) {
        if (response.status === 401) {
            const data: {
                detail: string,
                errorCode: string,
                status: number,
                timestamp: string,
                title: string,
            } = await response.clone().json();

            const userStore = useUserStore()

            //令牌缺少，尝试刷新令牌
            if (data.errorCode === "message.auth.token_missing") {
                const res = await authApi.refresh()
                if (res.ok) {
                    console.log('刷新令牌')
                    userStore.saveAccessToken(res.data.accessToken)
                    return undefined;
                }
            }

            //令牌过期，尝试刷新令牌
            if (data.errorCode === "message.auth.token_expired") {
                const res = await authApi.refresh()
                if (res.ok) {
                    console.log('刷新令牌')
                    userStore.saveAccessToken(res.data.accessToken)
                    return undefined;
                }
            }

            userStore.saveAccessToken(null)
            router.push('/login')
        }

        return undefined;
    },
};

client.use(authMiddleware)
client.use(unauthorizedMiddleware)
