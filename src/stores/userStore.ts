import {defineStore} from "pinia"
import {ref} from "vue"

export const useUserStore = defineStore('userStore', () => {
    const accessToken = ref<string | null>(null)
    const id = ref<number | null>(null)
    const nickname = ref<string | null>(null)
    const username = ref<string | null>(null)
    const email = ref<string | undefined>(undefined)

    const saveAccessToken = (v: string | null) => {
        accessToken.value = v;
    }

    const saveUser = (newValue: { id: number, nickname: string, username: string, email: string | undefined }) => {
        id.value = newValue.id
        nickname.value = newValue.nickname
        username.value = newValue.username
        email.value = newValue.email
    }

    return {id, nickname, username, email, accessToken, saveAccessToken, saveUser}
})
