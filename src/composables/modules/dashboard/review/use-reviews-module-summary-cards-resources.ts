import type { ReviewsModuleSummaryResponse } from '@/models/modules/dashboard/review/reviews-dashboard-model'
import { onMounted, ref } from 'vue'
import { useReviewsDashboardStore } from '@/stores/modules/dashboard/review/reviews-dashboard-store'

export function useReviewsModuleSumaryCardsResources() {
  const reviewsDashboardStore = useReviewsDashboardStore()

  const reviewsModuleSummaryResponse = ref<ReviewsModuleSummaryResponse>({
    totalReviews: 0,
    common: {
      percentage: 0,
      count: 0,
    },
    reported: {
      percentage: 0,
      count: 0,
    },
    blocked: {
      percentage: 0,
      count: 0,
    },
  })

  // Começa verdadeiro, pois a busca é disparada ao montar o componente.

  const isLoading = ref<boolean>(true)

  onMounted(async () => {
    const { data, statusCode } = await reviewsDashboardStore.getReviewsModuleSummary({}, {})

    isLoading.value = false

    if (statusCode.value === 200 && data.value) {
      reviewsModuleSummaryResponse.value = data.value
    }
  })

  return {
    isLoading,
    reviewsModuleSummaryResponse,
  }
}
