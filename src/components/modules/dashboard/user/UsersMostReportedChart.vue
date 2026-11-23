<script setup lang="ts">
import { useUsersMostReportedChartResources } from '@/composables/modules/dashboard/user/use-users-most-reported-chart-resources'

const { usersMostReportedChartSeries, usersMostReportedChartOptions } =
  useUsersMostReportedChartResources()
</script>

<template>
  <ApexChart :series="usersMostReportedChartSeries" :options="usersMostReportedChartOptions" />
</template>
