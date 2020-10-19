import funnel from './funnel'
import { CHANNEL_SPECIFIC_LUM } from './constants'

function hexToChannels(hex) {
  const channel = idx => parseInt(hex.substr((idx * 2 + 1), 2), 16)
  return {
    R: channel(0),
    G: channel(1),
    B: channel(2),
  }
}

const channelsToHex = channels =>
  `#${Object.values(channels).map(channel => {
    let channelHex = channel.toString(16)
    if(channelHex.length === 1) channelHex = 0 + channelHex
    return channelHex
  }).join('')}`

function channelsToHue({ R, G, B }) {
  let hue
  if(R > G && G >= B) hue = 60 * (0 + (G - B) / (R - B))
  if(G >= R && R > B) hue = 60 * (2 - (R - B) / (G - B))
  if(G > B && B >= R) hue = 60 * (2 + (B - R) / (G - R))
  if(B >= G && G > R) hue = 60 * (4 - (G - R) / (B - R))
  if(B > R && R >= G) hue = 60 * (4 + (R - G) / (B - G))
  if(R >= B && B > G) hue = 60 * (6 - (B - G) / (R - G))
  if(R === G && G === B) hue = 0
  // console.log('||| found hue', hue)
  return hue
}

function channelsToSat({ R, G, B }) {
  const sat = Math.max(R, G, B) - Math.min(R, G, B)
  // console.log('||| found sat', sat)
  return sat
}

export function channelsToLum({ R, G, B }) {
  const lum = (
    CHANNEL_SPECIFIC_LUM.R * R / 255 +
    CHANNEL_SPECIFIC_LUM.G * G / 255 +
    CHANNEL_SPECIFIC_LUM.B * B / 255
  )
  // console.log('||| found lum', lum)
  return lum
}

function channelsToColorData({ R, G, B }) {
  const hue = channelsToHue({ R, G, B })
  const sat = channelsToSat({ R, G, B })
  const lum = channelsToLum({ R, G, B })
  return { hue, sat, lum }
}

export function hexToColorData(hex) {
  const { R, G, B } = hexToChannels(hex)
  /*
  console.log('+++ input hex', hex)
  console.log('||| R', R)
  console.log('||| G', G)
  console.log('||| B', B)
  */
  const { hue, sat, lum } = channelsToColorData({ R, G, B })
  return { hue, sat, lum }
}

export default function hueToChannelFactors(hue) {
  while(hue >= 360) hue -= 360
  while(hue < 0) hue += 360
  const hueReduced = hue / 60
  const hueInteger = Math.floor(hueReduced)
  const hueDecimal = hueReduced - hueInteger
  const x = hueDecimal
  const y = 1 - hueDecimal
  switch(hueInteger) {
    case 0: return [1, x, 0]
    case 1: return [y, 1, 0]
    case 2: return [0, 1, x]
    case 3: return [0, y, 1]
    case 4: return [x, 0, 1]
    case 5: return [1, 0, y]
    default: throw new Error('invalid hue served')
  }
}

function hueToSpecificLum(
  hue,
  desaturateR = 0,
  desaturateG = 0,
  desaturateB = 0,
) {
  const [factorR, factorG, factorB] = hueToChannelFactors(hue)

  const lumR = CHANNEL_SPECIFIC_LUM.R * factorR * (1 - desaturateR)
  const lumB = CHANNEL_SPECIFIC_LUM.G * factorG * (1 - desaturateG)
  const lumG = CHANNEL_SPECIFIC_LUM.B * factorB * (1 - desaturateB)

  const specificLum = lumR + lumG + lumB

  return specificLum
}

function colorDataToChannels({ hue, sat, lum, prefer = 'sat' }) {
  /*
  console.log('||| hue', hue)
  console.log('||| sat', sat)
  console.log('||| lum', lum)
  console.log('||| prefer', prefer)
  */
  const channelFactors = hueToChannelFactors(hue)
  function getChannelSpread(actualSat) {
    const factorToChannel = factor => Math.round(channelFactors[factor] * actualSat)
    return {
      R: factorToChannel(0),
      G: factorToChannel(1),
      B: factorToChannel(2),
    }
  }
  let trueSaturation
  let trueLuminosity
  let minChannels
  let minLum = 0
  let maxLum = 1
  let maxSat = 255

  if(prefer === 'sat') {
    trueSaturation = Math.floor(sat)
    minChannels = getChannelSpread(trueSaturation)
    const maxChannels = {
      R: minChannels.R + 255 - trueSaturation,
      G: minChannels.G + 255 - trueSaturation,
      B: minChannels.B + 255 - trueSaturation,
    }
    minLum = channelsToLum(minChannels)
    maxLum = channelsToLum(maxChannels)
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
    const lumAtSat255 = hueToSpecificLum(hue)
    maxSat = Math.round(trueLuminosity <= lumAtSat255
      ? 255 * (trueLuminosity / lumAtSat255)
      : 255 * (1 - trueLuminosity) / (1 - lumAtSat255))
    trueSaturation = Math.min(sat, maxSat)
    minChannels = getChannelSpread(trueSaturation)
    minLum = channelsToLum(minChannels)
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

export function colorDataToHex({ hue, sat, lum, prefer }) {
  const { channels, fix, limit } = colorDataToChannels({ hue, sat, lum, prefer })
  const { R, G, B } = channels
  const hex = channelsToHex({ R, G, B })

  // console.log('--- newHex', hex)

  return { hex, fix, limit }
}
