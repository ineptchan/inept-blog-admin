import {request} from "@/api/request.ts"
import {client} from "@/api/client.ts"

export const permissionApi = {
    getPermissions: (q: PageQueryRequest) => request(() => client.GET('/admin/permission', {
        params: {
            query: {
                keyword: q.keyword,
                page: q.page - 1,
                size: q.pageSize,
            }
        }
    }))
}
