import { wrapAround } from '../utils'
/**
 * Gives us the relative values of the channels,
 * irrespective of the white light beneath them.
 * @param {number} hue - in degrees. Gets safely wrapped around first thing.
 *
 * DgiRed    0 ->   0
 *
 * Sunlgt   50 ->  50
 *
 * DgiYlw   60 ->  60
 *
 * Citron   70 ->  70
 *
 * Turqse  510 -> 150
 *
 * @const {number} hueReduced - hue 0-359.9 is now a floating point 0-5.999.
 *
 * DgiRed    0 ->   0  ~  0.000
 *
 * Sunlgt   50 -> 5/6  ~  0.833
 *
 * DgiYlw   60 ->   1  ~  1.000
 *
 * Citron   70 -> 7/6  ~  1.167
 *
 * Turqse  150 -> 5/2  ~  2.500
 *
 * @const {number} hueInteger - from 1-6. Tells us what color region we are in.
 *
 * DgiRed  0.000 -> 0
 *                : red-into-yellow region
 *
 * Sunlgt  0.833 -> 0
 *                : red-into-yellow region
 *
 * DgiYlw  1.000 -> 1
 *                : yellow-into-green region
 *
 * Citron  1.167 -> 1
 *                : yellow-into-green region
 *
 * Turqse  2.500 -> 2
 *                : green-into-cyan region
 *
 * hueInteger is the 'whole number' piece of hueReduced.
 * FYI, the six color regions are bounded by red, yellow, green, cyan, blue, magenta.
 *
 * @const {number} hueDecimal - tells where we are in this region.
 *
 * DgiRed  0.000 -> 0.000
 *                : at the very beginning
 *
 * Sunlgt  0.833 -> 0.833
 *                : near the end
 *
 * DgiYlw  1.000 -> 0.000
 *                : at the very beginning
 *
 * Citron  1.167 -> 0.167
 *                : near the beginning
 *
 * Turqse  2.500 -> 0.500
 *                : at the halfway point
 *
 * hueDecimal is the 'fraction' piece of hueReduced.
 * we are going to use this number to determine the value of the in-between channel.
 *
 * @const {number} x - used in primary-secondary transitions like Red into Yellow
 * @const {number} y - used in secondary-primary transitions like Yellow into Green
   * To understand the function of x and y, take the difference between
   *
   * Sunlgt (hue 50),
   * Citron (hue 70),
   * DgiYlw (hue 60),
   *
   * as an instructive case. These colors are all basically yellow.
   *
   * Sunlgt is hue 50, which puts it near the end of the red-into-yellow region.
     *
     * This means its Red channel is full, and its Green channel is almost full.
     * The fullness of its Green channel is directly proportional to its
     * hueDecimal, the distance from the beginning of this region: 0.833
     *
   * Citron is hue 70, which puts it near the beginning of the yellow-into-green region.
     *
     * This means its Red channel is ALMOST FULL, and its Green channel is FULL.
     * So the fullness of its Red channel is INVERSELY porportional to its
     * hueDecimal, the distance from the beginning of this region: 1 - 0.167 = 0.833
     *
   * DgiYlw is hue 60, which puts it at the very beginning of the yellow-into-green region.
     *
     * This means its Red Channel and its Green channel must both be full.
     * Like Citron, the fullness of DgiYlw's Red channel is inversely proporional to its
     * hueDecimal, which is 0. Therefore DgiYlw's Red channel has a fullness of 1.
   *
 * @returns array of values reflecting the spread between channels
 *
 * DgiRed  case 0:  [   R ===== 1       G = x = 0.000   B ===== 0      ]
 *
 * Sunlgt  case 0:  [   R ===== 1       G = x = 0.833   B ===== 0      ]
 *
 * DgiYlw  case 1:  [   R = y = 1.000   G ===== 1       B ===== 0      ]
 *
 * Citron  case 1:  [   R = y = 0.833   G ===== 1       B ===== 0      ]
 *
 * Turqse  case 2:  [   R ===== 0       G ===== 1       B = x = 0.500  ]
 *
 * here we see detailed breakdowns of the function's final output for our running examples.
 */
export default hue => {
  hue = wrapAround(hue, [0, 360])
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
    default: throw new Error('invalid hue served:', hue)
  }
}
