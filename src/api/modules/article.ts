import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const articleApi = {
    getArticles: (q: ArticleQueryRequest) => {
        const dto = {
            keyword: q.keyword || undefined,
            page: q.page - 1,
            size: q.pageSize,
            category: q.category,
            tagIds: q.tagIds && q.tagIds.length > 0 ? q.tagIds : undefined,
            articleStatus: q.articleStatus,
        }

        // OpenAPI 将 QueryArticleDTO 生成为 query.dto，但后端通常按扁平 query 接收。
        return request(() => client.GET('/admin/articles', {
            params: {
                query: {
                    ...dto,
                } as any,
            },
        }))
    },

    createArticle: (req: CreateArticleRequest) => request(() => client.POST('/admin/articles', {
        body: {
            ...req,
        },
    })),

    updateArticle: (id: number, req: UpdateArticleRequest) => request(() => client.PATCH('/admin/articles/{id}', {
        params: {
            path: {
                id,
            },
        },
        body: {
            ...req,
        },
    })),

    getArticleById: (id: number) => request(() => client.GET('/admin/articles/{id}', {
        params: {
            path: {
                id,
            },
        },
    })),

    deleteArticle: (id: number) => request(() => client.DELETE('/admin/articles/{id}', {
        params: {
            path: {
                id,
            },
        },
    })),
}
