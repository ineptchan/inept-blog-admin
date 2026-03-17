import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const tagApi = {
    getTags: (q: PageQueryRequest) => request(() => client.GET('/admin/tag', {
        params: {
            query: {
                keyword: q.keyword,
                page: q.page - 1,
                size: q.pageSize,
            }
        }
    })),

    createTag: (req: CreateTagRequest) => request(() => client.POST('/admin/tag', {
        body: {
            ...req
        }
    })),

    updateTag: (id: number, req: UpdateTagRequest) => request(() => client.PATCH('/admin/tag/{id}', {
        params: {
            path: {
                id: id
            }
        },
        body: {
            ...req
        }
    })),

    getTagById: (id: number) => request(() => client.GET('/admin/tag/{id}', {
        params: {
            path: {
                id: id
            }
        }
    })),

    deleteTag: (id: number) => request(() => client.DELETE('/admin/tag/{id}', {
        params: {
            path: {
                id: id
            }
        }
    }))
}
