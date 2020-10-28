/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { cssCorePanel, getCssVarsColor } from './controlStyles'

export default ({
  children,
  onClick,
  label,
  colorScheme,
  dimensions = [100, 100],
}) => {
  const cssVarsColor = colorScheme ? getCssVarsColor(colorScheme) : ''
  return (
    <div
      onClick={onClick}
      css={css`
        ${cssCorePanel};
        ${cssVarsColor};
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
