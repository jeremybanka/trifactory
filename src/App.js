import React, { useState } from "react"
import '@atlaskit/css-reset'

import { GEOMETRIC } from './luum/constants'
import {
  hexToSpec,
  specToHex,
} from "./luum/conversions"
import { gradientsToHexArrays } from './luum/mutations'
import { calibrationSheet } from './luum/demo-config/colors'
import { simulateCMYK as tunerConfig } from './luum/demo-config/tuners'
import { wrapAround } from "./luum/utils"

import {
  Panel,
  SliderNumeric,
} from './Controls'

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
  const tuner = tunerConfig
  const [hues, setHues] = useState(calibrationSheet.hues)
  const [colors, setColors] = useState(calibrationSheet.colors)
  const [inputHex, setInputHex] = useState(specToHex({ ...colors[0], tuner }).substr(1, 6))
  const changeInputHex = e => setInputHex(e.target.value)
  const changeHues = ({
    hue = hues.list[0] || 0,
    form = hues.principle || 'none',
  }) => {
    const relatedHues = GEOMETRIC[form].map(transformation => {
      const relatedHue = wrapAround(hue + transformation, [0, 360])
      return relatedHue
    })
    const newList = [hue].concat(relatedHues)
    // console.log('>>>', newList)
    setHues({ form, list: newList })
  }

  const handleSetColors = changes => {
    const newColors = colors
    for(let index = 0; index < changes.length; index++) {
      const change = changes[index]
      const targetColor = colors[change.targetColorIdx]
      const newColor = { ...targetColor, ...change.content }
      newColors.splice(index, 1, newColor)
    }
    setColors(newColors)
  }

  const importHexColor = hex => {
    const { hue, sat, lum } = hexToSpec(hex)
    changeHues({ hue })
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

  return (
    <Main className="App">
      {colors.map((color, colorIdx) => {
        const { hue, sat, lum } = color
        const hex = specToHex({ hue, sat, lum, tuner })
        return (
          <Color key={`color-${colorIdx}`} hex={hex} className="Color">
            <ControlStrip>
              <InputLabel>#</InputLabel>
              <HexInput value={inputHex} onChange={changeInputHex} onKeyDown={handleKeypress} />
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
                value={70}
                range={[0, 360]}
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
