/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { keyStyle } from './controlStyles'

export default function Panel({
  children,
  onClick,
  label,
  colors,
  dimensions = [100, 100],
}) {
  const customColorStyles = colors
    ? css`
      --bg-color: ${colors.bg[0]};
      --fg-color: ${colors.fg[0]};
      &:hover, 
      &:focus {
        --bg-color: ${colors.bg[1]};
        --fg-color: ${colors.fg[1]};
      }
      &:active {
        --bg-color: ${colors.bg[2]};
        --fg-color: ${colors.fg[2]};
      }
      `
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
