import type { TableColumn } from '@/models/components/table/table-model'

export const REPORT_TABLE_COLUMNS: Array<TableColumn> = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Categoria', value: 'categoria', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Data de Criação', value: 'createdAt', type: 'date' },
  { label: 'Status', value: 'status', type: 'text' },
  { label: 'ID do Autor', value: 'id_usuario', type: 'text' },
  { label: 'Autor', value: 'autor.nome_usuario', type: 'text' },
  { label: 'ID da Postagem', value: 'id_review', type: 'text' },
  { label: 'Postagem', value: 'review.descricao', type: 'text' },
]
