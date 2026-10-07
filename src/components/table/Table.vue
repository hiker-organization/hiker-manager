<script setup lang="ts">
import type { Pagination } from '@/models/components/table/pagination-model'
import type { TableColumn, TableRow } from '@/models/components/table/table-model'
import { ref } from 'vue'
import { formatCellValue } from '@/utils/components/table/table-utils'

const props = defineProps<{
  columns: Array<TableColumn>
  rows: Array<TableRow>
  pagination?: Pagination
}>()

const emits = defineEmits<{
  (e: 'updateParams', params: Record<string, unknown>): void
}>()

const tableOptionsModalIsVisible = ref<boolean>(false)
</script>

<template>
  <div class="size-full flex flex-col gap-4">
    <div class="w-full flex items-center justify-end gap-4">
      <Button
        label="Opções"
        icon="lucide:table"
        @click="tableOptionsModalIsVisible = true"
      />
    </div>

    <table class="table table-zebra border rounded-md overflow-hidden">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.value"
            class="text-base-content font-bold"
          >
            {{ column.label }}
          </th>
          <th v-if="$slots['registerActions']" class="text-base-content font-bold">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex" class="relative">
          <td v-for="(column, cellIndex) in props.columns" :key="column.value" class="truncate">
            <slot v-if="cellIndex === 0" :data="row" name="registerLink" />

            <slot :name="column.value" :data="row">
              {{ formatCellValue(String(row[column.value]), column.type) }}
            </slot>
          </td>

          <td v-if="$slots['registerActions']">
            <Dropdown type="bottom">
              <slot name="registerActions" :data="row" />
            </Dropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      v-if="props.pagination"
      :pagination="props.pagination"
      @update-params="(params) => emits('updateParams', params)"
    />

    <Modal
      v-model:is-visible="tableOptionsModalIsVisible"
    >
      <div class="grid grid-cols-2">
        <TablePageLimit
          @update-params="(params) => emits('updateParams', params)"
        />
      </div>
    </Modal>
  </div>
</template>
