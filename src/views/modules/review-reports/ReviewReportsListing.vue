<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useReviewReportList } from '@/composables/modules/review-report/review-report-list'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'
import {
  REVIEW_REPORT_ACTIVE_TABLE_COLUMNS,
  REVIEW_REPORT_CLOSED_TABLE_COLUMNS,
} from '@/constants/modules/review-report/review-report-table-columns'

/*
  Os namespaces não podem estar contidos uns nos outros (o gerenciador da URL usa
  includes), por isso "review-report" no singular, diferente da página de denúncias.
*/

const situationNamespace: string = 'review-report-situation'

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
  namespace: activeNamespace,
  reviewReports: activeReviewReports,
  pagination: activePagination,
  isLoading: activeIsLoading,
  actionsModalIsVisible,
  selectedReviewReport,
  openActionsModal,
  forceReviewReportsListingReload: forceActiveListingReload,
  setNamespaceQueryParams: setActiveQueryParams,
} = useReviewReportList('review-report-active-list', 'ATIVA')

const {
  namespace: closedNamespace,
  reviewReports: closedReviewReports,
  pagination: closedPagination,
  isLoading: closedIsLoading,
  forceReviewReportsListingReload: forceClosedListingReload,
  setNamespaceQueryParams: setClosedQueryParams,
} = useReviewReportList('review-report-closed-list', 'FECHADA')

// Uma decisão tira a denúncia das ativas e a coloca nas fechadas.
async function forceReviewReportsListingsReload() {
  await Promise.all([forceActiveListingReload(), forceClosedListingReload()])
}
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="w-full md:w-64">
      <ReportStatsFilter
        :namespace="situationNamespace"
        @update-params="(params) => setSituationQueryParams(params)"
      />
    </div>

    <section v-if="currentSituation !== 'FECHADAS'" class="w-full flex flex-col gap-2">
      <span class="flex items-center justify-start gap-2 text-lg font-extrabold">
        <Icon icon="lucide:clock" />
        Ativas
      </span>

      <Table
        :namespace="activeNamespace"
        :columns="REVIEW_REPORT_ACTIVE_TABLE_COLUMNS"
        :rows="activeReviewReports"
        :pagination="activePagination"
        :is-loading="activeIsLoading"
        @update-params="(params) => setActiveQueryParams(params)"
      >
        <!-- O ID e o "Opções" abrem a denúncia completa, já que a tabela corta os textos. -->

        <template #id="{ data }">
          <button
            type="button"
            class="link link-primary font-bold"
            title="Ver denúncia completa"
            @click="openActionsModal(data)"
          >
            {{ data.id }}
          </button>
        </template>

        <template #descricao="{ data }">
          <span class="block max-w-xs truncate" :title="data.descricao">
            {{ data.descricao || 'Não Definido(a)' }}
          </span>
        </template>

        <template #cardTitle="{ data }">
          <button
            type="button"
            class="font-extrabold truncate cursor-pointer"
            @click="openActionsModal(data)"
          >
            #{{ data.id }}
          </button>
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

    <section v-if="currentSituation !== 'ATIVAS'" class="w-full flex flex-col gap-2">
      <span class="flex items-center justify-start gap-2 text-lg font-extrabold">
        <Icon icon="lucide:circle-check" />
        Fechadas
      </span>

      <Table
        :namespace="closedNamespace"
        :columns="REVIEW_REPORT_CLOSED_TABLE_COLUMNS"
        :rows="closedReviewReports"
        :pagination="closedPagination"
        :is-loading="closedIsLoading"
        @update-params="(params) => setClosedQueryParams(params)"
      >
        <template #decisao="{ data }">
          <ConditionBadge
            v-if="data.decisao"
            :value="data.decisao === 'AUTORIZADA'"
            active-text="Descartada"
            inactive-text="Bloqueada"
            activeClass="badge-success"
            inactiveClass="badge-error"
          />

          <!-- Fechadas antes de a decisão ser registrada. -->

          <span v-else class="truncate">Não Definido(a)</span>
        </template>

        <!-- O ID e o "Opções" abrem a denúncia completa, já que a tabela corta os textos. -->

        <template #id="{ data }">
          <button
            type="button"
            class="link link-primary font-bold"
            title="Ver denúncia completa"
            @click="openActionsModal(data)"
          >
            {{ data.id }}
          </button>
        </template>

        <template #descricao="{ data }">
          <span class="block max-w-xs truncate" :title="data.descricao">
            {{ data.descricao || 'Não Definido(a)' }}
          </span>
        </template>

        <template #cardTitle="{ data }">
          <button
            type="button"
            class="font-extrabold truncate cursor-pointer"
            @click="openActionsModal(data)"
          >
            #{{ data.id }}
          </button>
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

    <Modal
      v-if="selectedReviewReport"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Denúncia (#${selectedReviewReport.id})`"
      icon="lucide:message-circle-warning"
    >
      <ReportDetails :report="selectedReviewReport" />

      <!-- Só uma denúncia ativa pode ser moderada. -->

      <div
        v-if="selectedReviewReport.status === 'ATIVA'"
        class="grid grid-cols-1 gap-2 md:grid-cols-2"
      >
        <DiscardReportButton
          :report="selectedReviewReport"
          @discard-processed="forceReviewReportsListingsReload"
        />

        <ConfirmReportButton
          :report="selectedReviewReport"
          @confirm-processes="forceReviewReportsListingsReload"
        />
      </div>
    </Modal>
  </div>
</template>
