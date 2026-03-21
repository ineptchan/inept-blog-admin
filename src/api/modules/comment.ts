import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

export const commentApi = {
    getComments: (q: CommentQueryRequest) => request(() => client.GET('/admin/comment', {
        params: {
            query: {
                keyword: q.keyword || undefined,
                status: q.status,
                page: q.page - 1,
                size: q.pageSize,
            }
        }
    })),

    getCommentReplies: (commentId: number, q: CommentReplyQueryRequest) => request(() => client.GET('/admin/comment/{commentId}/replies', {
        params: {
            path: {
                commentId: commentId
            },
            // Work around OpenAPI query.dto generation issue by sending flattened query params.
            query: {
                page: q.page - 1,
                size: q.pageSize,
            } as any
        }
    })),

    createComment: (req: CreateCommentRequest) => {
        const {articleId, ...body} = req
        return request(() => client.POST('/admin/comment/{id}', {
            params: {
                path: {
                    id: articleId
                }
            },
            body: {
                ...body
            }
        }))
    },

    updateComment: (id: number, req: UpdateCommentRequest) => request(() => client.PATCH('/admin/comment/{id}', {
        params: {
            path: {
                id: id
            }
        },
        body: {
            ...req
        }
    })),

    getCommentById: (id: number) => request(() => client.GET('/admin/comment/{id}', {
        params: {
            path: {
                id: id
            }
        }
    })),

    deleteComment: (id: number) => request(() => client.DELETE('/admin/comment/{id}', {
        params: {
            path: {
                id: id
            }
        }
    }))
}
