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
import { Toggle, Slider, TextField, Panel, Dropdown, Icon } from '../Controls'
// Structure
import {
  GradientRow,
  ControlStrip,
  ControlStripSpacer,
  PreviewArea,
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

  const controlPalette = css`${scheme({
    hexes: [hex],
    scheme: schemes.trifactory,
    tuner,
  }).Control}`

  const sliderDimensions = {
    height: 36,
    rangeWidth: 100,
  }

  useEffect(() => {
    setInputHex(specToHex({ ...color, tuner }).substr(1, 6))
  }, [color, tuner])

  const saveThisColor = content => changeColor({ targetIdx: colorIdx, content })
  const previewThisColor = content => changeColor({ targetIdx: colorIdx, content })

  const confirmPreview = () => saveThisColor({ ...color })

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
    previewThisColor({ ...content })
  }

  const togglePrefer = () => {
    const newPrefer = prefer === 'sat'
      ? 'lum'
      : 'sat'
    previewThisColor({ prefer: newPrefer })
  }

  const toggleHueIsLinked = () => saveThisColor({ hueIsLinked: !hueIsLinked })

  const selectHueToLink = value => previewThisColor({
    linkedToHue: value,
    hue: hues.find(hue => hue.name === value).angle,
  })

  return (
    <>
      <PreviewArea hex={preview.hex}>
        <Panel onClick={confirmPreview} />
        <Panel
          onClick={() => deleteColor(colorIdx)}
        />
      </PreviewArea>
      <ControlStrip>
        <ControlCluster>
          <Panel
            onClick={(() => undoChange(colorIdx))}
            dimensions={{ height: 36, width: 36 }}
            cssExtra={controlPalette}
            disabled={color.history.marker === color.history.timeline.length}
          ><Icon value='undo' /></Panel>
          <Panel
            onClick={(() => redoChange(colorIdx))}
            dimensions={{ height: 36, width: 36 }}
            cssExtra={controlPalette}
            disabled={color.history.marker === 0}
          ><Icon value='redo' /></Panel>
        </ControlCluster>

        <TextField
          valueProvided={inputHex}
          validate={validateHex}
          handler={importHex}
          frontMatter='#'
          dimensions={{ fieldWidth: 100 }}
          injectCSS={controlPalette}
          goButton
          undoButton
        />
        <ControlStripSpacer />
        <Toggle
          type='switch'
          dimensions={{ height: 36, trackWidth: 48 }}
          handler={toggleHueIsLinked}
          toggleStateProvided={hueIsLinked}
          injectCSS={controlPalette}
        />
        {hueIsLinked
          ? <>
            <Dropdown
              labelText='Source'
              valueProvided={linkedToHue}
              dimensions={{ width: 100 }}
              handler={selectHueToLink}
              options={hues.map(hue =>
                ({ value: hue.name, label: hue.name })
              )}
              injectCSS={controlPalette}
            />
          </>
          : <Slider
              labelText="Hue"
              handler={value => adjustColorSpec(value, 'hue')}
              valueProvided={hue}
              range={[0, 360]}
              dimensions={sliderDimensions}
              injectCSS={controlPalette}
              numeric
          />
        }
        <Slider
          numeric
          labelText="Saturation"
          handler={value => adjustColorSpec(value, 'sat')}
          valueProvided={sat}
          range={[0, 255]}
          limit={preview.limit.sat}
          dimensions={sliderDimensions}
          injectCSS={controlPalette}

        />
        <Slider
          labelText="Luminosity"
          handler={value => adjustColorSpec(value, 'lum')}
          valueProvided={(lum * 100)}
          range={[0, 100]}
          limit={preview.limit.lum.map(lum => lum * 100)}
          dimensions={sliderDimensions}
          injectCSS={controlPalette}
          numeric
        />
        <Toggle
          id={`prefer-color-${colorIdx}`}
          labelText='Prefer Sat.'
          handler={togglePrefer}
          toggleStateProvided={prefer === 'sat'}
          injectCSS={controlPalette}
          layout='title-left'
        />
      </ControlStrip>
      <ControlStrip>
        <ControlStripSpacer />
        <Toggle
          id={`prefer-color-${colorIdx}-flip`}
          type='switch'
          handler={togglePrefer}
          toggleStateProvided={prefer === 'sat'}
          injectCSS={controlPalette}
        />
      </ControlStrip>
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
