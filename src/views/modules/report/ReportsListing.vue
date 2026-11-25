<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useReportList } from '@/composables/modules/report/use-report-list'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'
import {
  REPORT_ACTIVE_TABLE_COLUMNS,
  REPORT_CLOSED_TABLE_COLUMNS,
} from '@/constants/modules/report/report-table-columns'

// Nome do slot da coluna com ponto, só pode ser usado como argumento dinâmico.
// A postagem fica em uma linha, com o texto completo no title.
const reviewSlot = 'review.descricao'

// Os namespaces não podem estar contidos uns nos outros (o gerenciador da URL usa includes).

const situationNamespace: string = 'reports-situation'

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
  reports: activeReports,
  pagination: activePagination,
  isLoading: activeIsLoading,
  actionsModalIsVisible,
  selectedReport,
  openActionsModal,
  forceReportsListingReload: forceActiveListingReload,
  setNamespaceQueryParams: setActiveQueryParams,
} = useReportList('reports-active-list', 'ATIVA')

const {
  namespace: closedNamespace,
  reports: closedReports,
  pagination: closedPagination,
  isLoading: closedIsLoading,
  forceReportsListingReload: forceClosedListingReload,
  setNamespaceQueryParams: setClosedQueryParams,
} = useReportList('reports-closed-list', 'FECHADA')

// Uma decisão tira a denúncia das ativas e a coloca nas fechadas.
async function forceReportsListingsReload() {
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
        :columns="REPORT_ACTIVE_TABLE_COLUMNS"
        :rows="activeReports"
        :pagination="activePagination"
        :is-loading="activeIsLoading"
        @update-params="(params) => setActiveQueryParams(params)"
      >
        <template #[reviewSlot]="{ data }">
          <span class="block max-w-xs truncate" :title="data.review.descricao">
            {{ data.review.descricao }}
          </span>
        </template>

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

    <section v-if="currentSituation !== 'ATIVAS'" class="w-full flex flex-col gap-2">
      <span class="flex items-center justify-start gap-2 text-lg font-extrabold">
        <Icon icon="lucide:circle-check" />
        Fechadas
      </span>

      <Table
        :namespace="closedNamespace"
        :columns="REPORT_CLOSED_TABLE_COLUMNS"
        :rows="closedReports"
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

        <template #[reviewSlot]="{ data }">
          <span class="block max-w-xs truncate" :title="data.review.descricao">
            {{ data.review.descricao }}
          </span>
        </template>

        <template #cardTitle="{ data }">
          <span class="font-extrabold truncate">#{{ data.id }}</span>
        </template>
      </Table>
    </section>

    <Modal
      v-if="selectedReport"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Ações (#${selectedReport.id})`"
      icon="lucide:message-circle-warning"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DiscardReportButton
          :report="selectedReport"
          @discard-processed="forceReportsListingsReload"
        />

        <ConfirmReportButton
          :report="selectedReport"
          @confirm-processes="forceReportsListingsReload"
        />
      </div>
    </Modal>
  </div>
</template>
