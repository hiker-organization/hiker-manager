<script setup lang="ts">
import { useAutoBlockedReviewList } from '@/composables/modules/auto-blocked-review/use-auto-blocked-review-list'
import { AUTO_BLOCKED_REVIEW_TABLE_COLUMNS } from '@/constants/modules/auto-blocked-review/auto-blocked-review-table-columns'

// Nome do slot da coluna com ponto, só pode ser usado como argumento dinâmico.
const situationSlot = 'classificacao.decisao_admin'

const {
  namespace,
  autoBlockedReviews,
  pagination,
  actionsModalIsVisible,
  selectedAutoBlockedReview,
  openActionsModal,
  forceAutoBlockedReviewsListingReload,
  setNamespaceQueryParams,
} = useAutoBlockedReviewList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="AUTO_BLOCKED_REVIEW_TABLE_COLUMNS"
      :rows="autoBlockedReviews"
      :pagination="pagination"
      :extra-slots="['statsFilter']"
      @update-params="(params) => setNamespaceQueryParams(params)"
    >
      <template #statsFilter>
        <AutoBlockedReviewStatsFilter
          :namespace="namespace"
          @update-params="(params) => setNamespaceQueryParams(params)"
        />
      </template>

      <template #[situationSlot]="{ data }">
        <ConditionBadge
          :value="data.classificacao.decisao_admin === null"
          active-text="Pendente"
          inactive-text="Confirmada"
          activeClass="badge-warning"
          inactiveClass="badge-error"
        />
      </template>

      <template #cardTitle="{ data }">
        <span class="font-extrabold truncate">#{{ data.id }}</span>
      </template>

      <template #registerActions="{ data }">
        <Button
          :disabled="data.classificacao.revisado_em !== null"
          custom-class="btn-primary w-full flex items-center justify-center gap-2 p-4 md:w-auto"
          label="Opções"
          icon="lucide:sparkles"
          @click="openActionsModal(data)"
        />
      </template>
    </Table>

    <Modal
      v-if="selectedAutoBlockedReview"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Ações (#${selectedAutoBlockedReview.id})`"
      icon="lucide:shield-alert"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <RevertAutoBlockButton
          :review="selectedAutoBlockedReview"
          @revert-processed="forceAutoBlockedReviewsListingReload"
        />

        <ConfirmAutoBlockButton
          :review="selectedAutoBlockedReview"
          @confirm-processed="forceAutoBlockedReviewsListingReload"
        />
      </div>
    </Modal>
  </div>
</template>
