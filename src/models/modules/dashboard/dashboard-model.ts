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

export interface ReviewsModuleSummaryResponse {
  totalReviews: number
  common: {
    percentage: number
    count: number
  }
  blocked: {
    percentage: number
    count: number
  }
  reported: {
    percentage: number
    count: number
  }
}
