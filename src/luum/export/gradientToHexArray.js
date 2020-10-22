import { specToHex } from '.' // eslint-disable-line
import { interpolate } from '../utils'

function interpolateChanges(rootSpec, currentStep, axes) {
  const changes = {}
  for(let axisIdx = 0; axisIdx < axes.length; axisIdx++) {
    const currentAxis = axes[axisIdx]
    const { to, attribute } = currentAxis
    const from = (typeof currentAxis.from === 'number')
      ? currentAxis.from
      : rootSpec[attribute]
    const value = interpolate({
      completionRatio: currentStep,
      range: [to, from],
    })
    changes[attribute] = value
  }
  // console.log('>>> changes', changes)
  return changes
}

export default (rootSpec, gradient, tuner) => {
  const { steps, axes, prefer } = gradient
  const hexArray = []
  for(let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
    const currentStep = steps[stepIdx]
    const changes = interpolateChanges(
      rootSpec,
      currentStep,
      axes,
    )
    const hex = specToHex({
      ...rootSpec,
      ...changes,
      prefer,
      tuner,
    })
    hexArray.push(hex)
  }
  return hexArray
}
