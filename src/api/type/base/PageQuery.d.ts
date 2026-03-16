interface PageQueryRequest {
    keyword: string
    page: number
    pageSize: number
}

interface PageQueryResponse<T> {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}
