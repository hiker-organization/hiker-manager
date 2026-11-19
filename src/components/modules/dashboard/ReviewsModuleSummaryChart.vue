<script setup lang="ts">
import { useReviewsModuleSummaryChartResources } from '@/composables/modules/dashboard/use-reviews-module-summary-chart-resources'

const { reviewsModuleSummaryChartSeries, reviewsModuleSummaryChartOptions } =
  useReviewsModuleSummaryChartResources()
</script>

<template>
  <ApexChart
    :series="reviewsModuleSummaryChartSeries"
    :options="reviewsModuleSummaryChartOptions"
  />
</template>
