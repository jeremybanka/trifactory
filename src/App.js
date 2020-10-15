import React, { useState } from "react"
import '@atlaskit/css-reset'
import lumaConst from './utils/lumaConstRGB'
import chromataConst from './utils/chromataConst'
import hueToChannelFactors from './utils/hueToChannelFactors'
import inherentLumaFromHue from './utils/inherentLumaFromHue'
import Panel from './Controls/Panel'
import {
  Main,
  Color,
  Row,
  Swatch,
  Icon,
  ControlStrip,
  HexInput,
  InputLabel,
} from './StyledComponents'

/*
type prefer = 'sat' | 'lum'
type channelObj = {
  R: number,
  G: number,
  B: number
}
type hslObj = {
  hue: number,
  sat: number,
  lum: number
}
*/
function hexToChannels(hex) {
  const channel = idx => parseInt(hex.substr((idx * 2 + 1), 2), 16)
  return {
    R: channel(0),
    G: channel(1),
    B: channel(2),
  }
}

const channelsToHex = channels =>
  `#${Object.values(channels).map(channel => {
    let channelHex = channel.toString(16)
    if(channelHex.length === 1) channelHex = 0 + channelHex
    return channelHex
  }).join('')}`

function channelsToHue({ R, G, B }) {
  let hue
  if(R > G && G >= B) hue = 60 * (0 + (G - B) / (R - B))
  if(G >= R && R > B) hue = 60 * (2 - (R - B) / (G - B))
  if(G > B && B >= R) hue = 60 * (2 + (B - R) / (G - R))
  if(B >= G && G > R) hue = 60 * (4 - (G - R) / (B - R))
  if(B > R && R >= G) hue = 60 * (4 + (R - G) / (B - G))
  if(R >= B && B > G) hue = 60 * (6 - (B - G) / (R - G))
  if(R === G && G === B) hue = 0
  return hue
}

function channelsToSat({ R, G, B }) {
  const hueArray = [R, G, B]
  return Math.max(...hueArray) - Math.min(...hueArray)
}

function channelsToLum({ R, G, B }) {
  return lumaConst.R * R / 255 + lumaConst.G * G / 255 + lumaConst.B * B / 255
}

function colorDataToHex({ hue, sat, lum, prefer = 'sat' }) {
  const channelFactors = hueToChannelFactors(hue)
  function getChannelSpread(actualSat) {
    const saturate = channel => Math.round(channelFactors[channel] * actualSat)
    return {
      R: saturate(0),
      G: saturate(1),
      B: saturate(2),
    }
  }

  let trueSaturation
  let trueLuminosity
  let minChannels
  let minLum
  let maxLum

  if(prefer === 'sat') {
    trueSaturation = Math.floor(sat)

    minChannels = getChannelSpread(trueSaturation)
    const maxChannels = {
      R: minChannels.R + 255 - trueSaturation,
      G: minChannels.G + 255 - trueSaturation,
      B: minChannels.B + 255 - trueSaturation,
    }
    minLum = channelsToLum(minChannels)
    maxLum = channelsToLum(maxChannels)

    trueLuminosity = lum <= maxLum && lum >= minLum
      ? lum
      : lum < minLum
        ? minLum
        : maxLum
    /*
    console.log('||| trueSaturation', trueSaturation)
    console.log('||| idealLum', lum)
    console.log('||| minChannels', minChannels)
    console.log('||| minLum', minLum)
    console.log('||| maxChannels', maxChannels)
    console.log('||| maxLum', maxLum)
    console.log('||| trueLuminosity', trueLuminosity)
    */
  }
  if(prefer === 'lum') {
    trueLuminosity = lum > 1 ? 1 : lum < 0 ? 0 : lum
    const lumaAtSat255 = inherentLumaFromHue(hue)
    const maxSat = Math.round(trueLuminosity <= lumaAtSat255
      ? 255 * (trueLuminosity / lumaAtSat255)
      : 255 * (1 - trueLuminosity) / (1 - lumaAtSat255))
    trueSaturation = Math.min(sat, maxSat)
    minChannels = getChannelSpread(trueSaturation)
    minLum = channelsToLum(minChannels)
    /*
    console.log('||| trueLuminosity', trueLuminosity)
    console.log('||| lumaAtSat255', lumaAtSat255)
    console.log('||| maxSat', maxSat)
    console.log('||| trueSaturation', trueSaturation)
    console.log('||| minChannels', minChannels)
    */
  }
  let white = Math.round((trueLuminosity - minLum) * 255)
  white = white > 255 ? 255 : white < 0 ? 0 : white
  const channels = {
    R: minChannels.R + white,
    G: minChannels.G + white,
    B: minChannels.B + white,
  }
  const hex = channelsToHex(channels)
  /*
  console.log('||| white', white)
  console.log('... channels', channels) */
  console.log('--- newHex', hex)

  return { hex, trueSaturation, trueLuminosity }
}

