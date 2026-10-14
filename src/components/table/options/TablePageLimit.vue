<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

const props = defineProps<{
  namespace: string
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const currentLimit = useStorage<number>(`${props.namespace}-limit`, 10, localStorage)

const didInitialSync = ref<boolean>(false)

watch(
  () => currentLimit.value,
  (newLimit: number) => {
    // Se não for a primeira execução, reseta a página.

    if (didInitialSync.value) {
      emits('updateParams', {
        limit: newLimit,
        page: 1,
      })

      return
    }

    emits('updateParams', {
      limit: newLimit,
    })

    didInitialSync.value = true
  },
  { immediate: true },
)
</script>

<template>
  <TableOptionContainer label="Listagem" icon="lucide:list">
    <Input
      v-model="currentLimit"
      :options="[
        { value: 1, label: '1 Item' },
        { value: 10, label: '10 Itens' },
        { value: 20, label: '20 Itens' },
        { value: 50, label: '50 Itens' },
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
