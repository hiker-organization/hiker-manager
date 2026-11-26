import type { TableColumn } from '@/models/components/table/table-model'

export const REPORT_ACTIVE_TABLE_COLUMNS = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Categoria', value: 'categoria', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Data de Criação', value: 'createdAt', type: 'date' },
  { label: 'ID do Autor', value: 'id_usuario', type: 'text' },
  { label: 'Autor', value: 'autor.nome_usuario', type: 'text' },
  { label: 'ID da Postagem', value: 'id_review', type: 'text' },
  { label: 'Postagem', value: 'review.descricao', type: 'text' },
] as const satisfies ReadonlyArray<TableColumn>

export const REPORT_CLOSED_TABLE_COLUMNS = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Categoria', value: 'categoria', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Data de Criação', value: 'createdAt', type: 'date' },
  { label: 'Decisão', value: 'decisao', type: 'text' },
  { label: 'Revisado em', value: 'revisado_em', type: 'date' },
  { label: 'Revisado por', value: 'revisor.nome_usuario', type: 'text' },
  { label: 'ID do Autor', value: 'id_usuario', type: 'text' },
  { label: 'Autor', value: 'autor.nome_usuario', type: 'text' },
  { label: 'ID da Postagem', value: 'id_review', type: 'text' },
  { label: 'Postagem', value: 'review.descricao', type: 'text' },
] as const satisfies ReadonlyArray<TableColumn>
