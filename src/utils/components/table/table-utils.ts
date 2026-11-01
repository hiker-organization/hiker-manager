import { getNormalizedDate } from '@/utils/data/formatting/date-formatting-utils'

export function formatCellValue(value: unknown, type: string) {
  if (!value) {
    return 'Não Definido(a)'
  }

  switch (type) {
    case 'date':
      return getNormalizedDate(String(value))

    default:
      return value
  }
}
