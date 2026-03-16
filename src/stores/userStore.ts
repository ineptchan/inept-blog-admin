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

    return {profile, accessToken, saveAccessToken, saveProfile}
})
