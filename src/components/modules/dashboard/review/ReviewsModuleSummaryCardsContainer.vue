<script setup lang="ts">
import { useReviewsModuleSumaryCardsResources } from '@/composables/modules/dashboard/review/use-reviews-module-summary-cards-resources'

const { isLoading, reviewsModuleSummaryResponse } = useReviewsModuleSumaryCardsResources()
</script>

<template>
  <div class="size-full grid grid-cols-1 gap-4 sm:grid-cols-2">
    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(reviewsModuleSummaryResponse.totalReviews)"
      description="Total"
      custom-class="text-info"
    />

    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(reviewsModuleSummaryResponse.common.count)"
      description="Válidas"
      custom-class="text-success"
    />

    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(reviewsModuleSummaryResponse.reported.count)"
      description="Reportadas"
      custom-class="text-warning"
    />

    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(reviewsModuleSummaryResponse.blocked.count)"
      description="Bloqueadas"
      custom-class="text-error"
    />
  </div>
</template>
