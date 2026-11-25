import type { TableColumn } from '@/models/components/table/table-model'

export const AUTO_BLOCKED_REVIEW_PENDING_TABLE_COLUMNS = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Data de Criação', value: 'createdAt', type: 'date' },
  { label: 'Probabilidade', value: 'classificacao.probabilidade', type: 'percentage' },
  { label: 'Autor', value: 'autor.nome_usuario', type: 'text' },
  { label: 'Local', value: 'lugar.nome', type: 'text' },
  { label: 'Cidade', value: 'lugar.cidade', type: 'text' },
  { label: 'Estado (UF)', value: 'lugar.sigla_estado', type: 'text' },
  { label: 'Versão do Modelo', value: 'classificacao.modelo_versao', type: 'text' },
] as const satisfies ReadonlyArray<TableColumn>

export const AUTO_BLOCKED_REVIEW_REVIEWED_TABLE_COLUMNS = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Data de Criação', value: 'createdAt', type: 'date' },
  { label: 'Probabilidade', value: 'classificacao.probabilidade', type: 'percentage' },
  { label: 'Decisão', value: 'classificacao.decisao_admin', type: 'text' },
  { label: 'Revisado em', value: 'classificacao.revisado_em', type: 'date' },
  { label: 'Revisado por', value: 'classificacao.revisor.nome_usuario', type: 'text' },
  { label: 'Autor', value: 'autor.nome_usuario', type: 'text' },
  { label: 'Local', value: 'lugar.nome', type: 'text' },
  { label: 'Cidade', value: 'lugar.cidade', type: 'text' },
  { label: 'Estado (UF)', value: 'lugar.sigla_estado', type: 'text' },
  { label: 'Versão do Modelo', value: 'classificacao.modelo_versao', type: 'text' },
] as const satisfies ReadonlyArray<TableColumn>
