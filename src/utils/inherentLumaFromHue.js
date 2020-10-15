import lumaConst from './lumaConstRGB'
// @ts-ignore
import hueToChannelFactors from './hueToChannelFactors'

export default function inherentLumaFromHue(
  hue = 350,
  desaturateR = 0,
  desaturateG = 0,
  desaturateB = 0,
) {
  const lumaR = lumaConst.R * (1 - desaturateR)
  const lumaG = lumaConst.G * (1 - desaturateG)
  const lumaB = lumaConst.B * (1 - desaturateB)

  const channelFactors = hueToChannelFactors(hue)

  return (
    lumaR * channelFactors[0] +
    lumaG * channelFactors[1] +
    lumaB * channelFactors[2]
  )
}
