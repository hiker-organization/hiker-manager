<script setup lang="ts">
import { useReviewsMostReportedCurrentlyResources } from '@/composables/modules/dashboard/review/use-reviews-most-reported-currently-chart-resources'

const {
  isLoading,
  reviewsMostReportedCurrentlyChartSeries,
  reviewsMostReportedCurrentlyChartOptions,
} = useReviewsMostReportedCurrentlyResources()
</script>

<template>
  <ApexChart
    :is-loading="isLoading"
    :series="reviewsMostReportedCurrentlyChartSeries"
    :options="reviewsMostReportedCurrentlyChartOptions"
  />
</template>
