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

const didInitialSync = ref<boolean>(false)

const { currentNamespaceQueryParams } = useUrlParamsManager({
  namespace: props.namespace,
})

watch(
  () => currentStatsFilter.value,
  (newStatsFilter: ReportFilterStats | null) => {
    // Se não for a primeira execução, reseta a página.

    if (didInitialSync.value) {
      emits('updateParams', {
        status: newStatsFilter,
        page: 1,
      })

      return
    }

    emits('updateParams', {
      status: newStatsFilter,
    })

    didInitialSync.value = true
  },
)

onMounted(() => {
  currentStatsFilter.value = currentNamespaceQueryParams.value.status
    ? (String(currentNamespaceQueryParams.value.status) as ReportFilterStats)
    : 'ATIVA'
})
</script>

<template>
  <TableOptionContainer label="Status" icon="lucide:info">
    <Input
      v-model="currentStatsFilter"
      :options="[
        { value: 'ATIVA', label: 'Ativas' },
        { value: 'FECHADA', label: 'Fechadas' },
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
