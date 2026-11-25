import type { AutoBlockedReviewListRow } from '@/models/modules/auto-blocked-review/auto-blocked-review-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { useAutoBlockedReviewStore } from '@/stores/modules/auto-blocked-review/auto-blocked-review-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

// pendentes: true lista os bloqueios ainda não revisados, false os já revisados.
export function useAutoBlockedReviewList(namespace: string, pendentes: boolean) {
  const autoBlockedReviewStore = useAutoBlockedReviewStore()

  const autoBlockedReviews = ref<Array<AutoBlockedReviewListRow>>([])

  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    sortable_fields: [],
  })

  const actionsModalIsVisible = ref<boolean>(false)

  const selectedAutoBlockedReview = ref<AutoBlockedReviewListRow | null>(null)

  const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
    namespace,
    onNamespaceQueryParamsChange: loadAutoBlockedReviews,
    immediate: true,
  })

  function openActionsModal(data: AutoBlockedReviewListRow) {
    selectedAutoBlockedReview.value = data

    actionsModalIsVisible.value = true
  }

  async function loadAutoBlockedReviews() {
    const { data, statusCode } = await autoBlockedReviewStore.fetchAutoBlockedReviews(
      {
        ...currentNamespaceQueryParams.value,
        pendentes,
      },
      {},
    )

    if (statusCode.value === 200 && data.value) {
      autoBlockedReviews.value = data.value.data

      pagination.value = {
        ...data.value.meta,
        sortable_fields: ['id', 'createdAt'],
      }
    }
  }

  async function forceAutoBlockedReviewsListingReload() {
    actionsModalIsVisible.value = false

    await loadAutoBlockedReviews()
  }

  return {
    namespace,
    autoBlockedReviews,
    pagination,
    actionsModalIsVisible,
    selectedAutoBlockedReview,
    openActionsModal,
    forceAutoBlockedReviewsListingReload,
    setNamespaceQueryParams,
  }
}
