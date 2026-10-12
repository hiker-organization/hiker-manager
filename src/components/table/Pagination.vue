<script setup lang="ts">
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref, watch } from 'vue'

const props = defineProps<{
  pagination: Pagination
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentPage = ref<number>(0)

function changePage(page: number) {
  if (currentPage.value === page) {
    return
  }

  emits('updateParams', {
    page,
  })
}

watch(
  () => props.pagination.page,
  (newPage: number) => {
    currentPage.value = newPage
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-full flex items-center justify-center gap-2">
    <span v-for="page in pagination.total_pages" :key="page">
      <Button
        :label="String(page)"
        :custom-class="[
          'btn-primary flex items-center justify-center gap-2 p-4',
          { 'opacity-50': currentPage !== page },
        ]"
        @click="changePage(page)"
      />
    </span>
  </div>
</template>
