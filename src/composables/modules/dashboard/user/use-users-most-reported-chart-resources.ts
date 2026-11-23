import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'
import type { UserMostReported } from '@/models/modules/dashboard/user/users-dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'
import { useThemeStore } from '@/stores/core/theme-store'

export function useUsersMostReportedChartResources() {
  const usersDashboardStore = useUsersDashboardStore()

  const themeStore = useThemeStore()

  const usersMostReportedResponse = ref<Array<UserMostReported>>([])

  const usersMostReportedChartCategories = computed<Array<string>>(() => {
    return usersMostReportedResponse.value.map((user) => user.nome_usuario)
  })

  const usersMostReportedChartSeriesData = computed<Array<number>>(() => {
    return usersMostReportedResponse.value.map((user) => user.denuncias)
  })

  const usersMostReportedChartSeries = computed<ApexAxisChartSeries>(() => {
    return [
      {
        name: 'Postagens Denunciadas',
        data: usersMostReportedChartSeriesData.value,
      },
    ]
  })

  const usersMostReportedChartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: 'bar',
      width: '100%',
      height: '100%',
      foreColor: 'var(--color-base-content)',
      toolbar: {
        show: false,
      },
    },
    title: {
      text: 'Usuários com Mais Postagens Denunciadas',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    },
    xaxis: {
      categories: usersMostReportedChartCategories.value,
      min: 0,
      tickAmount: Math.max(...usersMostReportedChartSeriesData.value) + 1,
      axisBorder: {
        color: 'var(--color-base-content)',
      },
      axisTicks: {
        color: 'var(--color-base-content)',
      },
      labels: {
        style: {
          fontSize: '16px',
        },
        formatter: (value: number) => {
          return String(Math.round(value))
        },
      },
    },
    yaxis: {
      axisBorder: {
        color: 'var(--color-base-content)',
      },
      axisTicks: {
        color: 'var(--color-base-content)',
      },
      labels: {
        style: {
          fontSize: '16px',
        },
      },
    },
    stroke: {
      width: 2,
    },
    legend: {
      show: false,
    },
    colors: ['var(--color-primary)'],
    plotOptions: {
      bar: {
        barHeight: '55%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      offsetX: 10,
      style: {
        colors: ['var(--color-base-content)'],
        fontSize: '16px',
        fontWeight: 600,
      },
    },
    tooltip: {
      theme: themeStore.currentTheme,
    },
    grid: {
      show: false,
    },
  }))

  onMounted(async () => {
    const { data, statusCode } = await usersDashboardStore.getUsersMostReported({}, {})

    if (statusCode.value === 200 && data.value) {
      usersMostReportedResponse.value = data.value.data
    }
  })

  return {
    usersMostReportedChartSeries,
    usersMostReportedChartOptions,
  }
}
