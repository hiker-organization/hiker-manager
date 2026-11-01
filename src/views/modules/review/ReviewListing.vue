<script setup lang="ts">
import { useReviewList } from '@/composables/modules/review/use-review-list'
import { REVIEW_TABLE_COLUMNS } from '@/constants/modules/review/review-table-columns'

const {
  namespace,
  reviews,
  pagination,
  setNamespaceQueryParams,
} = useReviewList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REVIEW_TABLE_COLUMNS"
      :rows="reviews"
      :pagination="pagination"
      @update-params="(params) => setNamespaceQueryParams(params)"
    />
  </div>
</template>
