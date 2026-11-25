import type { ApexOptions } from 'apexcharts'
import type { ReviewsModuleSummaryResponse } from '@/models/modules/dashboard/review/reviews-dashboard-model'
import Decimal from 'decimal.js'
import { computed, onMounted, ref } from 'vue'
import { useReviewsDashboardStore } from '@/stores/modules/dashboard/review/reviews-dashboard-store'
import { generateNormalizedPercentsGroup } from '@/utils/data/formatting/percentage-normalization-utils'
import { defineVariableBasedOnBreakpoints } from '@/utils/data/dynamic/use-define-variable-based-on-breakpoints'

export function useReviewsModuleSummaryChartResources() {
  const reviewsDashboardStore = useReviewsDashboardStore()

  const chartVisualResourcesScale = defineVariableBasedOnBreakpoints<number>({
    minValue: 0.7,
    values: {
      lg: 1,
    },
  })

  const reviewsModuleSummaryResponse = ref<ReviewsModuleSummaryResponse>({
    totalReviews: 0,
    common: {
      percentage: 0,
      count: 0,
    },
    reported: {
      percentage: 0,
      count: 0,
    },
    blocked: {
      percentage: 0,
      count: 0,
    },
  })

  const reviewsModuleSummaryChartPercentages = computed<{
    common: Decimal
    blocked: Decimal
    reported: Decimal
  }>(() => {
    const percentages = generateNormalizedPercentsGroup([
      reviewsModuleSummaryResponse.value.common.percentage,
      reviewsModuleSummaryResponse.value.reported.percentage,
      reviewsModuleSummaryResponse.value.blocked.percentage,
    ])

    return {
      common: percentages[0] || Decimal('0'),
      reported: percentages[1] || Decimal('0'),
      blocked: percentages[2] || Decimal('0'),
    }
  })

  const reviewsModuleSummaryChartSeries = computed<Array<number>>(() => [
    reviewsModuleSummaryResponse.value.common.count,
    reviewsModuleSummaryResponse.value.reported.count,
    reviewsModuleSummaryResponse.value.blocked.count,
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
        fontSize: `${20 * chartVisualResourcesScale.value}px`,
      },
    },
    stroke: {
      width: 2,
    },
    legend: {
      show: true,
      position: 'bottom',
      customLegendItems: ['Válidas', 'Em Análise', 'Bloqueadas'],
      style: {
        fontSize: `${16 * chartVisualResourcesScale.value}px`,
      },
    },
    labels: [
      `${reviewsModuleSummaryChartPercentages.value.common}%`,
      `${reviewsModuleSummaryChartPercentages.value.reported}%`,
      `${reviewsModuleSummaryChartPercentages.value.blocked}%`,
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
