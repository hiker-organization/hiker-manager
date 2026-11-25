<script setup lang="ts">
import { useReviewsMostReportedCurrentlyResources } from '@/composables/modules/dashboard/review/use-reviews-most-reported-currently-chart-resources'

const { reviewsMostReportedCurrentlyChartSeries, reviewsMostReportedCurrentlyChartOptions } =
  useReviewsMostReportedCurrentlyResources()
</script>

<template>
  <ApexChart
    :series="reviewsMostReportedCurrentlyChartSeries"
    :options="reviewsMostReportedCurrentlyChartOptions"
  />
</template>
