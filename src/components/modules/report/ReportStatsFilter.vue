<script setup lang="ts">
import type { ReportFilterStats } from '@/models/modules/report/report-model'
import { onMounted, ref, watch } from 'vue'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

const props = defineProps<{
  namespace: string
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentStatsFilter = ref<ReportFilterStats | null>(null)

const { currentNamespaceQueryParams } = useUrlParamsManager({
  namespace: props.namespace,
})

watch(
  () => currentStatsFilter.value,
  (newStatsFilter: ReportFilterStats | null) => {
    emits('updateParams', {
      situacao: newStatsFilter,
    })
  },
)

onMounted(() => {
  currentStatsFilter.value = currentNamespaceQueryParams.value.situacao
    ? (String(currentNamespaceQueryParams.value.situacao) as ReportFilterStats)
    : 'TODAS'
})
</script>

<template>
  <TableOptionContainer label="Situação" icon="lucide:info">
    <Input
      v-model="currentStatsFilter"
      :options="[
        { value: 'TODAS', label: 'Todas' },
        { value: 'ATIVAS', label: 'Ativas' },
        { value: 'FECHADAS', label: 'Fechadas' },
      ]"
      :classes="{
        wrapper: 'w-full bg-base-300 rounded-md p-2',
        input: 'w-full cursor-pointer',
        option: 'bg-base-100',
      }"
      type="select"
    />
  </TableOptionContainer>
</template>
