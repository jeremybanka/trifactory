export default ({
  completionRatio = 0.5,
  range: [to, from],
}) => {
  const value = from + completionRatio * (to - from)
  /*
  console.log('||| to', to, 'from', from)
  console.log("||| completionRatio", completionRatio)
  console.log("||| value", value)
  */
  return value
}
