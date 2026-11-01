import type { PaginatedResponse, QueryParams, RouteParams } from '@/models/api/api-model'
import type { ReportListRow } from '@/models/modules/report/report-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useReportStore = defineStore('ReportStore', () => {
  async function fetchReports(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(generateFullEndpoint('/admin/reports', queryParams, routeParams))
      .get()
      .json<PaginatedResponse<ReportListRow>>()
  }

  return {
    fetchReports,
  }
})
