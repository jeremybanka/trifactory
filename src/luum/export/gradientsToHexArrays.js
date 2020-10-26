import gradientToHexArray from './gradientToHexArray'

export default (originalColorObject, tuner) => {
  const { gradients } = originalColorObject
  const { hue, sat, lum } = originalColorObject
  const rootSpec = { hue, sat, lum }
  const hexArrays = []
  for(let gradientIdx = 0; gradientIdx < gradients.length; gradientIdx++) {
    const gradient = gradients[gradientIdx]
    const hexGroup = gradientToHexArray(rootSpec, gradient, tuner)
    hexArrays.push(hexGroup)
  }
  return hexArrays
}
