<script setup lang="ts">
import type { AutoBlockedReviewFilterStats } from '@/models/modules/auto-blocked-review/auto-blocked-review-model'
import { onMounted, ref, watch } from 'vue'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

const props = defineProps<{
  namespace: string
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentStatsFilter = ref<AutoBlockedReviewFilterStats | null>(null)

const { currentNamespaceQueryParams } = useUrlParamsManager({
  namespace: props.namespace,
})

watch(
  () => currentStatsFilter.value,
  (newStatsFilter: AutoBlockedReviewFilterStats | null) => {
    emits('updateParams', {
      situacao: newStatsFilter,
    })
  },
)

onMounted(() => {
  currentStatsFilter.value = currentNamespaceQueryParams.value.situacao
    ? (String(currentNamespaceQueryParams.value.situacao) as AutoBlockedReviewFilterStats)
    : 'TODAS'
})
</script>

<template>
  <TableOptionContainer label="Situação" icon="lucide:info">
    <Input
      v-model="currentStatsFilter"
      :options="[
        { value: 'TODAS', label: 'Todas' },
        { value: 'PENDENTES', label: 'Pendentes' },
        { value: 'REVISADAS', label: 'Revisadas' },
      ]"
      :classes="{
        wrapper: 'w-full bg-base-100 rounded-md p-2',
        input: 'w-full cursor-pointer',
        option: 'bg-base-200',
      }"
      type="select"
    />
  </TableOptionContainer>
</template>
