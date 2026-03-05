import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"


export const authApi = {
    login: (body: { username: string; password: string }) =>
        request(() => client.POST('/auth/login', {body, credentials: "include"})),

    // @ts-ignore
    logout: () => request(() => client.POST('/auth/logout')),

    // @ts-ignore
    refresh: () => request(() => client.POST('/auth/refresh')),
}
