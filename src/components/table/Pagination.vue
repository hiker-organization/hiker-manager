<script setup lang="ts">
import type { Pagination } from '@/models/components/table/pagination-model'

const props = defineProps<{
  pagination: Pagination
}>()
</script>

<template>
  <div class="w-full flex items-center justify-center gap-2">
    <span v-for="index in pagination.total_pages" :key="index">
      <Button v-if="props.pagination.page == index" :label="index" type="active" />
      <Button v-else :label="index" type="soft" />
    </span>
  </div>
</template>
