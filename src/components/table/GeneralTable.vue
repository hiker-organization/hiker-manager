<script setup lang="ts">
import type { TableColumn, TableRow } from '@/models/components/table/table-model'
import { pseudoColumns, pseudoRows } from '@/constants/table/table-pseudo-data'

const props = withDefaults(
  defineProps<{
    columns: Array<TableColumn>
    rows: Array<TableRow>
  }>(),
  {
    columns: () => [...pseudoColumns],
    rows: () => [...pseudoRows],
  },
)
</script>

<template>
  <div class="h-full w-full border rounded-md overflow-x-hidden overflow-y-auto">
    <table class="table table-fixed table-zebra">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.value"
            class="text-base-content font-bold"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in props.rows" :key="index">
          <td v-for="column in props.columns" :key="column.value">
            {{ row[column.value] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
