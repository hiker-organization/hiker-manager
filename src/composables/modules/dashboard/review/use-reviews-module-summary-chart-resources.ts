import type { ApexOptions } from 'apexcharts'
import type { ReviewsModuleSummaryResponse } from '@/models/modules/dashboard/review/reviews-dashboard-model'
import { computed, onMounted, ref } from 'vue'
import { useReviewsDashboardStore } from '@/stores/modules/dashboard/review/reviews-dashboard-store'
import { generateNormalizedPercentsGroup } from '@/utils/data/formatting/percentage-normalization-utils'

export function useReviewsModuleSummaryChartResources() {
  const reviewsDashboardStore = useReviewsDashboardStore()

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

  const reviewsModuleSummaryChartPercentages = computed<{
    common: number
    blocked: number
    reported: number
  }>(() => {
    const percentages = generateNormalizedPercentsGroup([
      reviewsModuleSummaryResponse.value.common.percentage,
      reviewsModuleSummaryResponse.value.blocked.percentage,
      reviewsModuleSummaryResponse.value.reported.percentage,
    ])

    return {
      common: percentages[0] || 0,
      blocked: percentages[1] || 0,
      reported: percentages[2] || 0,
    }
  })

  const reviewsModuleSummaryChartSeries = computed<Array<number>>(() => [
    reviewsModuleSummaryResponse.value.common.count,
    reviewsModuleSummaryResponse.value.blocked.count,
    reviewsModuleSummaryResponse.value.reported.count,
  ])

  const reviewsModuleSummaryChartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: 'pie',
      width: '100%',
      height: '100%',
      foreColor: 'var(--color-base-content)',
    },
    title: {
      text: 'Distribuição de Postagens',
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
      `Válidas (${reviewsModuleSummaryChartPercentages.value.common}%)`,
      `Bloqueadas (${reviewsModuleSummaryChartPercentages.value.blocked}%)`,
      `Reportadas (${reviewsModuleSummaryChartPercentages.value.reported}%)`,
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
    const { data, statusCode } = await reviewsDashboardStore.getReviewsModuleSummary({}, {})

    if (statusCode.value === 200 && data.value) {
      reviewsModuleSummaryResponse.value = data.value
    }
  })

  return {
    reviewsModuleSummaryChartSeries,
    reviewsModuleSummaryChartOptions,
  }
}
