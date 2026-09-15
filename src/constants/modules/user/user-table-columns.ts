import type { TableColumn } from '@/models/components/table/table-model'

export const USER_TABLE_COLUMNS: Array<TableColumn> = [
  {
    label: 'ID',
    value: 'id',
  },
  {
    label: 'Nome',
    value: 'nome_exibicao',
  },
  {
    label: 'Usuário',
    value: 'nome_usuario',
  },
  {
    label: 'Cargo',
    value: 'cargo',
  },
  {
    label: 'E-mail',
    value: 'email',
  },
  {
    label: 'Data de Nascimento',
    value: 'data_nascimento',
  },
  {
    label: 'Celular',
    value: 'numero_celular',
  },
  {
    label: 'Reputação',
    value: 'reputacao',
  },
]
