export default function numberedName(name, selfIdx, registry) {
  const nameTemplate = int => `${name}_${int}`
  let generatedName = name
  const sameName = (entry, idx) => entry.name === generatedName && idx !== selfIdx
  for(let index = 2; registry.some(sameName); index++) {
    generatedName = nameTemplate(index)
  }
  return generatedName
}
