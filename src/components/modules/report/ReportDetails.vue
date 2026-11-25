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
  <dl class="flex flex-col gap-2">
    <div v-for="field in reportFields" :key="field.label" class="bg-base-200 rounded-md p-2">
      <dt class="font-bold">{{ field.label }}</dt>
      <dd class="whitespace-normal break-words">{{ field.value }}</dd>
    </div>

    <div v-if="props.report.status === 'FECHADA'" class="bg-base-200 rounded-md p-2">
      <dt class="font-bold">Decisão</dt>
      <dd class="mt-1">
        <ConditionBadge
          v-if="props.report.decisao"
          :value="props.report.decisao === 'AUTORIZADA'"
          active-text="Descartada"
          inactive-text="Bloqueada"
          activeClass="badge-success"
          inactiveClass="badge-error"
        />

        <span v-else>{{ NOT_DEFINED }}</span>
      </dd>
    </div>
  </dl>
</template>
