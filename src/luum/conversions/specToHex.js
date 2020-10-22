import specToHexFixLimit from "./specToHexFixLimit"

export default ({ hue, sat, lum, prefer, tuner }) => {
  const { hex } = specToHexFixLimit({ hue, sat, lum, prefer, tuner })
  return hex
}
