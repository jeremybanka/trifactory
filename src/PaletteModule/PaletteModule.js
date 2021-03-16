import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
// luum
import {
  hexToSpec,
  specToHex,
  gradientsToHexArrays,
  validateHex,
  scheme,
  schemes,
  specToHexFixLimit,
} from 'luum'
// Controls
import {
  Toggle,
  Slider,
  TextField,
  Panel,
  Dropdown,
  Icon,
  ControlGroup,
} from '../Controls'
// Structure
import {
  GradientRow,
  ControlCluster,
} from '../StyleDefinitions'
// Children
import Swatch from './Swatch'

export default function PaletteModule({
  hues,
  tuner,
  color,
  colorIdx,
  deleteColor,
  changeColor,
  undoChange,
  redoChange,
}) {
  const { hue, sat, lum, prefer, hueIsLinked, linkedToHue } = color
  const preview = specToHexFixLimit({ ...color, tuner })
  const hex = specToHex({ ...color, tuner })
  const [inputHex, setInputHex] = useState(hex.substr(1, 6))

  useEffect(() => {
    setInputHex(specToHex({ ...color, tuner }).substr(1, 6))
  }, [color, tuner])

  const saveThisColor = content => changeColor({ targetIdx: colorIdx, content })

  const importHex = value => {
    const hex = validateHex.process(`#${value}`)
    const { hue, sat, lum } = hexToSpec(hex)
    saveThisColor({ hue, sat, lum, hueIsLinked: false })
  }

  const adjustColorSpec = (output, attribute) => {
    let value = output
    if(typeof value !== 'number') value = parseInt(output, 10)
    if(attribute === 'lum') value /= 100
    const content = {}
    content[attribute] = value
    console.log(colorIdx, content)
    saveThisColor({ ...content })
  }

  const togglePrefer = () => {
    const newPrefer = prefer === 'sat' ? 'lum' : 'sat'
    saveThisColor({ prefer: newPrefer })
  }

  const toggleHueIsLinked = () => saveThisColor({ hueIsLinked: !hueIsLinked })

  const selectHueToLink = value => saveThisColor({ linkedToHue: value })

  const controlPalette = css`${scheme({
    hexes: [hex],
    scheme: schemes.trifactory,
    tuner,
  }).Control}`

  const sliderDimensions = {
    height: 36,
  }

  return (
    <>
      <ControlGroup
        gap={2}
        gridTemplate='
          [row1-start] "undo redo .    close" auto [row1-end]
          /             0fr  0fr  1fr  0fr'
      >
        <Panel
          handler={(() => undoChange(colorIdx))}
          disabled={color.history.marker === color.history.timeline.length}
          gridArea='undo'
          cssExtra={controlPalette}
          dimensions={{ height: 36, width: 36 }}
        ><Icon value='undo' /></Panel>
        <Panel
          handler={(() => redoChange(colorIdx))}
          disabled={color.history.marker === 0}
          gridArea='redo'
          cssExtra={controlPalette}
          dimensions={{ height: 36, width: 36 }}
        ><Icon value='redo' /></Panel>
        <Panel
          handler={() => deleteColor(colorIdx)}
          dimensions={{ height: 36, width: 36 }}
          gridArea='close'
          cssExtra={controlPalette}
        ><Icon value='close' /></Panel>
      </ControlGroup>
      <TextField
        valueProvided={inputHex}
        validate={validateHex}
        handler={importHex}
        frontMatter='#'
        dimensions={{ fieldWidth: 100 }}
        cssExtra={controlPalette}
        goButton
        undoButton
      />
      <ControlGroup
        gap={[2, 10]}
        gridTemplate='
          [row1-start] "linked hue" auto [row1-end]
          [row2-start] "switch sat" auto [row2-end]
          [row3-start] "switch lum" auto [row3-end]
          /             0fr   1fr
          '
      >
        <Slider
          label="Hue"
          handler={value => adjustColorSpec(value, 'hue')}
          valueProvided={hue}
          disabled={hueIsLinked}
          range={[0, 360]}
          dimensions={sliderDimensions}
          gridArea='hue'
          cssExtra={controlPalette}
          numeric
        />
        <ControlCluster gridArea='linked'>
          <Dropdown
            label='Source'
            valueProvided={linkedToHue}
            handler={selectHueToLink}
            dimensions={{ width: 100 }}
            options={[
              { value: null, label: '--' },
              ...hues.map(hue =>
                ({ value: hue.name, label: hue.name })
              )]}
            cssExtra={controlPalette}
          />
          <Toggle
            type='key'
            icon='auto'
            dimensions={{ height: 36, trackWidth: 48 }}
            handler={toggleHueIsLinked}
            disabled={linkedToHue === null}
            toggleStateProvided={hueIsLinked}
            cssExtra={controlPalette}
          />
        </ControlCluster>
        <Slider
          numeric
          label="Saturation"
          handler={value => adjustColorSpec(value, 'sat')}
          valueProvided={sat}
          range={[0, 255]}
          limit={preview.limit.sat}
          dimensions={sliderDimensions}
          gridArea='sat'
          cssExtra={controlPalette}
        />
        <Toggle
          id={`prefer-color-${colorIdx}-flip`}
          type='switch'
          label={{ text: 'Prefer', optionA: 'Saturation', optionB: 'Luminosity' }}
          dimensions={{ height: 36, trackWidth: 48 }}
          handler={togglePrefer}
          toggleStateProvided={prefer === 'lum'}
          cssExtra={controlPalette}
        />
        <Slider
          label="Luminosity"
          handler={value => adjustColorSpec(value, 'lum')}
          valueProvided={(lum * 100)}
          range={[0, 100]}
          limit={preview.limit.lum.map(lum => lum * 100)}
          dimensions={sliderDimensions}
          gridArea='lum'
          cssExtra={controlPalette}
          numeric
        />
      </ControlGroup>
      {gradientsToHexArrays(color, tuner).map((hexArray, hexArrayIdx) =>
        <GradientRow
          key={`Color-${colorIdx}-hexGroup-${hexArrayIdx}`}
          shadeRange={colorIdx === 2}
        >
          {hexArray.map((hex, hexIdx) =>
            <Swatch
              hex={hex}
              importHexColor={importHex}
              key={`Color-${colorIdx}-Row-${hexArrayIdx}-Swa-${hexIdx}`}
            />
          )}
        </GradientRow>
      )}
    </>
  )
}
