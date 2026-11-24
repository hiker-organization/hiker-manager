<script setup lang="ts">
import { useUsersWithMostBlockedReviewsChartResources } from '@/composables/modules/dashboard/user/use-users-with-most-blocked-reviews-chart-resources'

const { usersWithMostBlockedReviewsChartSeries, usersWithMostBlockedReviewsChartOptions } =
  useUsersWithMostBlockedReviewsChartResources()
</script>

<template>
  <ApexChart
    :series="usersWithMostBlockedReviewsChartSeries"
    :options="usersWithMostBlockedReviewsChartOptions"
  />
</template>
