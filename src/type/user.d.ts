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
