/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { specToHex } from 'luum'
import { panelCSS } from '../Controls/css'
import PaletteModuleActive from './PaletteModule'

export default function PaletteModule({
  hues,
  tuner,
  color,
  colorIdx,
  addColor,
  deleteColor,
  changeColor,
  undoChange,
  redoChange,
}) {
  // console.log('color of palette module', colorIdx, color)
  const hex = color ? specToHex({ ...color, tuner }) : null
  return (
    <section
      onClick={color ? null : () => addColor(hues[0])}
      className="PaletteModule"
      css={css`
        ${color ? '' : panelCSS}
        ${color ? '' : `
          --bg-color: #333;
          --fg-color: #aaa;
        `}
        display: block;
        background: ${hex};
        transition-property: ${'all'};
        transition-duration: .3s;
        transition-timing-function: initial;
        max-height: ${color ? 100000 : 100}px;
      `}
    >
      {color === undefined
        ? ('add color')
        : (
          <PaletteModuleActive
            hues={hues}
            tuner={tuner}
            color={color}
            colorIdx={colorIdx}
            deleteColor={deleteColor}
            changeColor={changeColor}
            undoChange={undoChange}
            redoChange={redoChange}
          />
        )
    }
    </section>
  )
}
