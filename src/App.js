import React from 'react'
// luum
import {
  HUE_STRUCTURES,
  builtInTunerKit,
  specToHexFixLimit,
  wrapAround,
  nameHue,
} from 'luum'
// Structure
import { App } from './StyleDefinitions'
// Children
import PaletteModule from './PaletteModule'
// temporary
import calibrationSheets from './preconfig/calibrationSheets'
import useLocalStorageState from './util/useLocalStorageState'
import getRandomInt from './util/getRandomInt'
import HueModule from './HuesModule'
import numberedName from './util/numberedName'

localStorage.clear()

export default function Application() {
  const tuner = builtInTunerKit.simulateCMYK
  const [hues, setHues] = useLocalStorageState('hues', calibrationSheets.default.hues)
  const [colors, setColors] = useLocalStorageState('colors', calibrationSheets.default.colors)

  const changeColor = change => {
    const newColors = [...colors]
    const { targetIdx, content } = change
    const targetColor = newColors[targetIdx]
    const newHistory = { ...targetColor.history }
    let newMarker = newHistory.marker
    const newTimeline = newHistory.timeline
    switch(change.fromHistory) {
      case 'undo': newMarker += 1; break
      case 'redo': newMarker -= 1; break
      default:
        const contentInverse = {}
        const contentKeys = Object.keys(content)
        for(let index = 0; index < contentKeys.length; index++) {
          const contentKey = contentKeys[index]
          contentInverse[contentKey] = targetColor[contentKey]
        }
        const newTimelineStep = {
          undo: contentInverse,
          redo: content,
        }
        newTimeline.splice(0, newMarker, newTimelineStep)
        newMarker = 0
        // console.log('||| newMarker', newMarker)
    }
    newHistory.timeline = newTimeline
    newHistory.marker = newMarker
    const newColor = { ...targetColor, ...content, history: newHistory }
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

  const addColor = () => {
    const randomColorData = {
      hue: hues[0].angle,
      sat: getRandomInt(256),
      lum: Math.random(),
      prefer: 'sat',
    }
    const { fix } = specToHexFixLimit({ ...randomColorData, tuner })
    const newColor = {
      ...randomColorData,
      ...fix,
      hueIsLinked: true,
      linkedToHue: hues[0].name,
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

  const applyChangesToHues = (changes, workingHues) => {
    console.log('changes', ...changes)
    let newHues = [...(workingHues || hues)]
    console.log('newHues', ...newHues)
    for(let changeIdx = 0; changeIdx < changes.length; changeIdx++) {
      const change = changes[changeIdx]
      const { targetIdx, content } = change
      const derivedContent = {}
      if(content.deriveHue) {
        const { from, via, to } = content.deriveHue
        const originalHue = newHues.find(hue => hue.name === from)
        const structure = HUE_STRUCTURES[via]
        const angle = originalHue.angle + structure[to]
        derivedContent.angle = angle
        console.log('||| originalHue', originalHue)
        console.log('||| angle', angle)
      }
      const targetHue = hues[targetIdx]
      if(content.hueIsDerived === false) {
        derivedContent.angle = wrapAround(
          content.angle || derivedContent.angle || targetHue.angle,
          [0, 360])
      }
      if((targetHue.nameIsDerived && typeof content.nameIsDerived === 'undefined') || content.nameIsDerived) {
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
        if(color.hueIsLinked && color.linkedToHue === targetHue.name) {
          const downstreamColor = { ...color }
          console.log('~~~ color with sat', downstreamColor.sat, 'and lum', downstreamColor.lum, 'is downstream')
          const newLinkedToHue = newHue.name
          const newHueAngle = newHue.angle
          colorChangesDownstream.push({
            targetIdx: colorIdx,
            content: {
              linkedToHue: newLinkedToHue,
              hue: newHueAngle,
            },
          })
        }
      }
      console.log('    hueChangesDownstream', ...hueChangesDownstream)
      console.log('    colorChangesDownstream', ...colorChangesDownstream)
      if(hueChangesDownstream[0]) newHues = applyChangesToHues(hueChangesDownstream, newHues)
      if(colorChangesDownstream[0]) applyChangesToColors(colorChangesDownstream)
      if(workingHues && changeIdx === changes.length - 1) return newHues
      if(!workingHues) setHues(newHues)
      console.log('    newHues', ...newHues)
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
    const changesDownstream = []
    for(let hueIdx = 0; hueIdx < hues.length; hueIdx++) {
      const hue = hues[hueIdx]
      const targetHue = hues[targetIdx]
      if(hue.deriveHue?.from === targetHue.name) {
        changesDownstream.push({
          targetIdx: hueIdx,
          content: {
            angle: wrapAround(hue.angle, [0, 360]),
            hueIsDerived: false,
            deriveHue: null,
          },
        })
      }
    }
    console.log('    changesDownstream', ...changesDownstream)
    if(changesDownstream[0]) newHues = applyChangesToHues(changesDownstream, newHues)
    newHues.splice(targetIdx, 1)
    setHues(newHues)
  }
  return (
    <App className="App">
      <HueModule
        hues={hues}
        addHue={addHue}
        deleteHue={deleteHue}
        applyChangesToHues={applyChangesToHues}
        tuner={tuner}
      />
      {[...colors, undefined].map((color, colorIdx) =>
        <PaletteModule
          key={`color-${colorIdx}`}
          hues={hues}
          tuner={tuner}
          color={color}
          colorIdx={colorIdx}
          addColor={addColor}
          deleteColor={deleteColor}
          changeColor={changeColor}
          undoChange={undoChange}
          redoChange={redoChange}
        />
      )}
    </App>
  )
}
// ${color ? color.hue : 0}-${color ? color.sat : 0}-${color ? color.lum : 0}
