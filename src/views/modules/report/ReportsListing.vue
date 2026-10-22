<script setup lang="ts">
import type { Report } from '@/models/modules/report/report-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { REPORT_TABLE_COLUMNS } from '@/constants/modules/report/report-table-columns'
import { useReportStore } from '@/stores/modules/report/report-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

const reportStore = useReportStore()

const namespace: string = 'reports-list'

const reports = ref<Array<Report>>([])

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
    const { data, statusCode } = await reportStore.fetchReports(
      currentNamespaceQueryParams.value,
      {},
    )

    if (statusCode.value === 200 && data.value) {
      reports.value = data.value.data

      pagination.value = {
        ...data.value.meta,
        sortable_fields: [],
      }
    }
  },
  immediate: true,
})
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REPORT_TABLE_COLUMNS"
      :rows="reports"
      :pagination="pagination"
      @update-params="(params) => setNamespaceQueryParams(params)"
    />
  </div>
</template>
