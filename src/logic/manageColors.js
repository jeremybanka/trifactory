import { specToHexFixLimit, wrapAround } from 'luum'
import getRandomInt from '../util/getRandomInt'

const deriveCompleteChange = (content, targetColor, hues) => {
  const contentDerived = {}
  const hueWillChange = content.hue
  const colorHasLinkedHue = targetColor.linkedToHue
  const hueIsNotLinked = !targetColor.hueIsLinked
  if(hueWillChange && colorHasLinkedHue && hueIsNotLinked) {
    contentDerived.linkedToHue = null
  }
  const hueToLink = content.linkedToHue
  if(hueToLink && !hueWillChange) {
    contentDerived.hue = wrapAround(
      hues.find(hue => hue.name === hueToLink).angle,
      [0, 360]
    )
  }
  const willLinkToNull = hueToLink === null
  if(willLinkToNull) contentDerived.hueIsLinked = false
  return contentDerived
}

export default (colors, setColors, tuner, hues) => {
  const changeColor = change => {
    const newColors = [...colors]
    const { targetIdx, content } = change
    const targetColor = newColors[targetIdx]
    const contentDerived = deriveCompleteChange(content, targetColor, hues)
    const contentComplete = { ...content, ...contentDerived }
    const newHistory = { ...targetColor.history }
    let newMarker = newHistory.marker
    const newTimeline = newHistory.timeline
    switch(change.fromHistory) {
      case 'undo': newMarker += 1; break
      case 'redo': newMarker -= 1; break
      default:
        const contentInverse = {}
        const contentKeys = Object.keys(contentComplete)
        for(let index = 0; index < contentKeys.length; index++) {
          const contentKey = contentKeys[index]
          contentInverse[contentKey] = targetColor[contentKey]
        }
        const newTimelineStep = {
          undo: contentInverse,
          redo: { ...content, ...contentDerived },
        }
        newTimeline.splice(0, newMarker, newTimelineStep)
        newMarker = 0
      // console.log('||| newMarker', newMarker)
    }
    newHistory.timeline = newTimeline
    newHistory.marker = newMarker
    const newColor = {
      ...targetColor,
      ...contentComplete,
      history: newHistory,
    }
    newColors.splice(targetIdx, 1, newColor)
    setColors(newColors)
    /*
  console.log('change.fromHistory', change.fromHistory)
  console.log('newHistory', newHistory)
  console.log('timeline', ...newTimeline)
  */
  }
  const applyChangesToColors = changes => {
    for(let index = 0; index < changes.length; index++) {
      const change = changes[index]
      changeColor(change)
    }
  }
  const traverseTimeline = (targetColorIdx, direction) => {
    const { timeline, marker } = colors[targetColorIdx].history
    const markerFromDirection =  direction === 'undo' ? marker : marker - 1
    if(typeof timeline[markerFromDirection] === 'undefined') return
    changeColor({
      targetIdx: targetColorIdx,
      content: timeline[markerFromDirection][direction],
      fromHistory: direction,
    })
  }
  const undoChange = targetColorIdx => traverseTimeline(targetColorIdx, 'undo')
  const redoChange = targetColorIdx => traverseTimeline(targetColorIdx, 'redo')

  const addColor = hue => {
    const randomColorData = {
      hue: hue.angle,
      sat: getRandomInt(256),
      lum: Math.random(),
      prefer: 'sat',
    }
    const { fix } = specToHexFixLimit({ ...randomColorData, tuner })
    const newColor = {
      ...randomColorData,
      ...fix,
      id: Math.random(),
      hueIsLinked: true,
      linkedToHue: hue.name,
      history: {
        marker: 0,
        timeline: [],
      },
      gradients: [],
    }
    const newColors = [...colors, newColor]
    setColors(newColors)
  }
  const deleteColor = targetColorIdx => {
    const newColors = [...colors]
    newColors.splice(targetColorIdx, 1)
    setColors(newColors)
  }

  return [
    changeColor,
    applyChangesToColors,
    undoChange,
    redoChange,
    addColor,
    deleteColor,
  ]
}
