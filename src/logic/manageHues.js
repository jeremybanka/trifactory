import {
  HUE_STRUCTURES,
  wrapAround,
  nameHue,
  funnel,
} from 'luum'
import getRandomInt from '../util/getRandomInt'
import numberedName from '../util/numberedName'

const getDerivedContent = () => ({})

export default (hues, setHues, colors, applyChangesToColors) => {
  const changeHue = (change, workingHues) => {
    let newHues = [...(workingHues || hues)]
    const { targetIdx, content } = change
    const targetHue = newHues[targetIdx]
    const derivedContent = getDerivedContent()
    if(content.deriveHue) {
      const { from, via, to } = content.deriveHue
      console.log(from, via, to)
      const originalHue = newHues.find(hue => hue.name === from)
      const structure = HUE_STRUCTURES[via]
      const angle = originalHue.angle + structure[funnel(to, [0, structure.length - 1])]
      derivedContent.angle = angle
    // console.log('||| originalHue', originalHue)
    // console.log('||| angle', angle)
    }
    const unlinkingHue = content.hueIsDerived === false
    if(unlinkingHue) {
      derivedContent.angle = wrapAround(
        content.angle || derivedContent.angle || targetHue.angle,
        [0, 360])
    }
    const { nameIsDerived } = targetHue
    const nameIsDerivedUnchanged = typeof content.nameIsDerived === 'undefined'
    const nameRemainsDerived = nameIsDerived && nameIsDerivedUnchanged
    const nameBecomesDerived = content.nameIsDerived
    if(nameRemainsDerived || nameBecomesDerived) {
      derivedContent.name = numberedName(nameHue(wrapAround(
        content.angle || derivedContent.angle || targetHue.angle,
        [0, 360])
      ),
      targetIdx, hues)
      console.log('derivedContent', derivedContent)
    }
    const newHue = { ...targetHue, ...content, ...derivedContent }
    newHues.splice(targetIdx, 1, newHue)
    /*
  console.log('||| targetHue', { ...targetHue })
  console.log('||| content', { ...content })
  console.log('||| derivedContent', { ...derivedContent })
  console.log('||| newHue', { ...newHue })
  console.log('||| newHues', [...newHues])
  */
    const hueChangesDownstream = []
    const colorChangesDownstream = []
    for(let hueIdx = 0; hueIdx < hues.length; hueIdx++) {
      const hue = hues[hueIdx]
      if(hue.deriveHue?.from === targetHue.name && hue.hueIsDerived === true) {
        const downstreamHue = { ...hue }
        console.log('~~~ hue named', downstreamHue.name, 'is downstream')
        const { deriveHue } = downstreamHue
        deriveHue.from = newHue.name
        hueChangesDownstream.push({
          targetIdx: hueIdx,
          content: { deriveHue },
        })
      }
    }
    for(let colorIdx = 0; colorIdx < colors.length; colorIdx++) {
      const color = colors[colorIdx]
      if(color.linkedToHue === targetHue.name) {
        let content
        if(color.hueIsLinked) {
          const downstreamColor = { ...color }
          console.log('~~~ color with sat', downstreamColor.sat, 'and lum', downstreamColor.lum, 'is downstream')
          const newLinkedToHue = newHue.name
          const newHueAngle = newHue.angle
          content = {
            linkedToHue: newLinkedToHue,
            hue: wrapAround(newHueAngle, [0, 360]),
          }
        } else {
          content = { linkedToHue: null }
        }
        colorChangesDownstream.push({
          targetIdx: colorIdx,
          content,
        })
      }
    }
    console.log('    hueChangesDownstream', ...hueChangesDownstream)
    console.log('    colorChangesDownstream', ...colorChangesDownstream)
    // invoke side tasks with lists of changes
    if(hueChangesDownstream[0]) newHues = applyChangesToHues(hueChangesDownstream, newHues)
    if(colorChangesDownstream[0]) applyChangesToColors(colorChangesDownstream)
    // if this is a side task, return work in progress
    if(workingHues) return newHues
    // if this is not a side task, finish main task
    if(!workingHues) setHues(newHues)
    console.log('    newHues', ...newHues)
  }

  const applyChangesToHues = (changes, workingHues) => {
    console.log('changes', ...changes)
    let newHues = [...(workingHues || hues)]
    console.log('newHues', ...newHues)
    for(let changeIdx = 0; changeIdx < changes.length; changeIdx++) {
      const change = changes[changeIdx]
      newHues = changeHue(change, newHues)
      // if this is the last of the sidetasks, report back to main task
      if(workingHues && changeIdx === changes.length - 1) return newHues
      // if this is not a side task, finish main task
      if(!workingHues) setHues(newHues)
    }
  }
  const addHue = () => {
    const randomAngle = getRandomInt(360)
    const newHue = {
      id: Math.random(),
      nameIsDerived: true,
      hueIsDerived: false,
      deriveHue: null,
      name: numberedName(nameHue(randomAngle), hues.length, hues),
      angle: randomAngle,
    }
    const newHues = [...hues, newHue]
    setHues(newHues)
  }
  const deleteHue = (targetIdx, workingHues) => {
    let newHues = [...(workingHues || hues)]
    const targetHue = hues[targetIdx]
    const hueChangesDownstream = []
    const colorChangesDownstream = []
    for(let hueIdx = 0; hueIdx < hues.length; hueIdx++) {
      const hue = hues[hueIdx]
      if(hue.deriveHue?.from === targetHue.name) {
        hueChangesDownstream.push({
          targetIdx: hueIdx,
          content: {
            angle: wrapAround(hue.angle, [0, 360]),
            hueIsDerived: false,
            deriveHue: null,
          },
        })
      }
    }
    for(let colorIdx = 0; colorIdx < colors.length; colorIdx++) {
      const color = colors[colorIdx]
      if(color.hueIsLinked && color.linkedToHue === targetHue.name) {
        const downstreamColor = { ...color }
        console.log('~~~ color with sat', downstreamColor.sat, 'and lum', downstreamColor.lum, 'is downstream')
        colorChangesDownstream.push({
          targetIdx: colorIdx,
          content: {
            hueIsLinked: false,
            linkedToHue: null,
          },
        })
      }
    }
    // console.log('    hueChangesDownstream', ...hueChangesDownstream)
    if(hueChangesDownstream[0]) newHues = applyChangesToHues(hueChangesDownstream, newHues)
    if(colorChangesDownstream[0]) applyChangesToColors(colorChangesDownstream)
    newHues.splice(targetIdx, 1)
    setHues(newHues)
  }
  return ([
    changeHue,
    applyChangesToHues,
    addHue,
    deleteHue,
  ])
}
