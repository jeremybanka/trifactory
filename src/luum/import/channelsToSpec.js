import {
  hueFromChannels,
  satFromChannels,
  lumFromChannels,
} from "../solveFor"

export default ({ R, G, B }) => {
  const hue = hueFromChannels({ R, G, B })
  const sat = satFromChannels({ R, G, B })
  const lum = lumFromChannels({ R, G, B })
  return { hue, sat, lum }
}
