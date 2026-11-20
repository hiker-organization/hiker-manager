import type { ReviewsModuleSummaryResponse } from '@/models/modules/dashboard/dashboard-model'
import { onMounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/modules/dashboard/dashboard-store'

export function useReviewsModuleSumaryCardsResources() {
  const dashboardStore = useDashboardStore()

  const reviewsModuleSummaryResponse = ref<ReviewsModuleSummaryResponse>({
    totalReviews: 0,
    common: {
      percentage: 0,
      count: 0,
    },
    blocked: {
      percentage: 0,
      count: 0,
    },
    reported: {
      percentage: 0,
      count: 0,
    },
  })

  onMounted(async () => {
    const { data, statusCode } = await dashboardStore.getReviewsModuleSummary({}, {})

    if (statusCode.value === 200 && data.value) {
      reviewsModuleSummaryResponse.value = data.value
    }
  })

  return {
    reviewsModuleSummaryResponse,
  }
}
