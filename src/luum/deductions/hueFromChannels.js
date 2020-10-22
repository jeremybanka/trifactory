export default ({ R, G, B }) => {
  let hue
  if(R > G && G >= B) hue = 60 * (0 + (G - B) / (R - B))
  if(G >= R && R > B) hue = 60 * (2 - (R - B) / (G - B))
  if(G > B && B >= R) hue = 60 * (2 + (B - R) / (G - R))
  if(B >= G && G > R) hue = 60 * (4 - (G - R) / (B - R))
  if(B > R && R >= G) hue = 60 * (4 + (R - G) / (B - G))
  if(R >= B && B > G) hue = 60 * (6 - (B - G) / (R - G))
  if(R === G && G === B) hue = 0
  // console.log('||| found hue', hue)
  return hue
}
