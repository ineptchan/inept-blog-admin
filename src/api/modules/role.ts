import {request} from "@/api/request.ts"
import {client} from "@/api/client.ts"

export const roleApi = {
    getRoles: (q: PageQueryRequest) => request(() => client.GET('/role', {
        params: {
            query: {
                keyword: q.keyword,
                page: q.page - 1,
                size: q.pageSize,
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
