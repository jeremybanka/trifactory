export default ({ R, G, B }) => {
  const sat = Math.max(R, G, B) - Math.min(R, G, B)
  // console.log('||| found sat', sat)
  return sat
}
