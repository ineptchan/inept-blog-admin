import {defineStore} from "pinia"
import {ref} from "vue"

export const useUserStore = defineStore('userStore', () => {
    const accessToken = ref<string | null>(null)
    const profile = ref<UserDetailType | null>(null)

    const saveAccessToken = (v: string | null) => {
        accessToken.value = v;
    }

    const saveProfile = (v: UserDetailType) => {
        profile.value = v
    }

    const saveUser = (v: {
        id: number
        nickname: string
        username: string
        email?: string
        status?: boolean
        roles?: RoleType[]
        permissionCodes?: string[]
    }) => {
        profile.value = {
            id: v.id,
            nickname: v.nickname,
            username: v.username,
            email: v.email,
            status: v.status ?? true,
            roles: v.roles ?? [],
            permissionCodes: v.permissionCodes ?? [],
        }
    }

    return {profile, accessToken, saveAccessToken, saveProfile, saveUser}
})
