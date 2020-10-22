import { wrapAround } from "../utils"

export default (hue, tuner) => {
  let maxSat = 255
  for(let a = -1, b = 0; b < tuner.length; a++, b++) {
    a = wrapAround(a, [0, tuner.length])
    // console.log('||| a =', a, 'b =', b)
    const tuningPointA = tuner[a]
    const tuningPointB = tuner[b]
    if(
      hue >= wrapAround(tuningPointA.hue, [0, 360]) &&
      hue < tuningPointB.hue
    ) {
      // console.log('||| hue', hue, 'is between', tuningPointA.hue, 'and', tuningPointB.hue)
      let _ = hue // 70
      _ -= tuningPointA.hue // 70 - 50 = 20
      _ /= tuningPointB.hue - tuningPointA.hue // 20 / (120 - 50) = 2/7
      _ *= tuningPointB.sat - tuningPointA.sat // -128 * 2 / 7 = -256 / 7 ~= -37
      _ += tuningPointA.sat
      Math.round(_)
      // console.log('||| _', _)
      maxSat = _
    }
  }
  // console.log('--- maxSat', maxSat)
  return maxSat
}
