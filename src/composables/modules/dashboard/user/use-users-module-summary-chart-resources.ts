import type { ApexOptions } from 'apexcharts'
import type { UsersModuleSummaryResponse } from '@/models/modules/dashboard/user/users-dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'
import { generateNormalizedPercentsGroup } from '@/utils/data/formatting/percentage-normalization-utils'

export function useUsersModuleSummaryChartResources() {
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

  const usersModuleSummaryChartPercentages = computed<{
    common: number
    blocked: number
    banned: number
  }>(() => {
    const percentages = generateNormalizedPercentsGroup([
      usersModuleSummaryResponse.value.common.percentage,
      usersModuleSummaryResponse.value.blocked.percentage,
      usersModuleSummaryResponse.value.banned.percentage,
    ])

    return {
      common: percentages[0] || 0,
      blocked: percentages[1] || 0,
      banned: percentages[2] || 0,
    }
  })

  const usersModuleSummaryChartSeries = computed<Array<number>>(() => [
    usersModuleSummaryResponse.value.common.count,
    usersModuleSummaryResponse.value.blocked.count,
    usersModuleSummaryResponse.value.banned.count,
  ])

  const usersModuleSummaryChartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: 'pie',
      width: '100%',
      height: '100%',
      foreColor: 'var(--color-base-content)',
    },
    title: {
      text: 'Distribuição de Usuários',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    },
    stroke: {
      width: 2,
    },
    legend: {
      show: false,
    },
    labels: [
      `Válidos (${usersModuleSummaryChartPercentages.value.common}%)`,
      `Bloqueados (${usersModuleSummaryChartPercentages.value.blocked}%)`,
      `Banidos (${usersModuleSummaryChartPercentages.value.banned}%)`,
    ],
    colors: ['var(--color-success)', 'var(--color-warning)', 'var(--color-error)'],
    plotOptions: {
      pie: {
        dataLabels: {
          external: {
            show: true,
            fontSize: '16px',
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  }))

  onMounted(async () => {
    const { data, statusCode } = await usersDashboardStore.getUsersModuleSummary({}, {})

    if (statusCode.value === 200 && data.value) {
      usersModuleSummaryResponse.value = data.value
    }
  })

  return {
    usersModuleSummaryChartSeries,
    usersModuleSummaryChartOptions,
  }
}
