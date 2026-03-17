type ArticleStatusType = "DRAFT" | "PUBLISHED" | "ARCHIVED"

interface HomeArticleType {
    id: number
    title: string
    slug: string
    featuredImage?: string
    homeContent: string
    author: {
        id: number
        nickname: string
    }
    category: CategoryType
    tags: TagType[]
    articleStatus: ArticleStatusType
}

interface ArticleType {
    id: number
    title: string
    slug: string
    featuredImage?: string
    content: string
    author: {
        id: number
        nickname: string
    }
    category: CategoryType
    tags: TagType[]
    articleStatus: ArticleStatusType
    createdAt: string
    updatedAt?: string
}

interface ArticleQueryRequest {
    keyword: string
    page: number
    pageSize: number
    category?: number
    tagIds?: number[]
    articleStatus?: ArticleStatusType
}

interface CreateArticleRequest {
    title: string
    slug: string
    content: string
    categoryId: number
    tagIds: number[]
}

interface UpdateArticleRequest {
    title?: string | undefined
    slug?: string | undefined
    content?: string | undefined
    categoryId?: number | undefined
    tagIds?: number[] | undefined
    articleStatus?: ArticleStatusType | undefined
}
