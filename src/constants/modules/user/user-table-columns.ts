import type { TableColumn } from '@/models/components/table/table-model'

export const USER_TABLE_COLUMNS: Array<TableColumn> = [
  { label: 'ID', value: 'id', type: 'text' },
  { label: 'Cargo', value: 'cargo', type: 'text' },
  { label: 'Usuário', value: 'nome_usuario', type: 'text' },
  { label: 'Nome', value: 'nome_exibicao', type: 'text' },
  { label: 'E-mail', value: 'email', type: 'text' },
  { label: 'Data de Nascimento', value: 'data_nascimento', type: 'date' },
  { label: 'Celular', value: 'numero_celular', type: 'text' },
  { label: 'Reputação', value: 'reputacao', type: 'text' },
  { label: 'Foto', value: 'foto_url', type: 'file' }, // Implementação futura.
  { label: 'Banido', value: 'banido', type: 'text' },
  { label: 'Bloqueado', value: 'bloqueado', type: 'text' },
  { label: 'Expiração do Bloqueio', value: 'bloqueado_ate', type: 'date' },
]
