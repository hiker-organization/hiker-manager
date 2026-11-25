import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'
import type { ReviewMostReportedCurrently } from '@/models/modules/dashboard/review/reviews-dashboard-model'
import { computed, ref, onMounted } from 'vue'
import { useReviewsDashboardStore } from '@/stores/modules/dashboard/review/reviews-dashboard-store'
import { useThemeStore } from '@/stores/core/theme-store'
import { defineVariableBasedOnBreakpoints } from '@/utils/data/dynamic/use-define-variable-based-on-breakpoints'

export function useReviewsMostReportedCurrentlyResources() {
  const reviewsDashboardStore = useReviewsDashboardStore()

  const themeStore = useThemeStore()

  const chartVisualResourcesScale = defineVariableBasedOnBreakpoints<number>({
    minValue: 0.7,
    values: {
      lg: 1,
    },
  })

  const reviewsMostReportedCurrentlyResponse = ref<Array<ReviewMostReportedCurrently>>([])

  const reviewsMostReportedCurrentlyChartCategories = computed<Array<string>>(() => {
    return reviewsMostReportedCurrentlyResponse.value.map((review) => `#${review.id}`)
  })

  const reviewsMostReportedCurrentlyChartSeriesData = computed<Array<number>>(() => {
    return reviewsMostReportedCurrentlyResponse.value.map((review) => review.denuncias_abertas)
  })

  const reviewsMostReportedCurrentlyChartSeries = computed<ApexAxisChartSeries>(() => {
    return [
      {
        name: 'Denúncias Abertas',
        data: reviewsMostReportedCurrentlyChartSeriesData.value,
      },
    ]
  })

  const reviewsMostReportedCurrentlyChartOptions = computed<ApexOptions>(() => ({
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
      text: 'Postagens com mais Denúncias Abertas',
      align: 'center',
      style: {
        fontSize: `${20 * chartVisualResourcesScale.value}px`,
      },
    },
    xaxis: {
      categories: reviewsMostReportedCurrentlyChartCategories.value,
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
      tickAmount: Math.max(...reviewsMostReportedCurrentlyChartSeriesData.value),
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
        colors: ['var(--color-base-content'],
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

  onMounted(async () => {
    const { data, statusCode } = await reviewsDashboardStore.getReviewsMostReportedCurrently({}, {})

    if (statusCode.value === 200 && data.value) {
      reviewsMostReportedCurrentlyResponse.value = data.value.data
    }
  })

  return {
    reviewsMostReportedCurrentlyChartSeries,
    reviewsMostReportedCurrentlyChartOptions,
  }
}
