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
