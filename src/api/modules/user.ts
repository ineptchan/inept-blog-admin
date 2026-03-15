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

    //TODO 考虑删除
    updateUserStatus: (id: number, status: boolean) => request(() => client.PATCH('/admin/user/{id}', {
        params: {
            path: {
                id: id
            }
        },
        body: {
            status: status
        }
    })),

    createUser: (req: CreateUserRequest) => request(() => client.POST('/admin/user', {
        body: {
            ...req
        }
    })),

    updateUser: (id: number, req: UpdateUserRequest) => request(() => client.PATCH('/admin/user/{id}', {
        params: {
            path: {
                id: id
            }
        },
        body: {
            ...req
        }
    })),

    getUserById: (id: number) => request(() => client.GET('/admin/user/{id}', {
        params: {
            path: {
                id: id
            }
        }
    })),

    deleteUser: (id: number) => request(() => client.DELETE('/admin/user/{id}', {
        params: {
            path: {
                id: id
            }
        }
    }))
}
