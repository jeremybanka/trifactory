export default function hueToChannelFactors(hue: number) {
  const hueReduced = hue / 60
  const hueInteger = Math.floor(hueReduced)
  const hueDecimal = hueReduced - hueInteger
  const x = hueDecimal
  const y = 1 - hueDecimal
  switch (hueInteger) {
    case 0: return [1, x, 0]
    case 1: return [y, 1, 0]
    case 2: return [0, 1, x]
    case 3: return [0, y, 1]
    case 4: return [x, 0, 1]
    case 5: return [1, 0, y]
    default: throw new Error('invalid hue served')
  }
}