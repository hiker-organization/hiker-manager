<script setup lang="ts">
import type { ReportListRow } from '@/models/modules/report/report-model'
import type { ReviewReportListRow } from '@/models/modules/review-report/review-report-model'
import { computed } from 'vue'
import { getNormalizedDate } from '@/utils/data/formatting/date-formatting-utils'

// Denúncia completa, sem cortar os textos que nas tabelas ficam com reticências.

const props = defineProps<{
  report: ReportListRow | ReviewReportListRow
}>()

const NOT_DEFINED: string = 'Não Definido(a)'

const reportFields = computed<Array<{ label: string; value: string }>>(() => {
  const { report } = props

  const fields = [
    { label: 'Categoria', value: report.categoria },
    { label: 'Descrição', value: report.descricao || NOT_DEFINED },
    { label: 'Data de Criação', value: getNormalizedDate(report.createdAt) },
    { label: 'Autor', value: `${report.autor.nome_usuario} (ID ${report.id_usuario})` },
  ]

  // A listagem de denúncias de uma postagem não traz o texto da postagem.

  if ('review' in report) {
    fields.push({ label: 'Postagem', value: report.review.descricao })
  }

  fields.push(
    { label: 'ID da Postagem', value: String(report.id_review) },
    { label: 'Status', value: report.status },
  )

  if (report.status === 'FECHADA') {
    fields.push(
      {
        label: 'Revisado em',
        value: report.revisado_em ? getNormalizedDate(report.revisado_em) : NOT_DEFINED,
      },
      { label: 'Revisado por', value: report.revisor?.nome_usuario ?? NOT_DEFINED },
    )
  }

  return fields
})
</script>

<template>
  <DetailsList :fields="reportFields">
    <DetailsItem v-if="props.report.status === 'FECHADA'" label="Decisão">
      <ConditionBadge
        v-if="props.report.decisao"
        :value="props.report.decisao === 'AUTORIZADA'"
        active-text="Descartada"
        inactive-text="Bloqueada"
        activeClass="badge-success"
        inactiveClass="badge-error"
        custom-class="badge-soft rounded-sm font-bold p-4 mt-1"
      />

      <span v-else>{{ NOT_DEFINED }}</span>
    </DetailsItem>
  </DetailsList>
</template>
