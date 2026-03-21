type CommentStatusType = "PENDING" | "PUBLISHED" | "DELETED" | "SPAM"

interface CommentUserLiteType {
    id: number
    nickname: string
}

interface CommentArticleLiteType {
    id: number
    title: string
}

interface CommentSummaryType {
    id: number
    content: string
    likeCount: number
    user: CommentUserLiteType
}

interface CommentType {
    id: number
    content: string
    status: CommentStatusType
    likeCount: number
    article: CommentArticleLiteType
    user: CommentUserLiteType
    parentComment?: CommentSummaryType
    createdAt: string
}

interface CommentReplyType {
    id: number
    content: string
    likeCount: number
    user: CommentUserLiteType
    createdAt: string
}

interface CommentQueryRequest extends PageQueryRequest {
    status?: CommentStatusType
}

interface CommentReplyQueryRequest {
    page: number
    pageSize: number
}

interface CreateCommentRequest {
    articleId: number
    content: string
    parentCommentId?: number
}

interface UpdateCommentRequest {
    content?: string | undefined
    status?: CommentStatusType | undefined
}
