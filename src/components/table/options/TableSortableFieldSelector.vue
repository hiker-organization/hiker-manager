<script setup lang="ts">
import type { TableColumn } from '@/models/components/table/table-model'
import { computed, onMounted, ref, watch } from 'vue'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

type SortOption = { value: string, label: string }

const props = defineProps<{
  namespace: string
  allColumns: Array<TableColumn>
  sortableFields: Array<string>
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const sortOptions = computed<Array<SortOption>>(() => {
  return props.allColumns
    .filter(column => props.sortableFields.includes(column.value))
    .map(column => ({
      value: column.value,
      label: column.label
    }))
})

const currentSortableField = ref<string | null>(null)

const didInitialSync = ref<boolean>(false)

const { currentNamespaceQueryParams } = useUrlParamsManager({
  namespace: props.namespace,
})

watch(
  () => currentSortableField.value,
  (newSortableField: string | null) => {
    // Se não for a primeira execução, reseta a página.

    if (didInitialSync.value) {
      emits('updateParams', {
        sortBy: newSortableField,
        page: 1,
      })

      return
    }

    emits('updateParams', {
      sortBy: newSortableField,
    })

    didInitialSync.value = true
  },
)

watch(
  () => sortOptions.value,
  (newSortOptions: Array<SortOption>, oldSortOptions: Array<SortOption>) => {
    // Aplica a primeira opção como padrão, caso ainda não esteja definido.

    if (currentNamespaceQueryParams.value.sortBy) {
      return
    }

    if (oldSortOptions.length > 0) {
      return
    }

    currentSortableField.value = (newSortOptions[0]) ? newSortOptions[0].value : null
  },
)

onMounted(() => {
  currentSortableField.value = (currentNamespaceQueryParams.value.sortBy)
    ? String(currentNamespaceQueryParams.value.sortBy)
    : null
})
</script>

<template>
  <TableOptionContainer
    icon="lucide:list-ordered"
    label="Ordenação"
  >
    <Input
      v-model="currentSortableField"
      :options="sortOptions"
      :classes="{
        wrapper: 'w-full bg-base-300 rounded-md p-2',
        input: 'w-full cursor-pointer',
        option: 'bg-base-100',
      }"
      type="select"
    />
  </TableOptionContainer>
</template>
