import type { UsersModuleSummaryResponse } from '@/models/modules/dashboard/dashboard-model'
import { onMounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/modules/dashboard/dashboard-store'

export function useUsersModuleSummaryCardsResources() {
  const dashboardStore = useDashboardStore()

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

  onMounted(async () => {
    const { data, statusCode } = await dashboardStore.getUsersModuleSummary({}, {})

    if (statusCode.value === 200 && data.value) {
      usersModuleSummaryResponse.value = data.value
    }
  })

  return {
    usersModuleSummaryResponse,
  }
}
