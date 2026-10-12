export interface Pagination {
  page: number
  limit: number
  total: number
  total_pages: number
  sortable_fields?: Array<string>
}
