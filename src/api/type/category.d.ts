interface CategoryType {
    id: number
    name: string
    slug: string
}

interface CreateCategoryRequest {
    name: string,
    slug: string,
}

interface UpdateCategoryRequest {
    name?: string | undefined,
    slug?: string | undefined,
}
