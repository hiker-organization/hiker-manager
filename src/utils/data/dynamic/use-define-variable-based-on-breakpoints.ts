import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

interface DefineVariableBasedOnBreakpointsOptions<T> {
  minValue: T
  values: Partial<Record<keyof typeof breakpointsTailwind, T>>
}

export function defineVariableBasedOnBreakpoints<T>(
  options: DefineVariableBasedOnBreakpointsOptions<T>,
) {
  const { minValue, values } = options

  const breakpoints = useBreakpoints(breakpointsTailwind)

  return computed<T>(() => {
    if (breakpoints.greaterOrEqual('2xl').value && values['2xl'] !== undefined) return values['2xl']

    if (breakpoints.greaterOrEqual('xl').value && values['xl'] !== undefined) return values['xl']

    if (breakpoints.greaterOrEqual('lg').value && values['lg'] !== undefined) return values['lg']

    if (breakpoints.greaterOrEqual('md').value && values['md'] !== undefined) return values['md']

    if (breakpoints.greaterOrEqual('sm').value && values['sm'] !== undefined) return values['sm']

    return minValue
  })
}
