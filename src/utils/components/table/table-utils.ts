export function formatCellValue(value: string, type: string) {
  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString('pt-BR')

    default:
      return value
  }
}
