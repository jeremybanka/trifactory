/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { specToHex } from 'luum'

export default function ChromaticDiagram({ hues, tuner }) {
  return (
    <div
      css={css`
        display: flex;
        height: 144px;
        width: 100%;
        justify-content: center;
        margin-bottom: 20px;
      `}
    >
      {hues.map(hue =>
        <div
          css={css`
            border-radius:100%;
            display: flex;
            height: 144px;
            width: 144px;
            position: absolute;
            justify-content: flex-end;
            align-items: center;
            transform: rotate(-${hue.angle}deg);
            transition: all 0.5s ease;
            &:first-of-type { 
              background-color: #393939;
            }
            > .dot {
              z-index: 100;
              position: absolute;
              right: -6px;
              border-radius:100%;
              height: 12px;
              width: 12px;
              background-color: ${specToHex({ hue: hue.angle, sat: 255, lum: 1, prefer: 'sat', tuner })};
            }
          `}
          key={`hueball-for-${hue.id}-${hue.hueIsDerived}`}
        >
          <div className='dot' />
        </div>
      ) }
    </div>
  )
}
