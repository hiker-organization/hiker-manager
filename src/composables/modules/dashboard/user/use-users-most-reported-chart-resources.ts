import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'
import type { UserMostReported } from '@/models/modules/dashboard/user/users-dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'
import { useThemeStore } from '@/stores/core/theme-store'
import { defineVariableBasedOnBreakpoints } from '@/utils/data/dynamic/use-define-variable-based-on-breakpoints'

export function useUsersMostReportedChartResources() {
  const usersDashboardStore = useUsersDashboardStore()

  const themeStore = useThemeStore()

  const chartVisualResourcesScale = defineVariableBasedOnBreakpoints<number>({
    minValue: 0.7,
    values: {
      lg: 1,
    },
  })

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
      text: 'Usuários com mais Denúncias',
      align: 'center',
      style: {
        fontSize: `${20 * chartVisualResourcesScale.value}px`,
      },
    },
    xaxis: {
      categories: usersMostReportedChartCategories.value,
      axisBorder: {
        color: 'var(--color-base-content)',
      },
      axisTicks: {
        color: 'var(--color-base-content)',
      },
      labels: {
        style: {
          fontSize: `${12 * chartVisualResourcesScale.value}px`,
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: Math.max(...usersMostReportedChartSeriesData.value),
      axisBorder: {
        color: 'var(--color-base-content)',
      },
      axisTicks: {
        color: 'var(--color-base-content)',
      },
      labels: {
        style: {
          fontSize: `${12 * chartVisualResourcesScale.value}px`,
        },
        formatter: (value: number) => {
          return String(Math.round(value))
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
        barHeight: '65%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      style: {
        colors: ['var(--color-base-content)'],
        fontSize: `${12 * chartVisualResourcesScale.value}px`,
        fontWeight: 800,
      },
    },
    tooltip: {
      theme: themeStore.currentTheme,
    },
    grid: {
      show: true,
      padding: {
        left: 60,
        right: 30,
      },
    },
  }))

  // Começa verdadeiro, pois a busca é disparada ao montar o componente.

  const isLoading = ref<boolean>(true)

  onMounted(async () => {
    const { data, statusCode } = await usersDashboardStore.getUsersMostReported({}, {})

    isLoading.value = false

    if (statusCode.value === 200 && data.value) {
      usersMostReportedResponse.value = data.value.data
    }
  })

  return {
    isLoading,
    usersMostReportedChartSeries,
    usersMostReportedChartOptions,
  }
}
