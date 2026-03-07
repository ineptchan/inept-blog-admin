import {request} from "@/api/request.ts"
import {client} from "@/api/client.ts"

export const permissionApi = {
    getPermissions: (keyword: string | undefined = undefined, page: number = 1, size: number = 20) => request(() => client.GET('/permission', {
        params: {
            query: {
                keyword: keyword,
                page: page - 1,
                size: size,
            }
        }
    }))
}
