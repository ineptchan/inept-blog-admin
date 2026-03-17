import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const categoryApi = {
    getCategories: (q: PageQueryRequest) => request(() => client.GET('/admin/categories', {
        params: {
            query: {
                keyword: q.keyword,
                page: q.page - 1,
                size: q.pageSize,
            }
        }
    })),

    createCategory: (req: CreateCategoryRequest) => request(() => client.POST('/admin/categories', {
        body: {
            ...req
        }
    })),

    updateCategory: (id: number, req: UpdateCategoryRequest) => request(() => client.PATCH('/admin/categories/{id}', {
        params: {
            path: {
                id: id
            }
        },
        body: {
            ...req
        }
    })),

    getCategoryById: (id: number) => request(() => client.GET('/admin/categories/{id}', {
        params: {
            path: {
                id: id
            }
        }
    })),

    deleteCategory: (id: number) => request(() => client.DELETE('/admin/categories/{id}', {
        params: {
            path: {
                id: id
            }
        }
    }))
}
