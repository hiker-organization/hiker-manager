<script setup lang="ts">
import type { Pagination } from '@/models/components/table/pagination-model'
import type { TableColumn, TableRow } from '@/models/components/table/table-model'
import { formatCellValue } from '@/utils/components/table/table-utils'

const props = defineProps<{
  columns: Array<TableColumn>
  rows: Array<TableRow>
  pagination?: Pagination
}>()
</script>

<template>
  <div class="size-full flex flex-col gap-4">
    <table class="table table-zebra border rounded-md overflow-auto">
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
        <tr v-for="(row, index) in props.rows" :key="index">
          <td
            v-for="column in props.columns"
            :key="column.value"
            :title="formatCellValue(String(row[column.value]), column.type)"
            class="truncate"
          >
            <slot :name="column.value" :data="row">
              {{ formatCellValue(String(row[column.value]), column.type) }}
            </slot>
          </td>
          <td v-if="$slots['registerActions']">
            <GeneralDropdown type="bottom">
              <slot name="registerActions" :data="row" />
            </GeneralDropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <GeneralPagination v-if="props.pagination" :pagination="props.pagination" />
  </div>
</template>
