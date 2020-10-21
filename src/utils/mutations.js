import { colorDataToHex } from './conversions'

function defineChange(originalColorObj, currentStep, currentAxis) {
  const { to, attribute } = currentAxis
  const from = (typeof currentAxis.from === 'number')
    ? currentAxis.from
    : originalColorObj[attribute]
  const change = from + currentStep * (to - from)
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
    )
    changes[attribute] = change
    // console.log('>>> changes', changes)
  }
  return changes
}
function processionToHexGroup(originalColorObj, processionIdx) {
  const { hue, sat, lum } = originalColorObj
  const procession = originalColorObj.processions[processionIdx]
  const { steps, axes, prefer } = procession
  const hexGroup = []
  for(let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
    const currentStep = steps[stepIdx]
    const changes = defineChanges(originalColorObj, currentStep, axes)
    const hex = colorDataToHex({
      hue,
      sat,
      lum,
      prefer,
      ...changes,
    })
    hexGroup.push(hex)
  }
  return hexGroup
}
export function processionsToHexGroups(originalColorObj) {
  const { processions } = originalColorObj
  const hexGroups = []
  for(let processionIdx = 0; processionIdx < processions.length; processionIdx++) {
    const hexGroup = processionToHexGroup(originalColorObj, processionIdx)
    hexGroups.push(hexGroup)
  }
  return hexGroups
}
