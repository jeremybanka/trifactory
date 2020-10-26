import hueToRelativeChannels from '../import/hueToRelativeChannels'
import {
  lumFromChannels,
  inherentLumFromHue,
  maxSatForHueFromTuner,
} from '../solveFor'
import funnel from '../utils/funnel'

export default ({ hue, sat, lum, prefer = 'sat', tuner }) => {
  /*
  console.log('||| hue', hue)
  console.log('||| sat', sat)
  console.log('||| lum', lum)
  console.log('||| prefer', prefer)
  */
  const relativeChannels = hueToRelativeChannels(hue)
  function makeMinChannels(trueSaturation) {
    const makeMinChannel = idx => Math.round(relativeChannels[idx] * trueSaturation)
    return {
      R: makeMinChannel(0),
      G: makeMinChannel(1),
      B: makeMinChannel(2),
    }
  }
  let trueSaturation
  let trueLuminosity
  let minChannels
  let minLum = 0
  let maxLum = 1
  let maxSat = maxSatForHueFromTuner(hue, tuner)

  if(prefer === 'sat') {
    trueSaturation = Math.min(Math.floor(sat), maxSat)
    minChannels = makeMinChannels(trueSaturation)
    const maxChannels = {
      R: minChannels.R + 255 - trueSaturation,
      G: minChannels.G + 255 - trueSaturation,
      B: minChannels.B + 255 - trueSaturation,
    }
    minLum = lumFromChannels(minChannels)
    maxLum = lumFromChannels(maxChannels)
    trueLuminosity = funnel(lum, [minLum, maxLum])
    /*
    console.log('||| trueSaturation', trueSaturation)
    console.log('||| idealLum', lum)
    console.log('||| minChannels', minChannels)
    console.log('||| minLum', minLum)
    console.log('||| maxChannels', maxChannels)
    console.log('||| maxLum', maxLum)
    console.log('||| trueLuminosity', trueLuminosity)
    */
  }
  if(prefer === 'lum') {
    trueLuminosity = funnel(lum, [0, 1])
    const specificLum = inherentLumFromHue(hue)
    maxSat = Math.min(
      maxSat,
      Math.round(trueLuminosity <= specificLum
        ? 255 * (trueLuminosity / specificLum)
        : 255 * (1 - trueLuminosity) / (1 - specificLum))
    )
    trueSaturation = Math.min(sat, maxSat)
    minChannels = makeMinChannels(trueSaturation)
    minLum = lumFromChannels(minChannels)
    /*
    console.log('||| trueLuminosity', trueLuminosity)
    console.log('||| lumAtSat255', lumAtSat255)
    console.log('||| maxSat', maxSat)
    console.log('||| trueSaturation', trueSaturation)
    console.log('||| minChannels', minChannels)
    */
  }
  const maxWhite = (255 - Math.max(...Object.values(minChannels)))
  const white = funnel(
    Math.round((trueLuminosity - minLum) * 255),
    [0, maxWhite]
  )
  const { R, G, B } = {
    R: minChannels.R + white,
    G: minChannels.G + white,
    B: minChannels.B + white,
  }
  /*
  console.log('||| maxWhite', maxWhite)
  console.log('||| white', white)
  console.log('||| R', R)
  console.log('||| G', G)
  console.log('||| B', B)
  */
  return {
    channels: { R, G, B },
    fix: {
      sat: trueSaturation,
      lum: trueLuminosity,
    },
    limit: {
      sat: [0, maxSat],
      lum: [minLum, maxLum],
    },
  }
}
