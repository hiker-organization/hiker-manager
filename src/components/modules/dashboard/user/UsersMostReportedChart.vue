<script setup lang="ts">
import { useUsersMostReportedChartResources } from '@/composables/modules/dashboard/user/use-users-most-reported-chart-resources'

const { isLoading, usersMostReportedChartSeries, usersMostReportedChartOptions } =
  useUsersMostReportedChartResources()
</script>

<template>
  <ApexChart
    :is-loading="isLoading"
    :series="usersMostReportedChartSeries"
    :options="usersMostReportedChartOptions"
  />
</template>
