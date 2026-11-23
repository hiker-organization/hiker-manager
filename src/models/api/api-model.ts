import type { Pagination } from '@/models/components/table/pagination-model'

export type QueryParams = Record<string, unknown>

export type RouteParams = Record<string, unknown>

export interface ApiResponse<T> {
  data: T
}

export interface PaginatedResponse<T> {
  data: Array<T>
  meta: Pagination
}
