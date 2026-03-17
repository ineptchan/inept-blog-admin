interface TagType {
    id: number
    name: string
    slug: string
}

interface CreateTagRequest {
    name: string,
    slug: string,
}

interface UpdateTagRequest {
    name?: string | undefined,
    slug?: string | undefined,
}
