<script setup lang="ts">
import { useReviewsModuleSummaryChartResources } from '@/composables/modules/dashboard/review/use-reviews-module-summary-chart-resources'

const { isLoading, reviewsModuleSummaryChartSeries, reviewsModuleSummaryChartOptions } =
  useReviewsModuleSummaryChartResources()
</script>

<template>
  <ApexChart
    :is-loading="isLoading"
    :series="reviewsModuleSummaryChartSeries"
    :options="reviewsModuleSummaryChartOptions"
  />
</template>
