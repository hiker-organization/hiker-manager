<script setup lang="ts">
import { useReviewsModuleSumaryCardsResources } from '@/composables/modules/dashboard/review/use-reviews-module-summary-cards-resources'

const { reviewsModuleSummaryResponse } = useReviewsModuleSumaryCardsResources()
</script>

<template>
  <div class="size-full bg-base-300 grid grid-cols-2 gap-4 rounded-md p-4">
    <ModuleSummaryCard
      :label="String(reviewsModuleSummaryResponse.totalReviews)"
      description="Total"
      custom-class="bg-info/20 border-info text-base-content"
    />

    <ModuleSummaryCard
      :label="String(reviewsModuleSummaryResponse.common.count)"
      description="Válidas"
      custom-class="bg-success/20 border-success text-base-content"
    />

    <ModuleSummaryCard
      :label="String(reviewsModuleSummaryResponse.blocked.count)"
      description="Bloqueadas"
      custom-class="bg-warning/20 border-warning text-base-content"
    />

    <ModuleSummaryCard
      :label="String(reviewsModuleSummaryResponse.reported.count)"
      description="Reportadas"
      custom-class="bg-error/20 border-error text-base-content"
    />
  </div>
</template>
