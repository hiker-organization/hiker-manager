<script setup lang="ts">
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref, watch } from 'vue'

const props = defineProps<{
  pagination: Pagination
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentPage = ref<number>(props.pagination.page || 1)

watch(
  () => currentPage.value,
  (newPage: number) => {
    emits('updateParams', {
      page: newPage,
    })
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-full flex items-center justify-center gap-2">
    <span v-for="index in pagination.total_pages" :key="index">
      <Button
        v-if="props.pagination.page == index"
        :label="String(index)"
      />
      <Button
        v-else :label="String(index)"
        @click="emits('updateParams', { page: index })"
      />
    </span>
  </div>
</template>
