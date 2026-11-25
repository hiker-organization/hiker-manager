<script setup lang="ts">
import { useReviewReportList } from '@/composables/modules/review-report/review-report-list'
import { REVIEW_REPORT_TABLE_COLUMNS } from '@/constants/modules/review-report/review-report-table-columns'

const {
  namespace,
  reviewReports,
  pagination,
  isLoading,
  actionsModalIsVisible,
  selectedReviewReport,
  openActionsModal,
  forceReviewReportsListingReload,
  setNamespaceQueryParams,
} = useReviewReportList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REVIEW_REPORT_TABLE_COLUMNS"
      :rows="reviewReports"
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
      v-if="selectedReviewReport"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Ações (${selectedReviewReport.id})`"
      icon="lucide:message-circle-warning"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DiscardReportButton
          :report="selectedReviewReport"
          @discard-processed="forceReviewReportsListingReload"
        />

        <ConfirmReportButton
          :report="selectedReviewReport"
          @confirm-processes="forceReviewReportsListingReload"
        />
      </div>
    </Modal>
  </div>
</template>
