import type { ReviewListRow } from '@/models/modules/review/review-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { useReviewStore } from '@/stores/modules/review/review-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

export function useReviewList() {
  const reviewStore = useReviewStore()

  const namespace: string = 'reviews-list'

  const reviews = ref<Array<ReviewListRow>>([])

  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    sortable_fields: [],
  })

  const actionsModalIsVisible = ref<boolean>(false)

  const selectedReview = ref<ReviewListRow | null>(null)

  const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
    namespace,
    onNamespaceQueryParamsChange: async () => {
      const { data, statusCode } = await reviewStore.fetchReviews(
        currentNamespaceQueryParams.value,
        {},
      )

      if (statusCode.value === 200 && data.value) {
        reviews.value = data.value.data

        pagination.value = {
          ...data.value.meta,
          sortable_fields: ['id', 'createdAt'],
        }
      }
    },
    immediate: true,
  })

  function openActionsModal(data: ReviewListRow) {
    selectedReview.value = data

    actionsModalIsVisible.value = true
  }

  return {
    namespace,
    reviews,
    pagination,
    actionsModalIsVisible,
    selectedReview,
    openActionsModal,
    setNamespaceQueryParams,
  }
}
