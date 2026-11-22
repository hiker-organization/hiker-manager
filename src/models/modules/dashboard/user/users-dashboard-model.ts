export interface UsersModuleSummaryResponse {
  totalUsers: number
  common: {
    percentage: number
    count: number
  }
  blocked: {
    percentage: number
    count: number
  }
  banned: {
    percentage: number
    count: number
  }
}

export interface UserWithBlockedReviews {
  id?: number
  nome_usuario: string
  nome_exibicao: string
  email: string
  reputacao: number
  createdAt: string
  bloqueado: boolean
  banido: boolean
  blocked_reviews: number
}
