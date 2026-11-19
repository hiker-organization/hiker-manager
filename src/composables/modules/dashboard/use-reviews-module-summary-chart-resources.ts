import type { ApexOptions } from 'apexcharts'
import type { ReviewsModuleSummaryResponse } from '@/models/modules/dashboard/dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/modules/dashboard/dashboard-store'

export function useReviewsModuleSummaryChartResources() {
  const dashboardStore = useDashboardStore()

  const reviewsModuleSummaryResponse = ref<ReviewsModuleSummaryResponse>({
    totalReviews: 0,
    common: {
      percentage: 0,
      count: 0,
    },
    blocked: {
      percentage: 0,
      count: 0,
    },
    reported: {
      percentage: 0,
      count: 0,
    },
  })

  const reviewsModuleSummaryChartSeries = computed<Array<number>>(() => [
    reviewsModuleSummaryResponse.value.common.count,
    reviewsModuleSummaryResponse.value.blocked.count,
    reviewsModuleSummaryResponse.value.reported.count,
  ])

  const reviewsModuleSummaryChartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: 'donut',
      width: '100%',
      height: '100%',
      background: 'var(--color-base-200)',
      foreColor: 'var(--color-base-content)',
    },
    labels: [
      `Comuns (${reviewsModuleSummaryResponse.value.common.percentage}%)`,
      `Bloqueadas (${reviewsModuleSummaryResponse.value.blocked.percentage}%)`,
      `Reportadas (${reviewsModuleSummaryResponse.value.reported.percentage}%)`,
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
      text: 'Índice de Postagens',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    },
  }))

  onMounted(async () => {
    const { data, statusCode } = await dashboardStore.getReviewsModuleSummary({}, {})

    if (statusCode.value === 200 && data.value) {
      reviewsModuleSummaryResponse.value = data.value
    }
  })

  return {
    reviewsModuleSummaryChartSeries,
    reviewsModuleSummaryChartOptions,
  }
}
