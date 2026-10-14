export interface User {
  id?: number
  cargo: 'ADM' | 'USER'
  nome_usuario: string
  nome_exibicao: string
  email: string
  data_nascimento: string | null
  numero_celular: string
  reputacao: number
  foto_url: string | null
  banido: boolean
  bloqueado: boolean
  bloqueado_ate: string | null
}

export interface UserBlockingParameters {
  data: string
}
