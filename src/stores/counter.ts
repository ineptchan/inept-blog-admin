import {defineStore} from "pinia"
import {computed, ref} from "vue"

export const useCounterStore = defineStore('counter', () => {
    const count = ref<number>(0)

    const double = computed(() => count.value * 2)

    function increment(step = 1) {
        count.value += step
    }

    return {count, double, increment}
})
