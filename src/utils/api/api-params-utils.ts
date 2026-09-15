import type { QueryParams, RouteParams } from "@/models/api/api-model"

function generateEndpointWithQueryParams(endpoint: string, queryParams: QueryParams) {
  return `${endpoint}?${new URLSearchParams(queryParams)}`
}

function generateEndpointWithRouteParams(endpoint: string, routeParams: RouteParams) {
  let fullEndpoint = endpoint

  Object.entries(routeParams).forEach(([param, value]) => {
    fullEndpoint = fullEndpoint.replace(param, value)
  })

  return fullEndpoint
}

function generateFullEndpoint(endpoint: string, queryParams: QueryParams, routeParams: RouteParams) {
  const endpointWithQueryParams = generateEndpointWithQueryParams(endpoint, queryParams)

  return generateEndpointWithRouteParams(endpointWithQueryParams, routeParams)
}

export {
  generateEndpointWithQueryParams,
  generateEndpointWithRouteParams,
  generateFullEndpoint,
}
