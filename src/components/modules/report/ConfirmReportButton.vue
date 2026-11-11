<script setup lang="ts">
import type { ReportListRow } from '@/models/modules/report/report-model'
import { useReportStore } from '@/stores/modules/report/report-store'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  report: ReportListRow
}>()

const emits = defineEmits<{
  (e: 'confirmProcesses'): void
}>()

const reportStore = useReportStore()

const { notify } = useToast()

async function handleSubmit() {
  const { statusCode } = await reportStore.moderateReport(
    {
      status: 'OFENSIVA',
    },
    {},
    {
      reportCode: props.report.id,
    },
  )

  if (statusCode.value === 200) {
    notify.success('Denúncia confirmada com sucesso.')

    emits('confirmProcesses')

    return
  }

  notify.error('Erro ao confirmar a denúncia!')
}
</script>

<template>
  <Button
    label="Bloquear"
    icon="lucide:ban"
    custom-class="btn-error w-full flex items-center justify-center gap-2 p-4"
    @click="handleSubmit"
  />
</template>
