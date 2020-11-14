/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { panelCSS } from './css'

const defaultDimensions =
{ height: 100,
  width: 100 }

export default function Panel({
  children,
  onClick,
  label,
  cssExtra,
  gridArea,
  dimensions,
}) {
  const { height, width } = { ...defaultDimensions, ...dimensions }
  return (
    <div
      onClick={onClick}
      css={css`
        ${panelCSS};
        ${cssExtra};
        grid-area: ${gridArea};
        height: ${height}px;
        width: ${width}px;
        align-items: center;
        align-content: center;
        justify-content: center;
        text-align: center;
      `}
    >
      {label || children}
    </div>
  )
}
