import React, { useState, useEffect } from 'react'
// luum
import {
  hardContrast,
  softContrast,
  hexToSpec,
  specToHex,
  gradientsToHexArrays,
  getOffset,
  getStandout,
  validateHex,
} from 'luum'
// Controls
import { Toggle, Slider, TextField } from './Controls'

import {
  PaletteModule,
  GradientRow,
  Swatch,
  ControlStrip,
  ControlStripSpacer,
} from './StyleDefinitions'

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
    prefer === 'sat'
      ? content.prefer = 'lum'
      : content.prefer = 'sat'
    handleSetColors([{ targetColorIdx: colorIdx, content }])
  }

  const shade = lum => getOffset({
    hex,
    tuner,
    offsets: [{ attribute: 'lum', offsetValue: lum / -100 }],
  })

  const cc = {
    hardContrast: hardContrast(hex),
    softContrast: softContrast(hex, tuner),
  }

  const colorScheme = {
    exfg: cc.softContrast,
    exbg: hex,
    fg: [cc.softContrast, cc.softContrast, cc.hardContrast],
    mg: [20, 15, 25].map(n => shade(n)),
    bg: [10, 5, 15].map(n => shade(n)),
  }

  const cs = hex => {
    const shade = lum => getOffset({
      hex,
      tuner,
      offsets: [{ attribute: 'lum', offsetValue: lum / -100 }],
    })
    return ({
      n: {
        fg: softContrast(hex, tuner),
        mg: shade(20),
        bg: shade(10),
      },
      f: {
        fg: softContrast(hex, tuner),
        mg: shade(15),
        bg: shade(5),
      },
      a: {
        fg: hardContrast(hex, tuner),
        mg: shade(25),
        bg: shade(15),
      },
    })
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
          id={`prefer-color-${colorIdx}`}
          handler={handleSetPrefer}
          checked={prefer === 'sat'}
          colorScheme={colorScheme}
          templateName='title-left'
        />
      </ControlStrip>
      <ControlStrip>
        <ControlStripSpacer />
        <Toggle
          id={`prefer-color-${colorIdx}-flip`}
          type='switch'
          handler={handleSetPrefer}
          checked={prefer === 'sat'}
          colorScheme={colorScheme}
        />
      </ControlStrip>
      {gradientsToHexArrays(color, tuner).map((hexGroup, hexGroupIdx) =>
        <GradientRow
          key={`Color-${colorIdx}-hexGroup-${hexGroupIdx}`}
          shadeRange={colorIdx === 2}
        >
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
