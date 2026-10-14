import type { RouteLocationNamedRaw } from 'vue-router'

export interface RouteTab {
  label: string
  icon: string
  route: RouteLocationNamedRaw
  isVisible: boolean
}
