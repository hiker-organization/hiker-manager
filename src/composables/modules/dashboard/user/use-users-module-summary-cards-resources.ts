import type { UsersModuleSummaryResponse } from '@/models/modules/dashboard/user/users-dashboard-model'
import { onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'

export function useUsersModuleSummaryCardsResources() {
  const usersDashboardStore = useUsersDashboardStore()

  const usersModuleSummaryResponse = ref<UsersModuleSummaryResponse>({
    totalUsers: 0,
    common: {
      percentage: 0,
      count: 0,
    },
    blocked: {
      percentage: 0,
      count: 0,
    },
    banned: {
      percentage: 0,
      count: 0,
    },
  })

  // Começa verdadeiro, pois a busca é disparada ao montar o componente.

  const isLoading = ref<boolean>(true)

  onMounted(async () => {
    const { data, statusCode } = await usersDashboardStore.getUsersModuleSummary({}, {})

    isLoading.value = false

    if (statusCode.value === 200 && data.value) {
      usersModuleSummaryResponse.value = data.value
    }
  })

  return {
    isLoading,
    usersModuleSummaryResponse,
  }
}
