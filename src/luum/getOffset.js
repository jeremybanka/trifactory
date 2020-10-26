import hexToSpec from "./import/hexToSpec"
import specToHex from "./export/specToHex"

export default ({
  hex,
  tuner,
  offsets,
}) => {
  const originSpec = hexToSpec(hex)
  const changes = {}
  for(let index = 0; index < offsets.length; index++) {
    const { attribute, value } = offsets[index]
    const originValue = originSpec[attribute]
    changes[attribute] = attribute === 'lum' && originValue > -1 * value
      ? originValue + value
      : originValue - value * 1.67
  }
  const newHex = specToHex({
    ...originSpec,
    ...changes,
    prefer: 'lum',
    tuner,
  })
  return newHex
}
