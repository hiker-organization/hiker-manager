export function extractFinalValue(object: Record<string, unknown>, nestedKey: string) {
  const keys: Array<string> = nestedKey.split('.')

  let value: unknown = object

  while (keys.length > 0) {
    const currentkey = keys.shift()

    if (currentkey && value) {
      value = (value as Record<string, unknown>)[currentkey]
    }
  }

  return value
}
