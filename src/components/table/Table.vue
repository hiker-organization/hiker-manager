<script setup lang="ts" generic="TRow extends TableRow">
import type { Pagination } from '@/models/components/table/pagination-model'
import type { TableColumn, TableRow } from '@/models/components/table/table-model'
import { ref } from 'vue'
import { formatCellValue } from '@/utils/components/table/table-utils'

const props = defineProps<{
  namespace: string
  columns: Array<TableColumn>
  rows: Array<TRow>
  pagination?: Pagination
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const tableOptionsModalIsVisible = ref<boolean>(false)

const tableVisibleColumns = ref<Array<string>>([])
</script>

<template>
  <div class="max-size-full flex flex-col gap-4">
    <div class="w-full flex items-center justify-end gap-4">
      <Button label="Opções" icon="lucide:table" @click="tableOptionsModalIsVisible = true" />
    </div>

    <div class="w-full bg-base-300/50 rounded-xl p-4 overflow-x-auto overflow-y-hidden">
      <table class="table table-zebra max-w-full border rounded-md overflow-hidden">
        <thead>
          <tr>
            <th
              v-for="column in props.columns"
              v-show="tableVisibleColumns.includes(column.value)"
              :key="column.value"
              class="text-base-content font-bold"
            >
              {{ column.label }}
            </th>
            <th v-if="$slots['registerActions']" class="text-base-content font-bold">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
            <td
              v-for="column in props.columns"
              v-show="tableVisibleColumns.includes(column.value)"
              :key="column.value"
              class="truncate"
            >
              <slot :name="column.value" :data="row">
                {{ formatCellValue(String(row[column.value]), column.type) }}
              </slot>
            </td>

            <td>
              <slot name="registerActions" :data="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="props.pagination"
      :pagination="props.pagination"
      @update-params="(params) => emits('updateParams', params)"
    />

    <Modal
      v-model:is-visible="tableOptionsModalIsVisible"
      title="Opções da Tabela"
      icon="lucide:settings"
    >
      <div class="grid grid-cols-2 gap-4">
        <TableSortableFieldSelector
          v-if="props.pagination && props.pagination.sortable_fields"
          :namespace="props.namespace"
          :all-columns="props.columns"
          :sortable-fields="props.pagination.sortable_fields"
          @update-params="(params) => emits('updateParams', params)"
        />

        <TableSortSense
          v-if="props.pagination && props.pagination.sortable_fields"
          :namespace="props.namespace"
          @update-params="(params) => emits('updateParams', params)"
        />

        <TablePageLimit
          :namespace="props.namespace"
          @update-params="(params) => emits('updateParams', params)"
        />

        <TableColumnSelector
          :namespace="props.namespace"
          :all-columns="props.columns"
          @update-visible-columns="(columns) => (tableVisibleColumns = columns)"
        />
      </div>
    </Modal>
  </div>
</template>
