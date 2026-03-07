import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const userApi = {
    getUsers: (q: PageQueryRequest) => request(() => client.GET('/admin/user', {
        params: {
            query: {
                keyword: q.keyword,
                page: q.page - 1,
                size: q.pageSize,
            }
        }
    })),

    updateUserStatus: (id: number, status: boolean) => request(() => client.PATCH('/admin/user/{id}', {
        params: {
            path: {
                id: id
            }
        },
        body: {
            status: status
        }
    }))
}
