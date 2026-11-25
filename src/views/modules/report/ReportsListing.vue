<script setup lang="ts">
import { useReportList } from '@/composables/modules/report/use-report-list'
import { REPORT_TABLE_COLUMNS } from '@/constants/modules/report/report-table-columns'

const {
  namespace,
  reports,
  pagination,
  isLoading,
  actionsModalIsVisible,
  selectedReport,
  openActionsModal,
  forceReportsListingReload,
  setNamespaceQueryParams,
} = useReportList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REPORT_TABLE_COLUMNS"
      :rows="reports"
      :pagination="pagination"
      :is-loading="isLoading"
      :extra-slots="['statsFilter']"
      @update-params="(params) => setNamespaceQueryParams(params)"
    >
      <template #statsFilter>
        <ReportStatsFilter
          :namespace="namespace"
          @update-params="(params) => setNamespaceQueryParams(params)"
        />
      </template>

      <template #status="{ data }">
        <ConditionBadge
          :value="data.status === 'ATIVA'"
          :active-text="data.status"
          :inactive-text="data.status"
          activeClass="badge-success"
          inactiveClass="badge-warning"
        />
      </template>

      <template #cardTitle="{ data }">
        <span class="font-extrabold truncate">#{{ data.id }}</span>
      </template>

      <template #registerActions="{ data }">
        <Button
          :disabled="data.status === 'FECHADA'"
          custom-class="btn-primary w-full flex items-center justify-center gap-2 p-4 md:w-auto"
          label="Opções"
          icon="lucide:sparkles"
          @click="openActionsModal(data)"
        />
      </template>
    </Table>

    <Modal
      v-if="selectedReport"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Ações (#${selectedReport.id})`"
      icon="lucide:message-circle-warning"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DiscardReportButton
          :report="selectedReport"
          @discard-processed="forceReportsListingReload"
        />

        <ConfirmReportButton
          :report="selectedReport"
          @confirm-processes="forceReportsListingReload"
        />
      </div>
    </Modal>
  </div>
</template>
