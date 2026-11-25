import type { ApexOptions } from 'apexcharts'
import type { UsersModuleSummaryResponse } from '@/models/modules/dashboard/user/users-dashboard-model'
import Decimal from 'decimal.js'
import { computed, onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'
import { generateNormalizedPercentsGroup } from '@/utils/data/formatting/percentage-normalization-utils'
import { defineVariableBasedOnBreakpoints } from '@/utils/data/dynamic/use-define-variable-based-on-breakpoints'

export function useUsersModuleSummaryChartResources() {
  const usersDashboardStore = useUsersDashboardStore()

  const chartVisualResourcesScale = defineVariableBasedOnBreakpoints<number>({
    minValue: 0.7,
    values: {
      lg: 1,
    },
  })

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
    common: Decimal
    blocked: Decimal
    banned: Decimal
  }>(() => {
    const percentages = generateNormalizedPercentsGroup([
      usersModuleSummaryResponse.value.common.percentage,
      usersModuleSummaryResponse.value.blocked.percentage,
      usersModuleSummaryResponse.value.banned.percentage,
    ])

    return {
      common: percentages[0] || Decimal('0'),
      blocked: percentages[1] || Decimal('0'),
      banned: percentages[2] || Decimal('0'),
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
        fontSize: `${20 * chartVisualResourcesScale.value}px`,
      },
    },
    stroke: {
      width: 2,
    },
    legend: {
      show: true,
      position: 'bottom',
      customLegendItems: ['Válidos', 'Bloqueados', 'Banidos'],
      fontSize: `${16 * chartVisualResourcesScale.value}px`,
    },
    labels: [
      `${usersModuleSummaryChartPercentages.value.common}%`,
      `${usersModuleSummaryChartPercentages.value.blocked}%`,
      `${usersModuleSummaryChartPercentages.value.banned}%`,
    ],
    colors: ['var(--color-success)', 'var(--color-warning)', 'var(--color-error)'],
    plotOptions: {
      pie: {
        dataLabels: {
          external: {
            show: true,
            fontSize: `${16 * chartVisualResourcesScale.value}px`,
            connector: {
              gap: 30 * chartVisualResourcesScale.value,
            },
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
