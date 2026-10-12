export function formatCellValue(value: string, type: string) {
  switch (type) {
    case 'date':
      const date = value.split('T')[0] || ''

      const [year, month, day] = date.split('-') || ['', '', '']

      return `${day}/${month}/${year}`

    default:
      return value
  }
}
