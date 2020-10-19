import { colorDataToHex } from './conversions'

function defineChange(originalColorObj, currentStep, currentAxis, attribute) {
  const { to } = currentAxis
  const from = (typeof currentAxis.from === 'number')
    ? currentAxis.from
    : originalColorObj[currentAxis[attribute]]
  const change = currentStep * (to - from) + from
  /*
  console.log('||| to', to, 'from', from)
  console.log("||| new", attribute, 'is', change)
  */
  return change
}

function defineChanges(originalColorObj, currentStep, axes) {
  const changes = {}
  // add entry to transformation for each axis
  for(let axisIdx = 0; axisIdx < axes.length; axisIdx++) {
    const currentAxis = axes[axisIdx]
    const { attribute } = currentAxis
    const change = defineChange(
      originalColorObj,
      currentStep,
      currentAxis,
      attribute
    )
    changes[attribute] = change
    // console.log('>>> changes', changes)
  }
  return changes
}
function processionToHexGroup(originalColorObj, procession) {
  const { hue, sat, lum } = originalColorObj
  const { steps, axes, preferAttribute } = procession
  const hexGroup = []
  for(let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
    const currentStep = steps[stepIdx]
    const changes = defineChanges(originalColorObj, currentStep, axes)
    const { hex } = colorDataToHex({
      hue,
      sat,
      lum,
      prefer: preferAttribute,
      ...changes,
    })
    hexGroup.push(hex)
  }
  return hexGroup
}
export function processionsToHexGroups(originalColorObj) {
  const { processions } = originalColorObj
  const hexGroups = []
  for(let idx = 0; idx < processions.length; idx++) {
    const procession = processions[idx]
    const hexGroup = processionToHexGroup(originalColorObj, procession)
    hexGroups.push(hexGroup)
  }
  return hexGroups
}
