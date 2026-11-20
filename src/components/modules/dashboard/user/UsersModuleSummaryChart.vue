<script setup lang="ts">
import { useUsersModuleSummaryChartResources } from '@/composables/modules/dashboard/user/use-users-module-summary-chart-resources'

const { usersModuleSummaryChartSeries, usersModuleSummaryChartOptions } =
  useUsersModuleSummaryChartResources()
</script>

<template>
  <ApexChart :series="usersModuleSummaryChartSeries" :options="usersModuleSummaryChartOptions" />
</template>
