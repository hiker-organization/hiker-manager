<script setup lang="ts">
import type { ReportListRow } from '@/models/modules/report/report-model'
import { useReportStore } from '@/stores/modules/report/report-store'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  report: ReportListRow
}>()

const emits = defineEmits<{
  (e: 'discardProcessed'): void
}>()

const reportStore = useReportStore()

const { notify } = useToast()

async function handleSubmit() {
  const { statusCode } = await reportStore.moderateReport(
    {
      status: 'AUTORIZADA',
    },
    {},
    {
      reportCode: props.report.id,
    },
  )

  if (statusCode.value === 200) {
    notify.success('Denúncia descartada com sucesso.')

    emits('discardProcessed')

    return
  }

  notify.error('Erro ao descartar a denúncia!')
}
</script>

<template>
  <Button
    label="Descartar"
    icon="lucide:check"
    custom-class="btn-success w-full flex items-center justify-center gap-2 p-4"
    @click="handleSubmit"
  />
</template>
