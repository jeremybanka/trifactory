import { specToHex } from './conversions'

function interpolateValueAtStep(originalColorObject, currentStep, currentAxis) {
  const { to, attribute } = currentAxis
  const from = (typeof currentAxis.from === 'number')
    ? currentAxis.from
    : originalColorObject[attribute]
  const value = from + currentStep * (to - from)
  /*
  console.log('||| to', to, 'from', from)
  console.log("||| new", attribute, 'is', change)
  */
  return value
}

function interpolateChanges(originalColorObject, currentStep, axes) {
  const changes = {}
  // add entry to transformation for each axis
  for(let axisIdx = 0; axisIdx < axes.length; axisIdx++) {
    const currentAxis = axes[axisIdx]
    const { attribute } = currentAxis
    const value = interpolateValueAtStep(
      originalColorObject,
      currentStep,
      currentAxis,
    )
    changes[attribute] = value
    // console.log('>>> changes', changes)
  }
  return changes
}

function gradientToHexArray(originalColorObject, gradientIdx, tuner) {
  const { hue, sat, lum } = originalColorObject
  const gradient = originalColorObject.gradients[gradientIdx]
  const { steps, axes, prefer } = gradient
  const hexArray = []
  for(let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
    const currentStep = steps[stepIdx]
    const changes = interpolateChanges(
      originalColorObject,
      currentStep,
      axes,
    )
    const hex = specToHex({
      hue,
      sat,
      lum,
      prefer,
      tuner,
      ...changes,
    })
    hexArray.push(hex)
  }
  return hexArray
}
export function gradientsToHexArrays(originalColorObject, tuner) {
  const { gradients } = originalColorObject
  const hexArrays = []
  for(let gradientIdx = 0; gradientIdx < gradients.length; gradientIdx++) {
    const hexGroup = gradientToHexArray(originalColorObject, gradientIdx, tuner)
    hexArrays.push(hexGroup)
  }
  return hexArrays
}
