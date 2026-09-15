export interface PaginatedResponse<T> {
  data: Array<T>
  meta: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}
