import React, { useState, useEffect } from 'react'
// luum
import { hexToSpec } from './luum/import'
import { specToHex, gradientsToHexArrays } from './luum/export'
import getOffset from './luum/getOffset'
import getStandout from './luum/getStandout'
// Controls
import { SliderNumeric, TextField } from './Controls'

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
  const { hue, sat, lum } = color
  const hex = specToHex({ hue, sat, lum, tuner })
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
  const handleSubmit = value => importHexColor(`#${value}`)

  const handleAdjustSpec = e => {
    const content = {}
    const attribute = e.target.id
    let value = parseInt(e.target.value, 10)
    if(attribute === 'lum') value /= 100
    content[attribute] = value
    handleSetColors([{ targetColorIdx: colorIdx, content }])
  }

  const shade = lum => getOffset({
    hex,
    tuner,
    offsets: [{ attribute: 'lum', value: lum / -100 }],
  })

  const colorSchemes = {
    slider: {
      exfg: getStandout(hex),
      exbg: hex,
      fg: [
        getStandout(shade(10)),
        getStandout(shade(5)),
        getStandout(shade(15)),
      ],
      mg: [shade(20), shade(20), shade(20)],
      bg: [shade(10), shade(5), shade(15)],
    },
  }

  return (
    <PaletteModule hex={hex} className="PaletteModule">
      <ControlStrip>
        <TextField
          frontMatter='#'
          passedValue={inputHex}
          validate={validateHex}
          handleSubmit={handleSubmit}
          dimensions={[100, 36]}
          colors={colorSchemes.slider}
        />
        <ControlStripSpacer />
        <SliderNumeric
          label="Hue"
          id='hue'
          handler={handleAdjustSpec}
          initialValue={hue}
          range={[0, 360]}
          dimensions={[120, 36]}
          colors={colorSchemes.slider}
        />
        <SliderNumeric
          label="Sat"
          id='sat'
          handler={handleAdjustSpec}
          initialValue={sat}
          range={[0, 255]}
          dimensions={[120, 36]}
          colors={colorSchemes.slider}
        />
        <SliderNumeric
          label="Lum"
          id='lum'
          handler={handleAdjustSpec}
          initialValue={(lum * 100)}
          range={[0, 100]}
          dimensions={[120, 36]}
          colors={colorSchemes.slider}
        />
      </ControlStrip>
      {gradientsToHexArrays(color, tuner).map((hexGroup, hexGroupIdx) =>
        <GradientRow key={`Color-${colorIdx}-hexGroup-${hexGroup}`}>
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
