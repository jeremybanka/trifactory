import { useState } from "react"
import '@atlaskit/css-reset'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import "./App.css"
import { hexToHsluv, hsluvToHex } from "hsluv"
import Panel from "./Controls/Panel"

const SIMPLE_CONFIG = {
  mainColors: [
    {
      hex: '#ff0000',
      variations: [],
    },
  ],
  neutralColors: [],
}

export default function App() {
  const [mainColor, setMainColor] = useState('#ff0000')
  const [goClicked, setGoClicked] = useState(false)
  const changeMainColor = e => setMainColor(e.target.value)
  const letsGo = e => {
    setGoClicked(!goClicked)
    e.preventDefault()
  }

  let colorDivs
  if(goClicked) {
    const [hue, saturation] = hexToHsluv(mainColor)
    const transformations = [10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 94, 97]
    const hexCodes = transformations.map(modLightness => hsluvToHex([hue, saturation, modLightness]))
    colorDivs = hexCodes.map(hexCode => (
      <div
        key={hexCode}
        css={css`${`
          background-color: ${hexCode}
        `}`}
      >
        {hexCode}
      </div>
    ))
  }
  return (
    <div
      className="App"
      css={css`${`
        background-color: #eee;
        text-align: center;
        flex-grow: 1;
        height: 100vh;
        width: 100vw;
      `}`}
    >
      <p className="bigIcon" style={{ color: mainColor }}>
        R
      </p>
      <form>
        <div
          css={css`${`
            display: inline-flex;            
        `}`}
        >
          <Panel label='Panel' onClick={letsGo} />
        </div>
        <label>Label </label>
        <input value={mainColor} onChange={changeMainColor} />
        <button type='button' onClick={letsGo}> go </button>
      </form>
      {colorDivs}
    </div>
  )

}
