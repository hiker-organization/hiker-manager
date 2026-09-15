export interface UserListingResponse {
  id: number
  nome_usuario: string
  nome_exibicao: string
  email: string
  data_nascimento: string
  numero_celular: string
  foto_url: string | null
  reputacao: number
  cargo: 'ADM' | 'USER'
  bloqueado: boolean
}