function hexToColorData(hex) {
  console.log('+++ input hex', hex)
  const { R, G, B } = hexToChannels(hex)
  console.log('||| R', R)
  console.log('||| G', G)
  console.log('||| B', B)
  const hue = channelsToHue({ R, G, B })
  // console.log('||| found hue', hue)
  const sat = channelsToSat({ R, G, B })
  // console.log('||| found sat', sat)
  const lum = channelsToLum({ R, G, B })
  // console.log('||| found lum', lum)
  return { hue, sat, lum }
}

function variationsToHexGroups(colorObj) {
  const hexGroups = []
  let prefer
  const { hue, sat, lum, variations } = colorObj
  for(let varIdx = 0; varIdx < variations.length; varIdx++) {
    const hexGroup = []
    const { steps, axes } = variations[varIdx]
    for(let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      const step = steps[stepIdx]
      const transformation = {}
      for(let axisIdx = 0; axisIdx < axes.length; axisIdx++) {
        const axis = axes[axisIdx]
        const max = axis.max || colorObj[axis.id]
        const min = (typeof axis.min === 'number')
          ? axis.min
          : colorObj[axis.id]
        transformation[axis.id] = step * (max - min) + min
        prefer = axis.id
      }
      const { hex } = colorDataToHex({ hue, sat, lum, prefer, ...transformation })
      hexGroup.push(hex)
    }
    hexGroups.push(hexGroup)
  }
  return hexGroups
}

export default function App() {
  const [inputHex, setInputHex] = useState('ff0000')
  const [hues, setHues] = useState({
    principle: 'polar',
    list: [0, 180],
  })
  const [colors, setColors] = useState([
    {
      link: true,
      linkedHue: 0,
      hue: 89,
      sat: 50,
      lum: 0.60,
      prefer: 'lum',
      variations: [
        {
          axes: [
            {
              id: 'lum',
              min: 0,
              max: 1,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
        {
          axes: [
            {
              id: 'sat',
              min: 0,
              max: 255,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
        {
          axes: [
            {
              id: 'hue',
              min: 5,
              max: 55,
            },
            {
              id: 'sat',
              min: 255,
              max: 255,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
        {
          axes: [
            {
              id: 'hue',
              min: 190,
              max: 250,
            },
            {
              id: 'sat',
              min: 255,
              max: 255,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
      ],
    },
  ],
  )
  const changeInputHex = e => setInputHex(e.target.value)
  const changeHues = (
    {
      hue = hues.list[0] || 0,
      principle = hues.principle || 'none',
    }) => {
    const relatedHues = chromataConst[principle].map(transformation => {
      let relatedHue = hue + transformation
      while(relatedHue >= 360) relatedHue -= 360
      while(relatedHue < 0) relatedHue += 360
      return relatedHue
    })
    const newList = [hue].concat(relatedHues)
    console.log('>>>', newList)
    setHues({ principle, list: newList })
  }

  const changeColors = changes => {
    const newColors = colors
    for(let index = 0; index < changes.length; index++) {
      const change = changes[index]
      const currentColor = colors[change.color]
      const newColor = { ...currentColor, ...change.what }
      newColors.splice(index, 1, newColor)
    }
    setColors(newColors)
  }

  const importHexColor = hex => {
    const { hue, sat, lum } = hexToColorData(hex)
    changeHues({ hue })
    changeColors([
      { color: 0, what: { hue, sat, lum } },
    ])
  }
  console.log('new hues', hues)
  console.log('new colors', colors)

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
  // colorDataToHex(0, 254, .1)
  // colorDataToHex(0, 254, .1, 'lum')

  return (
    <Main className="App">
      {colors.map((color, colorIdx) => {
        const { hue, sat, lum } = color
        const { hex } = colorDataToHex({ hue, sat, lum })
        return (
          <Color key={`color-${colorIdx}`} hex={hex} className="Color">
            <ControlStrip>
              <InputLabel>#</InputLabel>
              <HexInput value={inputHex} onChange={changeInputHex} onKeyDown={handleKeypress} />
              <Panel
                label=''
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
            </ControlStrip>
            {variationsToHexGroups(color).map((hexGroup, hexGroupIdx) =>
              <Row key={`Color-${colorIdx}-hexGroup-${hexGroup}`}>
                {hexGroup.map((hex, hexIdx) =>
                  <Swatch hex={hex} key={`Color-${colorIdx}-Row-${hexGroupIdx}-Swa-${hexIdx}`}>
                    {hex}
                  </Swatch>
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
