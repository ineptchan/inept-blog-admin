import {client} from "@/api/client.ts"
import {request} from "@/api/request.ts"

const uploadArticleFile = (
  id: number,
  endpoint: "/admin/articles/{id}/image" | "/admin/articles/{id}/featured-image" | "/admin/articles/{id}/video" | "/admin/articles/{id}/attachment",
  fieldName: "image" | "featuredImage" | "video" | "attachment",
  file: File,
) => {
  const formData = new FormData()
  formData.append(fieldName, file)

  return request<string>(() => (client.PUT as any)(endpoint, {
    params: {
      path: {
        id,
      },
    },
    body: formData,
    parseAs: "text",
  }))
}

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

    // Work around OpenAPI query.dto generation issue by sending flattened query params.
    return request(() => client.GET("/admin/articles", {
      params: {
        query: {
          ...dto,
        } as any,
      },
    }))
  },

  createArticle: (req: CreateArticleRequest) => request(() => client.POST("/admin/articles", {
    body: {
      ...req,
    },
  })),

  updateArticle: (id: number, req: UpdateArticleRequest) => request(() => client.PATCH("/admin/articles/{id}", {
    params: {
      path: {
        id,
      },
    },
    body: {
      ...req,
    },
  })),

  getArticleById: (id: number) => request(() => client.GET("/admin/articles/{id}", {
    params: {
      path: {
        id,
      },
    },
  })),

  deleteArticle: (id: number) => request(() => client.DELETE("/admin/articles/{id}", {
    params: {
      path: {
        id,
      },
    },
  })),

  uploadImage: (id: number, file: File) => uploadArticleFile(
    id,
    "/admin/articles/{id}/image",
    "image",
    file,
  ),

  uploadFeaturedImage: (id: number, file: File) => uploadArticleFile(
    id,
    "/admin/articles/{id}/featured-image",
    "featuredImage",
    file,
  ),

  uploadVideo: (id: number, file: File) => uploadArticleFile(
    id,
    "/admin/articles/{id}/video",
    "video",
    file,
  ),

  uploadAttachment: (id: number, file: File) => uploadArticleFile(
    id,
    "/admin/articles/{id}/attachment",
    "attachment",
    file,
  ),
}
