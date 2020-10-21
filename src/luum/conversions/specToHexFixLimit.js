import specToChannels from "./specToChannels"
import channelsToHex from "./channelsToHex"

export default ({ hue, sat, lum, prefer }) => {
  const { channels, fix, limit } = specToChannels({ hue, sat, lum, prefer })
  const { R, G, B } = channels
  const hex = channelsToHex({ R, G, B })

  // console.log('--- newHex', hex)

  return { hex, fix, limit }
}
