import type { ReportListRow } from '@/models/modules/report/report-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { useReportStore } from '@/stores/modules/report/report-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

export function useReportList() {
  const reportStore = useReportStore()

  const namespace: string = 'reports-list'

  const reports = ref<Array<ReportListRow>>([])

  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    sortable_fields: [],
  })

  const actionsModalIsVisible = ref<boolean>(false)

  const selectedReport = ref<ReportListRow | null>(null)

  const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
    namespace,
    onNamespaceQueryParamsChange: loadReports,
    immediate: true,
  })

  function openActionsModal(data: ReportListRow) {
    selectedReport.value = data

    actionsModalIsVisible.value = true
  }

  async function loadReports() {
    const { data, statusCode } = await reportStore.fetchReports(
      currentNamespaceQueryParams.value,
      {},
    )

    if (statusCode.value === 200 && data.value) {
      reports.value = data.value.data

      pagination.value = {
        ...data.value.meta,
        sortable_fields: ['id', 'categoria', 'createdAt', 'id_review'],
      }
    }
  }

  async function forceReportsListingReload() {
    actionsModalIsVisible.value = false

    await loadReports()
  }

  return {
    namespace,
    reports,
    pagination,
    actionsModalIsVisible,
    selectedReport,
    openActionsModal,
    forceReportsListingReload,
    setNamespaceQueryParams,
  }
}
