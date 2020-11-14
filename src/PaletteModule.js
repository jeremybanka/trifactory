import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
// luum
import {
  hexToSpec,
  specToHex,
  gradientsToHexArrays,
  validateHex,
  scheme,
  templates,
  specToHexFixLimit,
} from 'luum'
// Controls
import { Toggle, Slider, TextField } from './Controls'
// Structure
import {
  PaletteModule,
  GradientRow,
  ControlStrip,
  ControlStripSpacer,
  PreviewArea,
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
  const [previewColor, setPreviewColor] = useState(color)
  const preview = specToHexFixLimit({ ...previewColor, tuner })
  const { hex, limit } = specToHexFixLimit({ hue, sat, lum, prefer, tuner })
  const [inputHex, setInputHex] = useState(hex.substr(1, 6))

  const controlScheme = css`${scheme({
    hexes: [hex],
    scheme: templates.trifactory,
    tuner,
  }).Control}`

  const sliderDimensions = {
    height: 36,
    rangeWidth: 100,
  }

  useEffect(() => {
    setInputHex(specToHex({ ...color, tuner }).substr(1, 6))
  }, [color, tuner])

  const confirmPreview = () => {
    handleSetColors([{ targetColorIdx: colorIdx, content: { ...previewColor } }])
  }

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
    const newColor = { ...previewColor, ...content }
    setPreviewColor(newColor)
    console.log(newColor)
  }

  const handleSetPrefer = () => {
    const content = {}
    prefer === 'sat'
      ? content.prefer = 'lum'
      : content.prefer = 'sat'
    handleSetColors([{ targetColorIdx: colorIdx, content }])
  }

  return (
    <PaletteModule hex={hex} className="PaletteModule">
      <PreviewArea hex={preview.hex}>
        <div onClick={confirmPreview} />
      </PreviewArea>
      <ControlStrip>
        <TextField
          valueProvided={inputHex}
          validate={validateHex}
          handler={handleSubmitHex}
          frontMatter='#'
          dimensions={{ fieldWidth: 100 }}
          injectCSS={controlScheme}
        />
        <ControlStripSpacer />
        <Slider
          labelText="Hue"
          id='hue'
          handler={handleAdjustSpec}
          valueProvided={previewColor.hue}
          range={[0, 360]}
          dimensions={sliderDimensions}
          injectCSS={controlScheme}
          numeric
        />
        <Slider
          labelText="Saturation"
          id='sat'
          handler={handleAdjustSpec}
          valueProvided={previewColor.sat}
          range={[0, 255]}
          limit={preview.limit.sat}
          dimensions={sliderDimensions}
          injectCSS={controlScheme}
          numeric
        />
        <Slider
          labelText="Luminosity"
          id='lum'
          handler={handleAdjustSpec}
          valueProvided={(previewColor.lum * 100)}
          range={[0, 100]}
          limit={preview.limit.lum.map(lum => lum * 100)}
          dimensions={sliderDimensions}
          injectCSS={controlScheme}
          numeric
        />
        <Toggle
          id={`prefer-color-${colorIdx}`}
          labelText='Prefer Sat.'
          handler={handleSetPrefer}
          toggleStateProvided={prefer === 'sat'}
          injectCSS={controlScheme}
          layout='title-left'
        />
      </ControlStrip>
      <ControlStrip>
        <ControlStripSpacer />
        <Toggle
          id={`prefer-color-${colorIdx}-flip`}
          type='switch'
          handler={handleSetPrefer}
          toggleStateProvided={prefer === 'sat'}
          injectCSS={controlScheme}
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
