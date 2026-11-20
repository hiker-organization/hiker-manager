export function generateNormalizedPercentsGroup(percentages: Array<number>) {
  const fixedPercentages = percentages.map((percentage) => Number(percentage.toFixed(2)))

  const fixedPercentagesSum = fixedPercentages.reduce<number>((accumulator, fixedPercentage) => {
    accumulator += fixedPercentage

    return accumulator
  }, 0)

  const rest = 100 - fixedPercentagesSum

  const greaterPercentageIndex = fixedPercentages.findIndex(
    (fixedPercentage) => fixedPercentage === Math.max(...fixedPercentages),
  )

  if (fixedPercentages[greaterPercentageIndex]) {
    fixedPercentages[greaterPercentageIndex] += rest
  }

  return fixedPercentages
}
