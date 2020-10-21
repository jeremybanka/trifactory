export default function wrapAround(value, [min, max]) {
  while(value >= max) value -= max
  while(value < min) value += max
  return value
}
