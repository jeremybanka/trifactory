import React, { useState, useEffect } from 'react'
// luum
import {
  hardContrast,
  softContrast,
  hexToSpec,
  specToHex,
  gradientsToHexArrays,
  getOffset,
  validateHex,
} from 'luum'
// Controls
import { Toggle, Slider, TextField } from './Controls'
// Structure
import {
  PaletteModule,
  GradientRow,
  ControlStrip,
  ControlStripSpacer,
} from './StyleDefinitions'
// Children
import Swatch from './Swatch'

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

  const handleSetPrefer = () => {
    const content = {}
    prefer === 'sat'
      ? content.prefer = 'lum'
      : content.prefer = 'sat'
    handleSetColors([{ targetColorIdx: colorIdx, content }])
  }

  // COLOR CONTEXT ARCHITECTURE CURRENT REVISION
  const shade = lum => getOffset({
    hex,
    tuner,
    offsets: [{ attribute: 'lum', offsetValue: lum / -100 }],
  })

  const colorContext = {
    hardContrast: hardContrast(hex),
    softContrast: softContrast(hex, tuner),
  }

  const colorScheme = {
    exfg: colorContext.softContrast,
    exbg: hex,
    fg: [colorContext.softContrast, colorContext.softContrast, colorContext.hardContrast],
    mg: [20, 15, 25].map(n => shade(n)),
    bg: [10, 5, 15].map(n => shade(n)),
  }

  // COLOR CONTEXT ARCHITECTURE WIP
  const colorSchemeDraft = hex => {
    const shade = lum => getOffset({
      hex,
      tuner,
      offsets: [{ attribute: 'lum', offsetValue: lum / -100 }],
    })
    return ({
      neutral: {
        fg: softContrast(hex, tuner),
        mg: shade(20),
        bg: shade(10),
      },
      focus: {
        fg: softContrast(hex, tuner),
        mg: shade(15),
        bg: shade(5),
      },
      active: {
        fg: hardContrast(hex, tuner),
        mg: shade(25),
        bg: shade(15),
      },
      disabled: {
        fg: shade(30),
        mg: shade(15),
        bg: shade(5),
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
          label='Prefer Sat.'
          handler={handleSetPrefer}
          checkProvided={prefer === 'sat'}
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
          checkProvided={prefer === 'sat'}
          colorScheme={colorScheme}
          dimensions={[40, 24]}
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
              importHexColor={importHexColor}
              key={`Color-${colorIdx}-Row-${hexGroupIdx}-Swa-${hexIdx}`}
            />
          )}
        </GradientRow>
      )}
    </PaletteModule>
  )
}
