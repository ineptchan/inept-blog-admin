import {request} from "@/api/request.ts"
import {client} from "@/api/client.ts"

export const roleApi = {
    getRoles: (keyword: string | undefined = undefined, page: number = 1, size: number = 20) => request(() => client.GET('/role', {
        params: {
            query: {
                keyword: keyword,
                page: page - 1,
                size: size,
            }
        }
    })),

    getRolePermissions: (roleId: number) => request(() => client.GET('/role/{id}/permissions', {
        params: {
            path: {
                id: roleId
            }
        }
    }))
}
