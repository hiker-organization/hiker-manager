import { getNormalizedDate } from "@/utils/data/formatting/date-formatting-utils"

export function formatCellValue(value: string, type: string) {
  if (value === 'null' || value === 'undefined') {
    return 'Não Definido(a)'
  }

  switch (type) {
    case 'date':
      return getNormalizedDate(value)

    default:
      return value
  }
}
