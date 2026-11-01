<script setup lang="ts">
import { useReviewReportList } from '@/composables/modules/review-report/use-review-report-list'
import { REVIEW_REPORT_TABLE_COLUMNS } from '@/constants/modules/review-report/review-report-table-columns'

const { namespace, reviewReports, pagination, setNamespaceQueryParams } = useReviewReportList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REVIEW_REPORT_TABLE_COLUMNS"
      :rows="reviewReports"
      :pagination="pagination"
      @update-params="(params) => setNamespaceQueryParams(params)"
    >
      <template #status="{ data }">
        <ConditionBadge
          :value="data.status === 'ATIVA'"
          :active-text="data.status"
          :inactive-text="data.status"
          activeClass="badge-success"
          inactiveClass="badge-warning"
        />
      </template>
    </Table>
  </div>
</template>
