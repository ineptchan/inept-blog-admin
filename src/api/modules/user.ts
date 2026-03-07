import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const userApi = {
    getUsers: (keyword: string | undefined = undefined, page: number = 1, size: number = 20) => request(() => client.GET('/admin/user', {
                params: {
                    query: {
                        keyword: keyword,
                        page: page - 1,
                        size: size,
                    }
                }
            }
        )
    ),

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
