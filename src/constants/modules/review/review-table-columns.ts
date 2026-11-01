import type { TableColumn } from "@/models/components/table/table-model"

export const REVIEW_TABLE_COLUMNS: Array<TableColumn> = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Descrição', value: 'descricao', type: 'text' },
  { label: 'Data de Criação', value: 'createdAt', type: 'date' },
  { label: 'Denúncias Efetuadas', value: 'qnt_denuncia', type: 'text' },
  { label: 'Autor', value: 'autor.nome_usuario', type: 'text' },
  { label: 'Local', value: 'lugar.nome', type: 'text' },
  { label: 'Cidade', value: 'lugar.cidade', type: 'text' },
  { label: 'Estado (UF)', value: 'lugar.sigla_estado', type: 'text' },
]
