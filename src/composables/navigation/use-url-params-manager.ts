import { computed, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface UseUrlParamsManagerOptions {
  namespace: string
  onNamespaceQueryParamsChange?: () => Promise<void>
  immediate?: boolean
}

export function useUrlParamsManager(options: UseUrlParamsManagerOptions) {
  const { namespace, onNamespaceQueryParamsChange, immediate = false } = options

  const router = useRouter()

  const route = useRoute()

  let reloadQueue: Promise<void> = Promise.resolve()

  const allRouteParams = computed<Record<string, unknown>>(() => {
    return Object.entries(route.params).reduce<Record<string, unknown>>(
      (accumulator, [key, value]) => {
        accumulator[key] = value

        return accumulator
      },
      {},
    )
  })

  const allQueryParams = computed<Record<string, unknown>>(() => {
    return Object.entries(route.query).reduce<Record<string, unknown>>(
      (accumulator, [key, value]) => {
        accumulator[key] = value

        return accumulator
      },
      {},
    )
  })

  const currentNamespaceQueryParams = computed<Record<string, unknown>>(() => {
    return Object.entries(allQueryParams.value).reduce<Record<string, unknown>>(
      (accumulator, [key, value]) => {
        if (key.includes(namespace)) {
          const keyWithoutNamespace = key.replace(`${namespace}[`, '').replace(']', '')

          accumulator[keyWithoutNamespace] = value
        }

        return accumulator
      },
      {},
    )
  })

  async function setNamespaceQueryParams(newQueryParams: Record<string, unknown>) {
    reloadQueue = reloadQueue.then(async () => {
      const invalidOptions = ['undefined', 'null', '']

      const queryParamsWithNamespace = Object.entries(newQueryParams).reduce<
        Record<string, string>
      >((accumulator, [key, value]) => {
        const normalizedValue = String(value).trim()

        if (!invalidOptions.includes(normalizedValue)) {
          const keyWithNamespace = `${namespace}[${key}]`

          accumulator[keyWithNamespace] = normalizedValue
        }

        return accumulator
      }, {})

      await router.replace({
        name: route.name,
        params: route.params,
        query: {
          ...route.query,
          ...queryParamsWithNamespace,
        },
      })
    })

    await reloadQueue
  }

  watch(
    () => JSON.stringify(currentNamespaceQueryParams.value),
    async () => {
      if (!onNamespaceQueryParamsChange) {
        return
      }

      await nextTick()

      await onNamespaceQueryParamsChange()
    },
    {
      immediate: immediate,
      deep: true,
      flush: 'post',
    },
  )

  return {
    allQueryParams,
    allRouteParams,
    currentNamespaceQueryParams,
    setNamespaceQueryParams,
  }
}
