<script setup lang="ts">
interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

const emit = defineEmits<{
  (e: 'update:count', count: number): void
}>()

const inc = () => {
  emit('update:count', props.count + 1)
}
</script>
<template>
  <div>
    <el-button @click="inc">count:{{ props.count }}</el-button>
  </div>
</template>
<style scoped>
</style>
