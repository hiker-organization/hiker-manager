import type { QueryParams, RouteParams } from '@/models/api/api-model'

function generateEndpointWithQueryParams(endpoint: string, queryParams: QueryParams) {
  const normalizedQueryParams = Object.entries(queryParams).reduce<Record<string, string>>(
    (accumulator, [key, value]) => {
      accumulator[key] = String(value)

      return accumulator
    },
    {},
  )

  return `${endpoint}?${new URLSearchParams(normalizedQueryParams)}`
}

function generateEndpointWithRouteParams(endpoint: string, routeParams: RouteParams) {
  let fullEndpoint = endpoint

  const normalizedRouteParams = Object.entries(routeParams).reduce<Record<string, string>>(
    (accumulator, [key, value]) => {
      accumulator[key] = String(value)

      return accumulator
    },
    {},
  )

  Object.entries(normalizedRouteParams).forEach(([param, value]) => {
    fullEndpoint = fullEndpoint.replace(`:${param}`, String(value))
  })

  return fullEndpoint
}

function generateFullEndpoint(
  endpoint: string,
  queryParams: QueryParams,
  routeParams: RouteParams,
) {
  const endpointWithQueryParams = generateEndpointWithQueryParams(endpoint, queryParams)

  return generateEndpointWithRouteParams(endpointWithQueryParams, routeParams)
}

export { generateEndpointWithQueryParams, generateEndpointWithRouteParams, generateFullEndpoint }
