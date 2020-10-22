export default hex => {
  const channel = idx => parseInt(hex.substr((idx * 2 + 1), 2), 16)
  return {
    R: channel(0),
    G: channel(1),
    B: channel(2),
  }
}
