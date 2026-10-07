<script setup lang="ts">
import { ref, watch } from 'vue'

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentLimit = ref<number>(1)

watch(
  () => currentLimit.value,
  (newLimit: number) => {
    emits('updateParams', {
      limit: newLimit,
    })
  },
  { immediate: true },
)
</script>

<template>
  <TableOptionContainer
    label="Exibição"
    icon="lucide:list"
  >
    <Input
      v-model="currentLimit"
      :options="[
        { value: 1, label: '1 Item' },
        { value: 10, label: '10 Itens' },
        { value: 20, label: '20 Itens' },
        { value: 50, label: '50 Itens' },
        { value: 100, label: '100 Itens' },
      ]"
      :classes="{
        wrapper: 'w-full bg-base-300 rounded-md p-2',
        input: 'w-full cursor-pointer',
      }"
      type="select"
    />
  </TableOptionContainer>
</template>
