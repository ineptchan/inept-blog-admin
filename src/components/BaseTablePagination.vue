<script setup lang="ts">
export interface PageData {
  total: number
  pageSize: number
  currentPage: number
}

interface Props {
  tableData: Record<string, any>[]
  loading?: boolean
  pageData: PageData
}

const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  loading: false
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'update:pageData', value: PageData): void
}>()

const onPageChange = (page: number) => {
  emit('page-change', page)
  emit('update:pageData', {
    ...props.pageData,
    currentPage: page
  })
}
</script>

<template>
  <el-table
      :data="tableData"
      border
      stripe
      class="w-full"
      v-loading="loading"
  >
    <slot name="table"></slot>
  </el-table>

  <div class="mt-6 flex justify-end">
    <el-pagination
        background
        layout="total, prev, pager, next"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :current-page="pageData.currentPage"
        @current-change="onPageChange"
    />
  </div>
</template>

<style scoped>
</style>
