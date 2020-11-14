import React, { useState } from 'react'
// luum
import {
  HUE_STRUCTURES,
  builtInTunerKit,
  wrapAround,
} from 'luum'
// Structure
import { App } from './StyleDefinitions'
// Children
import PaletteModule from './PaletteModule'
// temporary
import calibrationSheets from './preconfig/calibrationSheets'

export default function Application() {
  const tuner = builtInTunerKit.simulateCMYK
  const [hues, setHues] = useState(calibrationSheets.satLumTestAndRainbows.hues)
  const [colors, setColors] = useState(calibrationSheets.satLumTestAndRainbows.colors)

  const handleSetColors = changes => {
    const newColors = [...colors]
    for(let index = 0; index < changes.length; index++) {
      const { targetColorIdx, content } = changes[index]
      const targetColor = colors[targetColorIdx]
      const newColor = { ...targetColor, ...content }
      newColors.splice(targetColorIdx, 1, newColor)
    }
    setColors(newColors)
  }
  const getColorChangesFromHueUpdate = () => {
    const changes = []
    for(let index = 0; index < colors.length; index++) {
      const color = colors[index]
      if(typeof color.linkFromHues === 'number') {
        changes.push({
          targetColorIdx: index,
          content: { hue: hues.list[color.linkFromHues] },
        })
      }
    }
    return changes
  }
  const handleSetHues = ({
    paletteMode = hues.paletteMode || 'none',
    primeHue = hues.list[0] || 0,
  }) => {
    const structure = HUE_STRUCTURES[paletteMode]
    const relatedHues = structure.map(angle => {
      const relatedHue = wrapAround(primeHue + angle, [0, 360])
      return relatedHue
    })
    const newList = [primeHue].concat(relatedHues)
    setHues({ paletteMode, list: newList })
    setColors(getColorChangesFromHueUpdate())
    // console.log('>>>', newList)
  }

  return (
    <App className="App">
      {colors.map((color, colorIdx) =>
        <PaletteModule
          key={`color-${colorIdx}`}
          tuner={tuner}
          color={color}
          colorIdx={colorIdx}
          handleSetHues={handleSetHues}
          handleSetColors={handleSetColors}
        />
      )
      }
    </App>
  )
}
