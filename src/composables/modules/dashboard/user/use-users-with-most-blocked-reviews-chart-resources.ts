import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'
import type { UserWithBlockedReviews } from '@/models/modules/dashboard/user/users-dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useUsersDashboardStore } from '@/stores/modules/dashboard/user/users-dashboard-store'
import { useThemeStore } from '@/stores/core/theme-store'

export function useUsersWithMostBlockedReviewsChartResources() {
  const usersDashboardStore = useUsersDashboardStore()

  const themeStore = useThemeStore()

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
      text: 'Usuários com Mais Postagens Bloqueadas',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    },
    xaxis: {
      categories: usersWithMostBlockedReviewsChartCategories.value,
      min: 1,
      tickAmount: Math.max(...usersWithMostBlockedReviewsChartSeriesData.value) + 1,
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
    const { data, statusCode } = await usersDashboardStore.getUsersWithMostBlockedReviews({}, {})

    if (statusCode.value && data.value) {
      usersWithMostBlockedReviewsResponse.value = data.value.data
    }
  })

  return {
    usersWithMostBlockedReviewsChartSeries,
    usersWithMostBlockedReviewsChartOptions,
  }
}
