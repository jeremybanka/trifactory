import { colorDataToHex } from './conversions'

export function variationsToHexGroups(colorObj) {
  const { hue, sat, lum, variations } = colorObj
  const hexGroups = []
  let prefer
  for(let varIdx = 0; varIdx < variations.length; varIdx++) {
    const hexGroup = []
    const { steps, axes } = variations[varIdx]
    for(let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      const step = steps[stepIdx]
      const transformation = {}
      for(let axisIdx = 0; axisIdx < axes.length; axisIdx++) {
        const axis = axes[axisIdx]
        const max = axis.max || colorObj[axis.id]
        const min = (typeof axis.min === 'number')
          ? axis.min
          : colorObj[axis.id]
        transformation[axis.id] = step * (max - min) + min
        prefer = axis.id
      }
      const { hex } = colorDataToHex({ hue, sat, lum, prefer, ...transformation })
      hexGroup.push(hex)
    }
    hexGroups.push(hexGroup)
  }
  return hexGroups
}
