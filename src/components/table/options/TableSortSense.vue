<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

type SortSense = 'asc' | 'desc' | null

const props = defineProps<{
  namespace: string
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentSortSense = ref<SortSense>(null)

const { currentNamespaceQueryParams } = useUrlParamsManager({
  namespace: props.namespace,
})

watch(
  () => currentSortSense.value,
  (newSortSense: SortSense) => {
    emits('updateParams', {
      order: newSortSense,
    })
  },
)

onMounted(() => {
  currentSortSense.value = currentNamespaceQueryParams.value.order
    ? (String(currentNamespaceQueryParams.value.order) as SortSense)
    : 'desc'
})
</script>

<template>
  <TableOptionContainer icon="lucide:arrow-down-up" label="Sentido">
    <Input
      v-model="currentSortSense"
      :options="[
        { value: 'asc', label: 'Crescente' },
        { value: 'desc', label: 'Descrescente' },
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
