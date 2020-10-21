import hexToChannels from "./hexToChannels"
import channelsToSpec from "./channelsToSpec"

export default hex => {
  const { R, G, B } = hexToChannels(hex)
  /*
  console.log('+++ input hex', hex)
  console.log('||| R', R)
  console.log('||| G', G)
  console.log('||| B', B)
  */
  const { hue, sat, lum } = channelsToSpec({ R, G, B })
  return { hue, sat, lum }
}
