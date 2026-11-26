<script setup lang="ts">
import { useUsersWithMostBlockedReviewsChartResources } from '@/composables/modules/dashboard/user/use-users-with-most-blocked-reviews-chart-resources'

const {
  isLoading,
  usersWithMostBlockedReviewsChartSeries,
  usersWithMostBlockedReviewsChartOptions,
} = useUsersWithMostBlockedReviewsChartResources()
</script>

<template>
  <ApexChart
    :is-loading="isLoading"
    :series="usersWithMostBlockedReviewsChartSeries"
    :options="usersWithMostBlockedReviewsChartOptions"
  />
</template>
