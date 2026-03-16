interface UserType {
    id: number
    nickname: string
    username: string
    email?: string
    status: boolean
}

interface UserRoleType {
    id: number
    nickname: string
    username: string
    email?: string
    status: boolean
    roles: RoleType[]
}

interface UserDetailType {
    id: number
    nickname: string
    username: string
    email?: string
    status: boolean
    roles: RoleType[]
    permissionCodes: string[]
}

// === 请求 ===
interface CreateUserRequest {
    nickname: string,
    username: string,
    password: string,
    email?: string | undefined,
    role?: number[] | undefined,
}

interface UpdateUserRequest {
    nickname?: string | undefined,
    username?: string | undefined,
    password?: string | undefined,
    email?: string | undefined,
    status?: boolean | undefined,
    role?: number[] | undefined,
}
