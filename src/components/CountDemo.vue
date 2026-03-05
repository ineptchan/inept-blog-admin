<script setup lang="ts">
import {computed, ref, watch} from "vue"

interface Props {
  isOpenDouble?: boolean,
  isShowMsg?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  isOpenDouble: true,
  isShowMsg: true,
})

const emit = defineEmits<{
  (e: 'onCount', count: number): void
}>()

const count = ref(0)
const msg = ref<string>("")
const double = computed(() => count.value * 2)

watch(count, (n, p) => {
  emit('onCount', n)
  msg.value = `n=${n} p=${p}`
})
</script>
<template>
  <div>
    <el-button @click="count++">count:{{ count }}</el-button>
    <el-button v-if="props.isOpenDouble" @click="count++">double:{{ double }}</el-button>
    <el-text>msg:{{ msg }}</el-text>
  </div>
</template>
<style scoped>
</style>
