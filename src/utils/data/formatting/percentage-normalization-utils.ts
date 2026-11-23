export function generateNormalizedPercentsGroup(percentages: Array<number>) {
  const fixedPercentages = percentages.map((percentage) => Number(percentage.toFixed(2)))

  const fixedPercentagesSum = fixedPercentages.reduce<number>((accumulator, fixedPercentage) => {
    accumulator += fixedPercentage

    return accumulator
  }, 0)

  const rest = 100 - fixedPercentagesSum

  const greaterPercentage = Math.max(...fixedPercentages)

  const greaterPercentageIndex = fixedPercentages.findIndex(
    (fixedPercentage) => fixedPercentage === greaterPercentage,
  )

  if (greaterPercentageIndex !== -1 && fixedPercentages[greaterPercentageIndex]) {
    fixedPercentages[greaterPercentageIndex] += rest
  }

  return fixedPercentages
}
