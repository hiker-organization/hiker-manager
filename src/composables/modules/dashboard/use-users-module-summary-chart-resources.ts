import type { ApexOptions } from 'apexcharts'
import type { UsersModuleSummaryResponse } from '@/models/modules/dashboard/dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/modules/dashboard/dashboard-store'

export function useUsersModuleSummaryChartResources() {
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

  const usersModuleSummaryChartSeries = computed<Array<number>>(() => [
    usersModuleSummaryResponse.value.common.count,
    usersModuleSummaryResponse.value.blocked.count,
    usersModuleSummaryResponse.value.banned.count,
  ])

  const usersModuleSummaryChartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: 'donut',
      width: '100%',
      height: '100%',
      background: 'var(--color-base-200)',
      foreColor: 'var(--color-base-content)',
    },
    labels: [
      `Comuns (${usersModuleSummaryResponse.value.common.percentage}%)`,
      `Bloqueados (${usersModuleSummaryResponse.value.blocked.percentage}%)`,
      `Banidos (${usersModuleSummaryResponse.value.banned.percentage}%)`,
    ],
    colors: ['var(--color-info)', 'var(--color-warning)', 'var(--color-error)'],
    plotOptions: {
      pie: {
        borderRadius: 2,
        spacing: 5,
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '24px',
              color: 'var(--color-primary)',
            },
            value: {
              fontSize: '24px',
              fontWeight: '800',
            },
          },
        },
      },
    },
    stroke: {
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
      fontSize: '16px',
    },
    title: {
      text: 'Índice de Usuários',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    },
  }))

  onMounted(async () => {
    const { data, statusCode } = await dashboardStore.getUsersModuleSummary({}, {})

    if (statusCode.value === 200 && data.value) {
      usersModuleSummaryResponse.value = data.value
    }
  })

  return {
    usersModuleSummaryChartSeries,
    usersModuleSummaryChartOptions,
  }
}
