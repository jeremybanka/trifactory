import React from 'react' // eslint-disable-line
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core'
import ChromaticDiagram from './ChromaticDiagram'
import HueControls from './HueControls'

export default function HuesModule({
  hues,
  changeHue,
  addHue,
  deleteHue,
  tuner,
}) {
  return (
    <section
      css={css`
        --ex-bg-color: #444;
        --bg-color: #222;
        --mg-color: #000;
        --fg-color: #aaa;
        background: var(--ex-bg-color);
        .interactive {
          &:hover,
          &.focus,
          &:focus {
            --bg-color: #333;
            --mg-color: #000;
            --fg-color: #fff;
          }
          &:active,
          &.active {
            --bg-color: #111;
            --mg-color: #000;
            --fg-color: #fff;
          }
          &:disabled,
          &.disabled {
            --bg-color: #3a3a3a;
            --mg-color: #000;
            --fg-color: #999;
          }
        }
      `}
    >
      <ChromaticDiagram hues={hues} tuner={tuner} />
      {[...hues, {}].map((hue, hueIdx) =>
        // console.log(hue?.name, [...hues].slice(0, hueIdx))
        <HueControls
          key={`controls-for-${hue?.name}`}
          hue={hue}
          hues={hues}
          hueIdx={hueIdx}
          changeHue={changeHue}
          addHue={addHue}
          deleteHue={deleteHue}
          tuner={tuner}
        />
      )}
    </section>
  )
}
