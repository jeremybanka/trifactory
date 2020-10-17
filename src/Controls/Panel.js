/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { keyStyle, getColorStyles } from './controlStyles'

export default function Panel({
  children,
  onClick,
  label,
  colors,
  dimensions = [100, 100],
}) {
  const customColorStyles = colors
    ? getColorStyles(colors)
    : ''
  console.log(colors)
  return (
    <div
      onClick={onClick}
      css={css`
        ${keyStyle};
        ${customColorStyles};
        height: ${dimensions[1]}px;
        width: ${dimensions[0]}px;
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
