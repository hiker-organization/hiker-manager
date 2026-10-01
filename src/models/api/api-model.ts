import type { Pagination } from '@/models/components/table/pagination-model'

export type QueryParams = Record<string, string>

export type RouteParams = Record<string, string>

export interface ApiReponse<T> {
  data: T
}

export interface PaginatedResponse<T> {
  data: Array<T>
  meta: Pagination
}
