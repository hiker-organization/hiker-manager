<script setup lang="ts">
import { useUsersModuleSummaryChartResources } from '@/composables/modules/dashboard/user/use-users-module-summary-chart-resources'

const { isLoading, usersModuleSummaryChartSeries, usersModuleSummaryChartOptions } =
  useUsersModuleSummaryChartResources()
</script>

<template>
  <ApexChart
    :is-loading="isLoading"
    :series="usersModuleSummaryChartSeries"
    :options="usersModuleSummaryChartOptions"
  />
</template>
