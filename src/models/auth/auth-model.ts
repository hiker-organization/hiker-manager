export interface LoginPayload {
  email: string
  password: string
}

export type SessionRole = 'USER' | 'ADM'

export interface SessionUser {
  id: number
  email: string
  cargo: SessionRole
  // URL assinada da foto de perfil (ausente nas versões da API anteriores a ela).
  foto_url?: string | null
}
