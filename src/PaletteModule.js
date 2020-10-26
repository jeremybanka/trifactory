import React, { useState, useEffect } from 'react'
// luum
import { hexToSpec } from './luum/import'
import { specToHex, gradientsToHexArrays } from './luum/export'
import getOffset from './luum/getOffset'
import getStandout from './luum/getStandout'
// Controls
import { Toggle, Slider, TextField } from './Controls'

import {
  PaletteModule,
  GradientRow,
  Swatch,
  ControlStrip,
  ControlStripSpacer,
} from './StyleDefinitions'
import { validateHex } from './luum/utils'

export default ({
  tuner,
  color,
  colorIdx,
  handleSetHues,
  handleSetColors,
}) => {
  const { hue, sat, lum, prefer } = color
  const hex = specToHex({ hue, sat, lum, prefer, tuner })
  const [inputHex, setInputHex] = useState(hex.substr(1, 6))

  useEffect(() => {
    setInputHex(specToHex({ ...color, tuner }).substr(1, 6))
  }, [color, tuner])

  const importHexColor = input => {
    const hex = validateHex.process(input)
    const { hue, sat, lum } = hexToSpec(hex)
    handleSetHues({ hue })
    handleSetColors([{ targetColorIdx: colorIdx, content: { hue, sat, lum } }])
  }
  const handleSubmitHex = value => importHexColor(`#${value}`)

  const handleAdjustSpec = e => {
    const content = {}
    const attribute = e.target.id
    let value = parseInt(e.target.value, 10)
    if(attribute === 'lum') value /= 100
    content[attribute] = value
    handleSetColors([{ targetColorIdx: colorIdx, content }])
  }

  const handleSetPrefer = e => {
    console.log(e.target.value)
    const content = {}
    prefer === 'lum'
      ? content.prefer = 'sat'
      : content.prefer = 'lum'
    handleSetColors([{ targetColorIdx: colorIdx, content }])
  }

  const shade = lum => getOffset({
    hex,
    tuner,
    offsets: [{ attribute: 'lum', value: lum / -100 }],
  })

  const colorScheme = {
    exfg: getStandout(hex),
    exbg: hex,
    fg: [
      getStandout(shade(10)),
      getStandout(shade(5)),
      getStandout(shade(15)),
    ],
    mg: [shade(20), shade(20), shade(20)],
    bg: [shade(10), shade(5), shade(15)],
  }

  return (
    <PaletteModule hex={hex} className="PaletteModule">
      <ControlStrip>
        <TextField
          frontMatter='#'
          passedValue={inputHex}
          validate={validateHex}
          handler={handleSubmitHex}
          dimensions={[100, 36]}
          colorScheme={colorScheme}
        />
        <ControlStripSpacer />
        <Slider
          label="Hue"
          id='hue'
          handler={handleAdjustSpec}
          initialValue={hue}
          range={[0, 360]}
          dimensions={[150, 36]}
          colorScheme={colorScheme}
          numeric
        />
        <Slider
          label="Saturation"
          id='sat'
          handler={handleAdjustSpec}
          initialValue={sat}
          range={[0, 255]}
          dimensions={[150, 36]}
          colorScheme={colorScheme}
          numeric
        />
        <Slider
          label="Luminosity"
          id='lum'
          handler={handleAdjustSpec}
          initialValue={(lum * 100)}
          range={[0, 100]}
          dimensions={[150, 36]}
          colorScheme={colorScheme}
          numeric
        />
        <Toggle
          id='prefer'
          handler={handleSetPrefer}
          checked={prefer === 'sat'}
        />
      </ControlStrip>
      {gradientsToHexArrays(color, tuner).map((hexGroup, hexGroupIdx) =>
        <GradientRow key={`Color-${colorIdx}-hexGroup-${hexGroupIdx}`}>
          {hexGroup.map((hex, hexIdx) =>
            <Swatch
              hex={hex}
              key={`Color-${colorIdx}-Row-${hexGroupIdx}-Swa-${hexIdx}`}
            ><div onClick={() => importHexColor(hex)}>{hex}</div></Swatch>
          )}
        </GradientRow>
      )}
    </PaletteModule>
  )
}
