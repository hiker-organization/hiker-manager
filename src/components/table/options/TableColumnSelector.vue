<script setup lang="ts">
import type { TableColumn } from '@/models/components/table/table-model'
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  namespace: string
  allColumns: Array<TableColumn>
}>()

const emits = defineEmits<{
  (e: 'updateVisibleColumns', columns: Array<string>): void
}>()

const { notify } = useToast()

const columnSelectorModalIsVisible = ref<boolean>(false)

const visibleColumns = useStorage<Array<string>>(
  `${props.namespace}-visible-columns`,
  props.allColumns.map(column => column.value),
  localStorage,
)

function checkAllColumns() {
  visibleColumns.value = props.allColumns.map(column => column.value)
}

function uncheckAllColumns() {
  const currentVisibleColumns = visibleColumns.value

  // Ao menos uma é mantida para identificação.

  visibleColumns.value = currentVisibleColumns.filter((_column, index) => index === 0)

  notify.warning('Apenas uma coluna foi mantida.')
}

function toggleColumnVisibility(columnKey: string, event: Event) {
  const currentVisibleColumns = visibleColumns.value

  if (currentVisibleColumns.includes(columnKey)) {
    if (visibleColumns.value.length < 2) {
      notify.warning('Ao menos uma coluna precisa ser exibida.')

      event.preventDefault()

      return
    }

    visibleColumns.value = currentVisibleColumns.filter(column => column !== columnKey)

    return
  }

  currentVisibleColumns.push(columnKey)

  visibleColumns.value = currentVisibleColumns
}

watch(
  () => visibleColumns.value,
  (newVisibleColumns) => {
    emits('updateVisibleColumns', newVisibleColumns)
  },
  { immediate: true }
)
</script>

<template>
  <TableOptionContainer
    icon="lucide:columns-3"
    label="Exibição"
  >
    <Button
      :custom-class="[
        'bg-base-300'
      ]"
      :label="`Colunas (${visibleColumns.length})`"
      @click="columnSelectorModalIsVisible = !columnSelectorModalIsVisible"
    />

    <Modal
      v-model:is-visible="columnSelectorModalIsVisible"
      title="Seletor de Colunas"
      icon="lucide:columns-3-cog"
    >
      <div class="max-h-64 flex flex-col gap-2 overflow-x-hidden overflow-y-auto p-2">
        <div class="w-full grid grid-cols-2 gap-2">
          <Button
            label="Todas"
            icon="lucide:circle-check"
            custom-class="btn-success flex items-center justify-center gap-2 p-4"
            @click="checkAllColumns"
          />
          <Button
            label="Mínimo"
            icon="lucide:circle-x"
            custom-class="btn-warning flex items-center justify-center gap-2 p-4"
            @click="uncheckAllColumns"
          />
        </div>

        <div
          v-for="column in props.allColumns"
          :key="column.value"
          class="bg-base-200 flex items-center justify-between gap-2 p-2"
        >
          {{ column.label }}

          <input
            :checked="visibleColumns.includes(column.value)"
            class="toggle toggle-primary"
            type="checkbox"
            @click="toggleColumnVisibility(column.value, $event)"
          />
        </div>
      </div>
    </Modal>
  </TableOptionContainer>
</template>
