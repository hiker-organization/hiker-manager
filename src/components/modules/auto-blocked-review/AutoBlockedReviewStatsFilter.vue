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

const didInitialSync = ref<boolean>(false)

const { currentNamespaceQueryParams } = useUrlParamsManager({
  namespace: props.namespace,
})

watch(
  () => currentStatsFilter.value,
  (newStatsFilter: AutoBlockedReviewFilterStats | null) => {
    // Se não for a primeira execução, reseta a página.

    if (didInitialSync.value) {
      emits('updateParams', {
        pendentes: newStatsFilter,
        page: 1,
      })

      return
    }

    emits('updateParams', {
      pendentes: newStatsFilter,
    })

    didInitialSync.value = true
  },
)

onMounted(() => {
  currentStatsFilter.value = currentNamespaceQueryParams.value.pendentes
    ? (String(currentNamespaceQueryParams.value.pendentes) as AutoBlockedReviewFilterStats)
    : 'true'
})
</script>

<template>
  <TableOptionContainer label="Situação" icon="lucide:info">
    <Input
      v-model="currentStatsFilter"
      :options="[
        { value: 'true', label: 'Pendentes' },
        { value: 'false', label: 'Revisadas' },
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
