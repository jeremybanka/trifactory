import React, { useState } from "react"
import '@atlaskit/css-reset'

import { GEOMETRIC } from './utils/constants'

import {
  hexToColorData,
  colorDataToHex,
} from './utils/conversions'

import { processionsToHexGroups } from './utils/mutations'
import { calibrationSheet } from './utils/configurations'
import wrapAround from "./utils/wrapAround"

import Panel from './Controls/Panel'
import SliderNumeric from './Controls/SliderNumeric'

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
  const [inputHex, setInputHex] = useState('ff0000')
  const [hues, setHues] = useState(calibrationSheet.hues)
  const [colors, setColors] = useState(calibrationSheet.colors)
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
    const { hue, sat, lum } = hexToColorData(hex)
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
        const hex = colorDataToHex({ hue, sat, lum })
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
            {processionsToHexGroups(color).map((hexGroup, hexGroupIdx) =>
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
