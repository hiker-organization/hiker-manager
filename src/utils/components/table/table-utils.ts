import { getNormalizedDate } from '@/utils/data/formatting/date-formatting-utils'

export function formatCellValue(value: unknown, type: string) {
  if (!value) {
    return 'Não Definido(a)'
  }

  switch (type) {
    case 'date':
      return getNormalizedDate(String(value))

    case 'percentage':
      return `${(Number(value) * 100).toFixed(2)}%`

    default:
      return value
  }
}
