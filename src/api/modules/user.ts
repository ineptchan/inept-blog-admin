import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const userApi = {
    getUsers: (keyword: string | undefined = undefined, page: number = 1, size: number = 20) => request(() => client.GET('/admin/user', {
                params: {
                    query: {
                        keyword: keyword,
                        page: page,
                        size: size,
                    }
                }
            }
        )
    )
}
