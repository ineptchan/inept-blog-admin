export interface paths {
    "/admin/user/{id}/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 全量替换用户绑定的角色 */
        put: operations["replaceUserRoles"];
        /** 增量替换用户绑定的角色 */
        post: operations["addUserRoles"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/role/{id}/permissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取角色绑定的权限 */
        get: operations["getRoleBindPermissions"];
        /** 全量替换角色绑定的权限 */
        put: operations["replaceRolePermissions"];
        /** 增量添加角色绑定的权限 */
        post: operations["addRolePermissions"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/articles/{id}/video": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 上传文章视频 */
        put: operations["uploadVideo"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/articles/{id}/image": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 上传文章图片 */
        put: operations["uploadImage"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/articles/{id}/featured-image": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 上传文章封面图片 */
        put: operations["uploadFeaturedImage"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/articles/{id}/attachment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 上传文章附件 */
        put: operations["uploadAttachment"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/articles/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** 批量更新文章状态 */
        put: operations["updateArticleStatus"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/comment/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 创建评论 */
        post: operations["createComment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 刷新令牌 */
        post: operations["refresh"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 退出登录 */
        post: operations["logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 登录 */
        post: operations["login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取用户列表 */
        get: operations["getUsers"];
        put?: never;
        /** 创建用户 */
        post: operations["createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/tag": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取标签列表 */
        get: operations["getTags"];
        put?: never;
        /** 创建标签 */
        post: operations["createTag"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取角色列表 */
        get: operations["getRoles"];
        put?: never;
        /** 创建角色 */
        post: operations["createRole"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/role/{roleId}/permissions/{permId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 移除单个角色绑定的权限 */
        post: operations["removeRolePermission"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/comment/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取评论 */
        get: operations["getCommentById"];
        put?: never;
        /** 创建评论 */
        post: operations["createComment_1"];
        /** 删除评论 */
        delete: operations["deleteComment"];
        options?: never;
        head?: never;
        /** 更新评论 */
        patch: operations["updateComment"];
        trace?: never;
    };
    "/admin/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取分类列表 */
        get: operations["getCategories"];
        put?: never;
        /** 创建分类 */
        post: operations["createCategory"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/articles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取文章列表 */
        get: operations["getArticles"];
        put?: never;
        /** 创建文章 */
        post: operations["createArticle"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获得用户资料 */
        get: operations["getProfile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** 更新用户资料 */
        patch: operations["updateProfile"];
        trace?: never;
    };
    "/admin/user/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取用户 */
        get: operations["getUserById"];
        put?: never;
        post?: never;
        /** 删除用户 */
        delete: operations["deleteUserById"];
        options?: never;
        head?: never;
        /** 更新用户 */
        patch: operations["updateUser"];
        trace?: never;
    };
    "/admin/tag/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取标签 */
        get: operations["getTagById"];
        put?: never;
        post?: never;
        /** 删除标签 */
        delete: operations["deleteTag"];
        options?: never;
        head?: never;
        /** 更新标签 */
        patch: operations["updateTag"];
        trace?: never;
    };
    "/admin/role/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取角色 */
        get: operations["getRoleById"];
        put?: never;
        post?: never;
        /** 删除角色 */
        delete: operations["deleteRole"];
        options?: never;
        head?: never;
        /** 更新角色 */
        patch: operations["updateRole"];
        trace?: never;
    };
    "/admin/permission/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取权限 */
        get: operations["getPermissionById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** 更新权限 */
        patch: operations["updatePermission"];
        trace?: never;
    };
    "/admin/categories/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取分类 */
        get: operations["getCategoriesById"];
        put?: never;
        post?: never;
        /** 删除分类 */
        delete: operations["deleteCategory"];
        options?: never;
        head?: never;
        /** 更新分类 */
        patch: operations["updateCategory"];
        trace?: never;
    };
    "/admin/articles/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 根据id获取文章 */
        get: operations["getArticleById"];
        put?: never;
        post?: never;
        /** 删除文章 */
        delete: operations["deleteArticle"];
        options?: never;
        head?: never;
        /** 更新文章 */
        patch: operations["updateArticle"];
        trace?: never;
    };
    "/public/tag": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取标签列表 */
        get: operations["getTags_1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public/comment/{commentId}/replies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获得评论回复列表 */
        get: operations["getCommentReplies"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public/comment/{articleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取顶级评论列表 */
        get: operations["getTopComments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取分类列表 */
        get: operations["getCategories_1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public/articles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取主页文章列表 */
        get: operations["getHomeArticles"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/permission": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取权限列表 */
        get: operations["getPermissions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/comment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获取评论列表 */
        get: operations["getComments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/comment/{commentId}/replies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 获得评论回复列表 */
        get: operations["getCommentReplies_1"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/user/{userId}/roles/{roleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** 移除单个用户绑定的角色 */
        delete: operations["removeUserRole"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ReplaceUserRolesDTO: {
            /** @description 角色列表 */
            roles: number[];
        };
        RoleVO: {
            /**
             * Format: int64
             * @description 角色id
             */
            id: number;
            /** @description 角色标识符 */
            code: string;
            /** @description 角色名字 */
            name: string;
            /** @description 角色描述 */
            description?: string;
        };
        UserRolesVO: {
            /**
             * Format: int64
             * @description 用户id
             */
            id: number;
            /** @description 昵称 */
            nickname: string;
            /** @description 用户名 */
            username: string;
            /** @description 邮箱 */
            email?: string;
            /** @description 状态 */
            status: boolean;
            /** @description 角色列表 */
            roles: components["schemas"]["RoleVO"][];
        };
        ReplaceRolePermissionsDTO: {
            /** @description 角色绑定的权限列表 */
            permissions: number[];
        };
        PermissionVO: {
            /**
             * Format: int64
             * @description 权限id
             */
            id: number;
            /** @description 权限标识符 */
            code: string;
            /** @description 权限名字 */
            name: string;
            /** @description 权限描述 */
            description?: string;
        };
        RolePermissionVO: {
            /**
             * Format: int64
             * @description 角色id
             */
            id: number;
            /** @description 角色标识符 */
            code: string;
            /** @description 角色名字 */
            name: string;
            /** @description 角色描述 */
            description?: string;
            /** @description 角色绑定的权限 */
            permissions: components["schemas"]["PermissionVO"][];
        };
        UploadArticleVideoDTO: {
            /**
             * Format: binary
             * @description 文章视频
             */
            video: File;
        };
        UploadArticleImageDTO: {
            /**
             * Format: binary
             * @description 文章图片
             */
            image: File;
        };
        UploadArticleFeaturedImageDTO: {
            /**
             * Format: binary
             * @description 文章封面图片
             */
            featuredImage: File;
        };
        UploadArticleAttachmentDTO: {
            /**
             * Format: binary
             * @description 文章附件
             */
            attachment: File;
        };
        UpdateArticleStatusDTO: {
            /** @description 文章id */
            articleIds: number[];
            /**
             * @description 文章状态
             * @enum {string}
             */
            articleStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        };
        CreateCommentDTO: {
            /** @description 评论内容 */
            content: string;
            /**
             * Format: int64
             * @description 父级评论
             */
            parentCommentId?: number;
        };
        ArticleTitleVO: {
            /**
             * Format: int64
             * @description 文章id
             */
            id: number;
            /** @description 文章标题 */
            title: string;
        };
        CommentSummaryVO: {
            /**
             * Format: int64
             * @description 评论id
             */
            id: number;
            /** @description 评论内容 */
            content: string;
            /** @description 评论的用户 */
            user: components["schemas"]["UserLiteVO"];
        };
        CommentVO: {
            /**
             * Format: int64
             * @description 评论id
             */
            id: number;
            /** @description 评论内容 */
            content: string;
            /** @description 评论的文章id */
            article: components["schemas"]["ArticleTitleVO"];
            /** @description 评论的用户 */
            user: components["schemas"]["UserLiteVO"];
            /** @description 父级评论 */
            parentComment?: components["schemas"]["CommentSummaryVO"];
            /**
             * Format: date-time
             * @description 评论创建时间
             */
            createdAt: string;
        };
        UserLiteVO: {
            /**
             * Format: int64
             * @description 用户id
             */
            id: number;
            /** @description 昵称 */
            nickname: string;
        };
        RefreshVO: {
            /** @description openai.auth.access_token */
            accessToken: string;
        };
        AuthLoginDTO: {
            /** @description 用户名 */
            username: string;
            /** @description 密码 */
            password: string;
        };
        AuthLoginVO: {
            /**
             * Format: int64
             * @description 用户id
             */
            id: number;
            /** @description 用户名 */
            username: string;
            /** @description 昵称 */
            nickname: string;
            /** @description 邮箱 */
            email?: string;
            /** @description 访问令牌 */
            accessToken: string;
        };
        CreateUserDTO: {
            /** @description 昵称 */
            nickname: string;
            /** @description 用户名 */
            username: string;
            /** @description 密码 */
            password: string;
            /** @description 邮箱 */
            email?: string;
            /** @description 角色id */
            role?: number[];
        };
        UserVO: {
            /**
             * Format: int64
             * @description 用户id
             */
            id: number;
            /** @description 昵称 */
            nickname: string;
            /** @description 用户名 */
            username: string;
            /** @description 邮箱 */
            email?: string;
            /** @description 状态 */
            status: boolean;
        };
        AddUserRolesDTO: {
            /** @description 角色列表 */
            roles: number[];
        };
        CreateTagDTO: {
            /** @description 标签名字 */
            name: string;
            /** @description 标签URL标识 */
            slug: string;
        };
        TagVO: {
            /**
             * Format: int64
             * @description 标签id
             */
            id: number;
            /** @description 标签名字 */
            name: string;
            /** @description 标签URL标识 */
            slug: string;
        };
        CreateRoleDTO: {
            /** @description 角色标识符 */
            code: string;
            /** @description 角色名字 */
            name: string;
            /** @description 角色描述 */
            description?: string;
        };
        AddRolePermissionsDTO: {
            /** @description 角色绑定的权限列表 */
            permissions: number[];
        };
        CreateCategoriesDTO: {
            /** @description 分类名字 */
            name: string;
            /** @description 分类URL标识 */
            slug: string;
        };
        CategoriesVO: {
            /**
             * Format: int64
             * @description 分类id
             */
            id: number;
            /** @description 分类名字 */
            name: string;
            /** @description 分类URL标识 */
            slug: string;
        };
        CreateArticleDTO: {
            /** @description 文章标题 */
            title: string;
            /** @description 文章URL标识 */
            slug: string;
            /** @description 文章内容 */
            content: string;
            /**
             * Format: int64
             * @description 文章分类
             */
            categoryId: number;
            /** @description 文章标签 */
            tagIds: number[];
        };
        ArticleVO: {
            /**
             * Format: int64
             * @description 文章id
             */
            id: number;
            /** @description 文章标题 */
            title: string;
            /** @description 文章URL标识 */
            slug: string;
            /** @description 文章封面图片 */
            featuredImage?: string;
            /** @description 文章内容 */
            content: string;
            /** @description 文章作者 */
            author: components["schemas"]["UserLiteVO"];
            /** @description 文章分类 */
            category: components["schemas"]["CategoriesVO"];
            /** @description 文章标签 */
            tags: components["schemas"]["TagVO"][];
            /**
             * @description 文章状态
             * @enum {string}
             */
            articleStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
            /**
             * Format: date-time
             * @description 创建时间
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description 更新时间
             */
            updatedAt?: string;
        };
        UpdateUserProfileDTO: {
            /** @description 昵称 */
            nickname?: string;
            /** @description 密码 */
            password?: string;
            /**
             * Format: binary
             * @description 头像
             */
            avatar?: File;
        };
        UpdateUserDTO: {
            /** @description 昵称 */
            nickname?: string;
            /** @description 用户名 */
            username?: string;
            /** @description 密码 */
            password?: string;
            /** @description 邮箱 */
            email?: string;
            /** @description 角色 */
            role?: number[];
            /** @description 状态 */
            status?: boolean;
        };
        UpdateTagDTO: {
            /** @description 标签名字 */
            name?: string;
            /** @description 标签URL标识 */
            slug?: string;
        };
        UpdateRoleDTO: {
            /** @description 角色标识符 */
            code?: string;
            /** @description 角色名字 */
            name?: string;
            /** @description 角色描述 */
            description?: string;
        };
        UpdatePermissionDTO: {
            /** @description 权限名字 */
            name?: string;
            /** @description 权限描述 */
            description?: string;
        };
        UpdateCommentDTO: {
            /** @description 评论内容 */
            content?: string;
        };
        UpdateCategoriesDTO: {
            /** @description 分类名字 */
            name?: string;
            /** @description 分类URL标识 */
            slug?: string;
        };
        UpdateArticleDTO: {
            /** @description 文章标题 */
            title?: string;
            /** @description 文章URL标识 */
            slug?: string;
            /** @description 文章内容 */
            content?: string;
            /**
             * Format: int64
             * @description 文章分类
             */
            categoryId?: number;
            /** @description 文章标签 */
            tagIds?: number[];
            /**
             * @description 文章状态
             * @enum {string}
             */
            articleStatus?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        };
        UserDetailVO: {
            /**
             * Format: int64
             * @description 用户id
             */
            id: number;
            /** @description 昵称 */
            nickname: string;
            /** @description 头像 */
            avatar: string;
            /** @description 用户名 */
            username: string;
            /** @description 邮箱 */
            email?: string;
            /** @description 状态 */
            status: boolean;
            /** @description 角色列表 */
            roles: components["schemas"]["RoleVO"][];
            /** @description openapi.permission.permission */
            permissionCodes: string[];
        };
        PageResponseTagVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["TagVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        BaseQueryDTO: {
            /**
             * Format: int32
             * @description 页数
             */
            page: number;
            /**
             * Format: int32
             * @description 大小
             */
            size: number;
        };
        CommentReplyVO: {
            /**
             * Format: int64
             * @description 评论id
             */
            id: number;
            /** @description 评论内容 */
            content: string;
            /** @description 评论的用户 */
            user: components["schemas"]["UserLiteVO"];
            /**
             * Format: date-time
             * @description 评论创建时间
             */
            createdAt: string;
        };
        PageResponseCommentReplyVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["CommentReplyVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        PageResponseTopCommentVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["TopCommentVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        TopCommentVO: {
            /**
             * Format: int64
             * @description 评论id
             */
            id: number;
            /** @description 评论内容 */
            content: string;
            /** @description 评论的用户 */
            user: components["schemas"]["UserLiteVO"];
            /**
             * Format: date-time
             * @description 评论创建时间
             */
            createdAt: string;
        };
        PageResponseCategoriesVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["CategoriesVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        HomeArticleVO: {
            /**
             * Format: int64
             * @description 文章id
             */
            id: number;
            /** @description 文章标题 */
            title: string;
            /** @description 文章URL标识 */
            slug: string;
            /** @description 文章封面图片 */
            featuredImage?: string;
            /** @description 主页文章内容 */
            homeContent: string;
            /** @description 文章作者 */
            author: components["schemas"]["UserLiteVO"];
            /** @description 文章分类 */
            category: components["schemas"]["CategoriesVO"];
            /** @description 文章标签 */
            tags: components["schemas"]["TagVO"][];
            /**
             * @description 文章状态
             * @enum {string}
             */
            articleStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        };
        PageResponseHomeArticleVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["HomeArticleVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        PageResponseUserRolesVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["UserRolesVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        PageResponseRoleVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["RoleVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        PageResponsePermissionVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["PermissionVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
        PageResponseCommentVO: {
            /** @description 当前页数据列表 */
            content: components["schemas"]["CommentVO"][];
            /**
             * Format: int32
             * @description 当前页号
             */
            page: number;
            /**
             * Format: int32
             * @description 每页大小
             */
            size: number;
            /**
             * Format: int64
             * @description 总条数
             */
            totalElements: number;
            /**
             * Format: int32
             * @description 总页数
             */
            totalPages: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    replaceUserRoles: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReplaceUserRolesDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserRolesVO"];
                };
            };
        };
    };
    addUserRoles: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddUserRolesDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserRolesVO"];
                };
            };
        };
    };
    getRoleBindPermissions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RolePermissionVO"];
                };
            };
        };
    };
    replaceRolePermissions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReplaceRolePermissionsDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RolePermissionVO"];
                };
            };
        };
    };
    addRolePermissions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddRolePermissionsDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RolePermissionVO"];
                };
            };
        };
    };
    uploadVideo: {
        parameters: {
            query: {
                dto: components["schemas"]["UploadArticleVideoDTO"];
            };
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    uploadImage: {
        parameters: {
            query: {
                dto: components["schemas"]["UploadArticleImageDTO"];
            };
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    uploadFeaturedImage: {
        parameters: {
            query: {
                dto: components["schemas"]["UploadArticleFeaturedImageDTO"];
            };
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    uploadAttachment: {
        parameters: {
            query: {
                dto: components["schemas"]["UploadArticleAttachmentDTO"];
            };
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    updateArticleStatus: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateArticleStatusDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": boolean;
                };
            };
        };
    };
    createComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 评论的文章id */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCommentDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CommentVO"];
                };
            };
        };
    };
    refresh: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RefreshVO"];
                };
            };
        };
    };
    logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AuthLoginDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["AuthLoginVO"];
                };
            };
        };
    };
    getUsers: {
        parameters: {
            query?: {
                /** @description 用户关键词(昵称,用户名,邮箱) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseUserRolesVO"];
                };
            };
        };
    };
    createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserVO"];
                };
            };
        };
    };
    getTags: {
        parameters: {
            query?: {
                /** @description 标签关键词(标签名字,标签URL标识) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseTagVO"];
                };
            };
        };
    };
    createTag: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTagDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["TagVO"];
                };
            };
        };
    };
    getRoles: {
        parameters: {
            query?: {
                /** @description 角色关键词(角色标识符 ,角色名字,角色描述) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseRoleVO"];
                };
            };
        };
    };
    createRole: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateRoleDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RoleVO"];
                };
            };
        };
    };
    removeRolePermission: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                roleId: number;
                permId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RolePermissionVO"];
                };
            };
        };
    };
    getCommentById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CommentVO"];
                };
            };
        };
    };
    createComment_1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 评论的文章id */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCommentDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CommentVO"];
                };
            };
        };
    };
    deleteComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": boolean;
                };
            };
        };
    };
    updateComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCommentDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CommentSummaryVO"];
                };
            };
        };
    };
    getCategories: {
        parameters: {
            query?: {
                /** @description 分类关键词(分类名字,分类URL标识) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseCategoriesVO"];
                };
            };
        };
    };
    createCategory: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCategoriesDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CategoriesVO"];
                };
            };
        };
    };
    getArticles: {
        parameters: {
            query?: {
                /** @description 文章分类 */
                category?: number;
                /** @description 文章关键词(文章标题,文章URL标识,文章内容) */
                keyword?: string;
                /** @description 文章标签 */
                tagIds?: number[];
                /** @description 文章状态 */
                articleStatus?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseHomeArticleVO"];
                };
            };
        };
    };
    createArticle: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateArticleDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["ArticleVO"];
                };
            };
        };
    };
    getProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserDetailVO"];
                };
            };
        };
    };
    updateProfile: {
        parameters: {
            query: {
                dto: components["schemas"]["UpdateUserProfileDTO"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserVO"];
                };
            };
        };
    };
    getUserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserDetailVO"];
                };
            };
        };
    };
    deleteUserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": boolean;
                };
            };
        };
    };
    updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserVO"];
                };
            };
        };
    };
    getTagById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["TagVO"];
                };
            };
        };
    };
    deleteTag: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": boolean;
                };
            };
        };
    };
    updateTag: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTagDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["TagVO"];
                };
            };
        };
    };
    getRoleById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RoleVO"];
                };
            };
        };
    };
    deleteRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateRoleDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["RoleVO"];
                };
            };
        };
    };
    getPermissionById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PermissionVO"];
                };
            };
        };
    };
    updatePermission: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdatePermissionDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PermissionVO"];
                };
            };
        };
    };
    getCategoriesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CategoriesVO"];
                };
            };
        };
    };
    deleteCategory: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": boolean;
                };
            };
        };
    };
    updateCategory: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateCategoriesDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["CategoriesVO"];
                };
            };
        };
    };
    getArticleById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["ArticleVO"];
                };
            };
        };
    };
    deleteArticle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": boolean;
                };
            };
        };
    };
    updateArticle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateArticleDTO"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["ArticleVO"];
                };
            };
        };
    };
    getTags_1: {
        parameters: {
            query?: {
                /** @description 标签关键词(标签名字,标签URL标识) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseTagVO"];
                };
            };
        };
    };
    getCommentReplies: {
        parameters: {
            query: {
                dto: components["schemas"]["BaseQueryDTO"];
            };
            header?: never;
            path: {
                commentId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseCommentReplyVO"];
                };
            };
        };
    };
    getTopComments: {
        parameters: {
            query?: {
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path: {
                articleId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseTopCommentVO"];
                };
            };
        };
    };
    getCategories_1: {
        parameters: {
            query?: {
                /** @description 分类关键词(分类名字,分类URL标识) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseCategoriesVO"];
                };
            };
        };
    };
    getHomeArticles: {
        parameters: {
            query?: {
                /** @description 文章分类 */
                category?: number;
                /** @description 文章关键词(文章标题,文章URL标识,文章内容) */
                keyword?: string;
                /** @description 文章标签 */
                tagIds?: number[];
                /** @description 文章状态 */
                articleStatus?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseHomeArticleVO"];
                };
            };
        };
    };
    getPermissions: {
        parameters: {
            query?: {
                /** @description 权限关键词(权限标识符,权限名字,权限描述) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponsePermissionVO"];
                };
            };
        };
    };
    getComments: {
        parameters: {
            query?: {
                /** @description 评论关键词(评论内容) */
                keyword?: string;
                /** @description 页数 */
                page?: number;
                /** @description 大小 */
                size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseCommentVO"];
                };
            };
        };
    };
    getCommentReplies_1: {
        parameters: {
            query: {
                dto: components["schemas"]["BaseQueryDTO"];
            };
            header?: never;
            path: {
                commentId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["PageResponseCommentReplyVO"];
                };
            };
        };
    };
    removeUserRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: number;
                roleId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UserRolesVO"];
                };
            };
        };
    };
}
