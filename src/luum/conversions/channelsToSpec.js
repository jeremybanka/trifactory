import {
  specHueFromChannels,
  specSatFromChannels,
  specLumFromChannels,
} from "../deductions"

export default ({ R, G, B }) => {
  const hue = specHueFromChannels({ R, G, B })
  const sat = specSatFromChannels({ R, G, B })
  const lum = specLumFromChannels({ R, G, B })
  return { hue, sat, lum }
}
