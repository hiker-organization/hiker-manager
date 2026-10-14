export function getNormalizedDate(date: string) {
  const datePieces = date.split('T')[0]

  if (!datePieces || datePieces === '') {
    return 'Não Definido(a)'
  }

  const [year, month, day] = datePieces.split('-')

  return `${day}/${month}/${year}`
}
