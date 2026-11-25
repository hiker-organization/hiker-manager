import type { PaginatedResponse, QueryParams, RouteParams } from '@/models/api/api-model'
import type {
  AutoBlockedReviewListRow,
  AutoBlockModerationParameters,
} from '@/models/modules/auto-blocked-review/auto-blocked-review-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useAutoBlockedReviewStore = defineStore('AutoBlockedReviewStore', () => {
  async function fetchAutoBlockedReviews(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/reviews/auto-blocked', queryParams, routeParams),
    )
      .get()
      .json<PaginatedResponse<AutoBlockedReviewListRow>>()
  }

  async function moderateAutoBlockedReview(
    payload: AutoBlockModerationParameters,
    queryParams: QueryParams,
    routeParams: RouteParams,
  ) {
    return await useApiConnection(
      generateFullEndpoint('/admin/review/:reviewCode/auto-block', queryParams, routeParams),
    )
      .patch(payload)
      .json()
  }

  return {
    fetchAutoBlockedReviews,
    moderateAutoBlockedReview,
  }
})
