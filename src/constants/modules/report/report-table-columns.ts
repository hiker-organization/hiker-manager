import type { TableColumn } from '@/models/components/table/table-model'

export const REPORT_TABLE_COLUMNS: Array<TableColumn> = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Categoria', value: 'categoria', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Status', value: 'status', type: 'text' },
]
