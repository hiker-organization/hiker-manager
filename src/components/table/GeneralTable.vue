<script setup lang="ts">
import type { TableColumn, TableRow } from '@/models/components/table/table-model'
import { formatCellValue } from '@/utils/components/table/table-utils'

const props = defineProps<{
  columns: Array<TableColumn>
  rows: Array<TableRow>
}>()
</script>

<template>
  <div class="h-full w-full border rounded-md overflow-x-hidden overflow-y-auto">
    <table class="table table-zebra">
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
            <GeneralBadge v-if="column.type === 'boolean'" :value="Boolean(row[column.value])" />
            <span v-else>
              {{ formatCellValue(String(row[column.value]), column.type) }}
            </span>
          </td>
          <td v-if="$slots['registerActions']">
            <GeneralDropdown type="left">
              <slot name="registerActions" :data="row" />
            </GeneralDropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
