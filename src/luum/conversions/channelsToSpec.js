import hueFromChannels from "../deductions/hueFromChannels"
import satFromChannels from "../deductions/satFromChannels"
import lumFromChannels from "../deductions/lumFromChannels"

export default ({ R, G, B }) => {
  const hue = hueFromChannels({ R, G, B })
  const sat = satFromChannels({ R, G, B })
  const lum = lumFromChannels({ R, G, B })
  return { hue, sat, lum }
}
