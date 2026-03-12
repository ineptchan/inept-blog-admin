import {request} from "@/api/request.ts"
import {client} from "@/api/client.ts"

export const roleApi = {
    getRoles: (q: PageQueryRequest) => request(() => client.GET('/admin/role', {
        params: {
            query: {
                keyword: q.keyword,
                page: q.page - 1,
                size: q.pageSize,
            }
        }
    })),

    getRolePermissions: (roleId: number) => request(() => client.GET('/admin/role/{id}/permissions', {
        params: {
            path: {
                id: roleId
            }
        }
    })),

    createRole: (code: string, name: string, description?: string) => request(() => client.POST('/admin/role', {
        body: {
            code: code,
            name: name,
            description: description
        }
    })),

    updateRole: (id: number, code?: string, name?: string, description?: string) => request(() => client.PATCH('/admin/role/{id}', {
        params: {
            path: {
                id: id,
            }
        },
        body: {
            ...(code !== undefined ? {code} : {}),
            ...(name !== undefined ? {name} : {}),
            ...(description !== undefined ? {description} : {}),
        }
    })),

    getRoleById: (id: number) => request(() => client.GET('/admin/role/{id}', {
        params: {
            path: {
                id: id
            }
        }
    })),

    removePermission: (roleId: number, permId: number) => request(() => client.POST('/admin/role/{roleId}/permissions/{permId}', {
        params: {
            path: {
                roleId: roleId,
                permId: permId
            }
        }
    })),

    addPermission: (roleId: number, permIds: number[]) => request(() => client.POST('/admin/role/{id}/permissions', {
        params: {
            path: {
                id: roleId,
            }
        },
        body: {
            permissions: permIds
        }
    }))
}
