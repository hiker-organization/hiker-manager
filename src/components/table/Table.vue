<script
  setup
  lang="ts"
  generic="TRow extends TableRow, TColumns extends ReadonlyArray<TableColumn>"
>
import type { Pagination } from '@/models/components/table/pagination-model'
import type { TableColumn, TableRow } from '@/models/components/table/table-model'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { extractFinalValue } from '@/utils/data/formatting/data-extraction-utils'
import { formatCellValue } from '@/utils/components/table/table-utils'

// Estrutura das Props.

interface TableProps {
  namespace: string
  columns: TColumns
  rows: Array<TRow>
  pagination?: Pagination
  extraSlots?: Array<string>
  isLoading?: boolean
}

// Extraindo o valor da propriedade "value" de cada coluna.

type TableColumnsKeys = TColumns[number]['value']

// Props.

const props = defineProps<TableProps>()

// Emits.

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

// Slots.

defineSlots<
  {
    cardTitle(props: { data: TRow }): void
    registerActions(props: { data: TRow }): void
    extraTableHeaderActions(): void
  } & Record<TableColumnsKeys, (props: { data: TRow }) => void> &
    Record<string, (props: Record<string, unknown>) => void> // Slots genéricos.
>()

// Variáveis.

const tableOptionsModalIsVisible = ref<boolean>(false)

const tableVisibleColumns = ref<Array<string>>([])

// Quantidade de linhas e cards exibidos enquanto os dados carregam.

const SKELETON_ROWS: number = 5

const SKELETON_CARDS: number = 3

// Funções.

function prepareCellValue(row: TRow, column: TableColumn): unknown {
  const finalValue = extractFinalValue(row, column.value)

  return formatCellValue(finalValue, column.type)
}
</script>

<template>
  <div class="max-size-full flex flex-col gap-4">
    <div class="w-full flex items-center justify-end gap-4">
      <slot name="extraTableHeaderActions" />

      <Button label="Opções" icon="lucide:table" @click="tableOptionsModalIsVisible = true" />
    </div>

    <div
      class="hidden w-full bg-base-300/50 rounded-xl p-4 overflow-x-auto overflow-y-hidden md:block"
    >
      <table
        v-if="props.isLoading || props.rows.length > 0"
        class="table table-zebra max-w-full border rounded-md overflow-hidden"
      >
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

        <tbody v-if="props.isLoading">
          <tr v-for="skeletonRow in SKELETON_ROWS" :key="skeletonRow">
            <td
              v-for="column in props.columns"
              v-show="tableVisibleColumns.includes(column.value)"
              :key="column.value"
            >
              <div class="skeleton h-4 w-full min-w-16"></div>
            </td>

            <td>
              <div v-if="$slots['registerActions']" class="skeleton h-10 w-24"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
            <td
              v-for="column in props.columns"
              v-show="tableVisibleColumns.includes(column.value)"
              :key="column.value"
              class="truncate"
            >
              <slot :name="column.value" :data="row">
                <span class="truncate">{{ prepareCellValue(row, column) }}</span>
              </slot>
            </td>

            <td>
              <slot name="registerActions" :data="row" />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="flex items-center justify-start gap-2">
        <Icon icon="lucide:info" />
        Nenhum registro encontrado.
      </div>
    </div>

    <div
      v-if="props.isLoading"
      class="w-full flex flex-col items-stretch justify-start gap-4 md:hidden"
    >
      <div
        v-for="skeletonCard in SKELETON_CARDS"
        :key="skeletonCard"
        class="skeleton h-40 w-full rounded-xl"
      ></div>
    </div>
    <div
      v-else-if="props.rows.length > 0"
      class="w-full bg-transparent flex flex-col items-stretch justify-start gap-4 rounded-xl md:hidden"
    >
      <TableCard
        v-for="(row, rowIndex) in props.rows"
        :key="rowIndex"
        :columns="props.columns"
        :register="row"
        :visible-columns="tableVisibleColumns"
      >
        <template #cardTitle>
          <slot name="cardTitle" :data="row" />
        </template>

        <template v-for="column in props.columns" :key="column.value" #[column.value]>
          <slot :name="column.value" :data="row">
            <span class="truncate">{{ prepareCellValue(row, column) }}</span>
          </slot>
        </template>

        <template #registerActions>
          <slot name="registerActions" :data="row" />
        </template>
      </TableCard>
    </div>
    <div
      v-else
      class="w-full bg-base-300/50 flex items-center justify-start gap-2 rounded-xl p-4 overflow-x-auto overflow-y-hidden md:hidden"
    >
      <Icon icon="lucide:info" />
      Nenhum registro encontrado.
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
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TableSortableFieldSelector
          v-if="
            props.pagination &&
            props.pagination.sortable_fields &&
            props.pagination.sortable_fields?.length > 0
          "
          :namespace="props.namespace"
          :all-columns="props.columns"
          :sortable-fields="props.pagination.sortable_fields"
          @update-params="(params) => emits('updateParams', params)"
        />

        <TableSortSense
          v-if="
            props.pagination &&
            props.pagination.sortable_fields &&
            props.pagination.sortable_fields.length > 0
          "
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

        <slot v-for="slotName in props.extraSlots" :key="slotName" :name="slotName" />
      </div>
    </Modal>
  </div>
</template>
