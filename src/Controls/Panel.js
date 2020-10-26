/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { keyStyle, getColorStyles } from './controlStyles'

export default ({
  children,
  onClick,
  label,
  colors,
  dimensions = [100, 100],
}) => {
  const customColorStyles = colors
    ? getColorStyles(colors)
    : ''
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
