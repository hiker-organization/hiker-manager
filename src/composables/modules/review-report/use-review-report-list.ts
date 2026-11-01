import type { ReviewReportListRow } from '@/models/modules/review-report/review-report-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useReviewReportStore } from '@/stores/modules/review-report/use-review-report-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

export function useReviewReportList() {
  const route = useRoute()

  const reviewReportStore = useReviewReportStore()

  const namespace: string = 'review-reports-list'

  const reviewCode = computed<number | null>(() => {
    const param = route.params.reviewCode

    if (!param) {
      return null
    }

    return Number(param)
  })

  const reviewReports = ref<Array<ReviewReportListRow>>([])

  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    sortable_fields: [],
  })

  const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
    namespace,
    onNamespaceQueryParamsChange: async () => {
      const { data, statusCode } = await reviewReportStore.fetchReviewReports(
        currentNamespaceQueryParams.value,
        {
          reviewCode: reviewCode.value,
        },
      )

      if (statusCode.value === 200 && data.value) {
        reviewReports.value = data.value.data

        pagination.value = {
          ...data.value.meta,
          sortable_fields: ['id', 'categoria', 'createdAt', 'id_review'],
        }
      }
    },
    immediate: true,
  })

  return {
    namespace,
    reviewReports,
    pagination,
    setNamespaceQueryParams,
  }
}
