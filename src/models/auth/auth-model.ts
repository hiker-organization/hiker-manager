export interface LoginPayload {
  email: string
  password: string
}

export type SessionRole = 'USER' | 'ADM'

export interface SessionUser {
  id: number
  email: string
  cargo: SessionRole
}
