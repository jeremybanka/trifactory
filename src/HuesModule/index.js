import React from 'react' // eslint-disable-line
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core'
import ChromaticDiagram from './ChromaticDiagram'
import HueControls from './HueControls'

export default function HuesModule({
  hues,
  addHue,
  deleteHue,
  applyChangesToHues,
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
          addHue={addHue}
          deleteHue={deleteHue}
          applyChangesToHues={applyChangesToHues}
          tuner={tuner}
        />
      )}
    </section>
  )
}
