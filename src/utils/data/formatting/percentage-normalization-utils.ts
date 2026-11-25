import Decimal from 'decimal.js'

export function generateNormalizedPercentsGroup(percentages: Array<number>) {
  const fixedPercentages: Array<Decimal> = percentages.map<Decimal>((percentage) =>
    Decimal(percentage.toFixed(2)),
  )

  const fixedPercentagesSum: Decimal = fixedPercentages.reduce<Decimal>(
    (accumulator, fixedPercentage) => {
      accumulator = accumulator.plus(fixedPercentage)

      return accumulator
    },
    Decimal('0'),
  )

  const rest: Decimal = Decimal('100').minus(fixedPercentagesSum)

  const greaterPercentage: Decimal = Decimal.max(...fixedPercentages)

  const greaterPercentageIndex: number = fixedPercentages.findIndex((fixedPercentage) =>
    fixedPercentage.eq(greaterPercentage),
  )

  if (greaterPercentageIndex !== -1 && fixedPercentages[greaterPercentageIndex]) {
    fixedPercentages[greaterPercentageIndex] = fixedPercentages[greaterPercentageIndex].plus(rest)
  }

  return fixedPercentages
}
