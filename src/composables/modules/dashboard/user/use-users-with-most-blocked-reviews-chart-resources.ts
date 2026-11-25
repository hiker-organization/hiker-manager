import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'
import type { UserWithBlockedReviews } from '@/models/modules/dashboard/user/users-dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'
import { useThemeStore } from '@/stores/core/theme-store'
import { defineVariableBasedOnBreakpoints } from '@/utils/data/dynamic/use-define-variable-based-on-breakpoints'

export function useUsersWithMostBlockedReviewsChartResources() {
  const usersDashboardStore = useUsersDashboardStore()

  const themeStore = useThemeStore()

  const chartVisualResourcesScale = defineVariableBasedOnBreakpoints<number>({
    minValue: 0.7,
    values: {
      lg: 1,
    },
  })

  const usersWithMostBlockedReviewsResponse = ref<Array<UserWithBlockedReviews>>([])

  const usersWithMostBlockedReviewsChartCategories = computed<Array<string>>(() => {
    return usersWithMostBlockedReviewsResponse.value.map((user) => user.nome_usuario)
  })

  const usersWithMostBlockedReviewsChartSeriesData = computed<Array<number>>(() => {
    return usersWithMostBlockedReviewsResponse.value.map((user) => user.blocked_reviews)
  })

  const usersWithMostBlockedReviewsChartSeries = computed<ApexAxisChartSeries>(() => {
    return [
      {
        name: 'Postagens Bloqueadas',
        data: usersWithMostBlockedReviewsChartSeriesData.value,
      },
    ]
  })

  const usersWithMostBlockedReviewsChartOptions = computed<ApexOptions>(() => ({
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
      text: 'Usuários com mais Bloqueios',
      align: 'center',
      style: {
        fontSize: `${20 * chartVisualResourcesScale.value}px`,
      },
    },
    xaxis: {
      categories: usersWithMostBlockedReviewsChartCategories.value,
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
      tickAmount: Math.max(...usersWithMostBlockedReviewsChartSeriesData.value),
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
      textAnchor: 'start',
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
    const { data, statusCode } = await usersDashboardStore.getUsersWithMostBlockedReviews({}, {})

    isLoading.value = false

    if (statusCode.value && data.value) {
      usersWithMostBlockedReviewsResponse.value = data.value.data
    }
  })

  return {
    isLoading,
    usersWithMostBlockedReviewsChartSeries,
    usersWithMostBlockedReviewsChartOptions,
  }
}
