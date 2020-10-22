import React, { useState } from "react"
// luum
import { HUE_TRANSFORMATION_ARRAYS } from './luum/constants'
import { hexToSpec } from "./luum/import"
import { specToHex, gradientsToHexArrays } from './luum/export'
import { calibrationSheets, builtInTunerKit } from './luum/preconfig'
import { wrapAround } from "./luum/utils"
// Controls
import { Panel, SliderNumeric } from './Controls'

import {
  Main,
  Color,
  Row,
  Swatch,
  Icon,
  ControlStrip,
  HexInput,
  InputLabel,
} from './StyleDefinitions'

export default function App() {
  const tuner = builtInTunerKit.simulateCMYK
  const [hues, setHues] = useState(calibrationSheets.satLumTestAndRainbows.hues)
  const [colors, setColors] = useState(calibrationSheets.satLumTestAndRainbows.colors)
  const [inputHex, setInputHex] = useState(specToHex({ ...colors[0], tuner }).substr(1, 6))
  const handleSetInputHex = e => setInputHex(e.target.value)

  const handleSetHues = ({
    primeHue = hues.list[0] || 0,
    form = hues.principle || 'none',
  }) => {
    const relatedHues = HUE_TRANSFORMATION_ARRAYS[form].map(transformation => {
      const relatedHue = wrapAround(primeHue + transformation, [0, 360])
      return relatedHue
    })
    const newList = [primeHue].concat(relatedHues)
    setHues({
      form,
      list: newList,
    })
    // console.log('>>>', newList)
  }

  const handleSetColors = changes => {
    console.log('>>>', ...changes)
    const newColors = [...colors]
    for(let index = 0; index < changes.length; index++) {
      const { targetColorIdx, content } = changes[index]
      const targetColor = colors[targetColorIdx]
      const newColor = { ...targetColor, ...content }
      console.log('>>>', newColor)
      newColors.splice(index, 1, newColor)
    }
    setColors(newColors)
  }

  const importHexColor = hex => {
    const { hue, sat, lum } = hexToSpec(hex)
    handleSetHues({ hue })
    handleSetColors([{ targetColorIdx: 0, content: { hue, sat, lum } }])
  }
  // console.log('new hues', hues)
  // console.log('new colors', colors)

  const handleSubmit = e => {
    e.preventDefault()
    importHexColor(`#${inputHex}`)
  }

  const handleKeypress = e => {
    // it triggers by pressing the enter key
    // console.log(e.keyCode)
    if(e.keyCode === 13) {
      handleSubmit(e)
    }
  }

  const adjustHue = (e, colorIdx) => {
    const hue = parseInt(e.target.value, 10)
    handleSetColors([{ targetColorIdx: colorIdx, content: { hue } }])
  }
  const adjustSat = (e, colorIdx) => {
    const sat = parseInt(e.target.value, 10)
    handleSetColors([{ targetColorIdx: colorIdx, content: { sat } }])
  }
  const adjustLum = (e, colorIdx) => {
    const lum = (parseInt(e.target.value, 10)) / 100
    handleSetColors([{ targetColorIdx: colorIdx, content: { lum } }])
  }

  return (
    <Main className="App">
      {colors.map((color, colorIdx) => {
        const { hue, sat, lum } = color
        const hex = specToHex({ hue, sat, lum, tuner })
        return (
          <Color key={`color-${colorIdx}`} hex={hex} className="Color">
            <ControlStrip>
              <InputLabel>#</InputLabel>
              <HexInput value={inputHex} onChange={handleSetInputHex} onKeyDown={handleKeypress} />
              <Panel
                label=''
                colorIdx={colorIdx}
                onClick={handleSubmit}
                dimensions={[36, 36]}
                colors={{
                  fg: [`#${inputHex}`, 'black', 'black'],
                  bg: ['black', `#${inputHex}`, `#${inputHex}`],
                }}
              >
                <Icon>
                  R
                </Icon>
              </Panel>
              <SliderNumeric
                label="Hue"
                handler={e => adjustHue(e, colorIdx)}
                initialValue={70}
                range={[0, 360]}
                dimensions={[120, 36]}
                colors={{
                  fg: ['black', 'white', 'white'],
                  bg: ['white', 'black', 'black'],
                }}
              />
              <SliderNumeric
                label="Sat"
                handler={e => adjustSat(e, colorIdx)}
                initialValue={80}
                range={[0, 255]}
                dimensions={[120, 36]}
                colors={{
                  fg: ['black', 'white', 'white'],
                  bg: ['white', 'black', 'black'],
                }}
              />
              <SliderNumeric
                label="Lum"
                handler={e => adjustLum(e, colorIdx)}
                initialValue={0.5}
                range={[0, 100]}
                dimensions={[120, 36]}
                colors={{
                  fg: ['black', 'white', 'white'],
                  bg: ['white', 'black', 'black'],
                }}
              />
            </ControlStrip>
            {gradientsToHexArrays(color, tuner).map((hexGroup, hexGroupIdx) =>
              <Row key={`Color-${colorIdx}-hexGroup-${hexGroup}`}>
                {hexGroup.map((hex, hexIdx) =>
                  <Swatch
                    hex={hex}
                    key={`Color-${colorIdx}-Row-${hexGroupIdx}-Swa-${hexIdx}`}
                  >{hex}</Swatch>
                )}
              </Row>
            )}
          </Color>
        )
      })
      }
    </Main>
  )
}
