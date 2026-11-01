<script setup lang="ts">
import { useReportList } from '@/composables/modules/report/use-report-list'
import { REPORT_TABLE_COLUMNS } from '@/constants/modules/report/report-table-columns'

const { namespace, reports, pagination, setNamespaceQueryParams } = useReportList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REPORT_TABLE_COLUMNS"
      :rows="reports"
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
