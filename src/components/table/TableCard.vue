<script
  setup
  lang="ts"
  generic="TRow extends TableRow, TColumns extends ReadonlyArray<TableColumn>"
>
import type { TableColumn, TableRow } from '@/models/components/table/table-model'

// Estrutura das Props.

interface TableCardProps {
  columns: TColumns
  register: TRow
  visibleColumns: Array<string>
}

// Extraindo o valor da propriedade "value" de cada coluna.

type TableColumnsKeys = TColumns[number]['value']

// Props.

const props = defineProps<TableCardProps>()

// Slots.

defineSlots<
  {
    cardTitle(): void
    registerActions(): void
  } & Record<TableColumnsKeys, () => void> &
    Record<string, (props: Record<string, unknown>) => void> // Slots genéricos.
>()
</script>

<template>
  <div class="bg-base-300 flex flex-col items-stretch justify-start rounded-lg">
    <header class="bg-primary flex items-center justify-center gap-2 rounded-t-lg p-2">
      <slot name="cardTitle" :data="props.register"> Título do Card </slot>
    </header>
    <main class="flex flex-col items-stretch justify-start gap-2 p-2">
      <div
        v-for="column in props.columns"
        v-show="props.visibleColumns.includes(column.value)"
        :key="column.value"
        class="w-full bg-base-200 flex items-center justify-start gap-2 border border-base-content/20 rounded-md p-2 whitespace-nowrap"
      >
        <p class="font-bold">{{ column.label }}:</p>

        <slot :name="column.value" />
      </div>
    </main>
    <footer v-if="$slots['registerActions']" class="w-full px-2 pb-2">
      <slot name="registerActions" />
    </footer>
  </div>
</template>
