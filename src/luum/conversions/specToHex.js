import specToHexFixLimit from "./specToHexFixLimit"

export default ({ hue, sat, lum, prefer }) => {
  const { hex } = specToHexFixLimit({ hue, sat, lum, prefer })
  return hex
}
