<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useAutoBlockedReviewList } from '@/composables/modules/auto-blocked-review/use-auto-blocked-review-list'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'
import {
  AUTO_BLOCKED_REVIEW_PENDING_TABLE_COLUMNS,
  AUTO_BLOCKED_REVIEW_REVIEWED_TABLE_COLUMNS,
} from '@/constants/modules/auto-blocked-review/auto-blocked-review-table-columns'

// Nome do slot da coluna com ponto, só pode ser usado como argumento dinâmico.
const decisionSlot = 'classificacao.decisao_admin'

const situationNamespace: string = 'auto-blocked-situation'

const {
  currentNamespaceQueryParams: currentSituationQueryParams,
  setNamespaceQueryParams: setSituationQueryParams,
} = useUrlParamsManager({
  namespace: situationNamespace,
})

const currentSituation = computed<string>(() =>
  String(currentSituationQueryParams.value.situacao ?? 'TODAS'),
)

const {
  namespace: pendingNamespace,
  autoBlockedReviews: pendingReviews,
  pagination: pendingPagination,
  isLoading: pendingIsLoading,
  actionsModalIsVisible,
  selectedAutoBlockedReview,
  openActionsModal,
  forceAutoBlockedReviewsListingReload: forcePendingListingReload,
  setNamespaceQueryParams: setPendingQueryParams,
} = useAutoBlockedReviewList('auto-blocked-pending-list', true)

const {
  namespace: reviewedNamespace,
  autoBlockedReviews: reviewedReviews,
  pagination: reviewedPagination,
  isLoading: reviewedIsLoading,
  forceAutoBlockedReviewsListingReload: forceReviewedListingReload,
  setNamespaceQueryParams: setReviewedQueryParams,
} = useAutoBlockedReviewList('auto-blocked-reviewed-list', false)

// Uma decisão tira a review das pendentes e a coloca nas revisadas.
async function forceAutoBlockedReviewsListingsReload() {
  await Promise.all([forcePendingListingReload(), forceReviewedListingReload()])
}
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="w-full md:w-64">
      <AutoBlockedReviewStatsFilter
        :namespace="situationNamespace"
        @update-params="(params) => setSituationQueryParams(params)"
      />
    </div>

    <section v-if="currentSituation !== 'REVISADAS'" class="w-full flex flex-col gap-2">
      <span class="flex items-center justify-start gap-2 text-lg font-extrabold">
        <Icon icon="lucide:clock" />
        Pendentes
      </span>

      <Table
        :namespace="pendingNamespace"
        :columns="AUTO_BLOCKED_REVIEW_PENDING_TABLE_COLUMNS"
        :rows="pendingReviews"
        :pagination="pendingPagination"
        :is-loading="pendingIsLoading"
        @update-params="(params) => setPendingQueryParams(params)"
      >
        <template #cardTitle="{ data }">
          <span class="font-extrabold truncate">#{{ data.id }}</span>
        </template>

        <template #registerActions="{ data }">
          <Button
            custom-class="btn-primary w-full flex items-center justify-center gap-2 p-4 md:w-auto"
            label="Opções"
            icon="lucide:sparkles"
            @click="openActionsModal(data)"
          />
        </template>
      </Table>
    </section>

    <section v-if="currentSituation !== 'PENDENTES'" class="w-full flex flex-col gap-2">
      <span class="flex items-center justify-start gap-2 text-lg font-extrabold">
        <Icon icon="lucide:circle-check" />
        Revisadas
      </span>

      <Table
        :namespace="reviewedNamespace"
        :columns="AUTO_BLOCKED_REVIEW_REVIEWED_TABLE_COLUMNS"
        :rows="reviewedReviews"
        :pagination="reviewedPagination"
        :is-loading="reviewedIsLoading"
        @update-params="(params) => setReviewedQueryParams(params)"
      >
        <template #[decisionSlot]="{ data }">
          <ConditionBadge
            :value="data.classificacao.decisao_admin === 'AUTORIZADA'"
            active-text="Liberada"
            inactive-text="Bloqueio Mantido"
            activeClass="badge-success"
            inactiveClass="badge-error"
          />
        </template>

        <template #cardTitle="{ data }">
          <span class="font-extrabold truncate">#{{ data.id }}</span>
        </template>
      </Table>
    </section>

    <Modal
      v-if="selectedAutoBlockedReview"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Ações (#${selectedAutoBlockedReview.id})`"
      icon="lucide:shield-alert"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <RevertAutoBlockButton
          :review="selectedAutoBlockedReview"
          @revert-processed="forceAutoBlockedReviewsListingsReload"
        />

        <ConfirmAutoBlockButton
          :review="selectedAutoBlockedReview"
          @confirm-processed="forceAutoBlockedReviewsListingsReload"
        />
      </div>
    </Modal>
  </div>
</template>
