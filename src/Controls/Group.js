/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { cssGroup } from './css/group'

export default function ControlGroup({
  children,
  gap,
  gridTemplate,
}) {
  const gapContent = typeof gap === 'object'
    ? css`
        column-gap: ${gap[0]}px;
        row-gap: ${gap[1]}px;
      `
    : css`
        gap: ${gap}px;
      `

  return (
    <div
      css={css`
        ${cssGroup};
        ${gapContent};
        grid-template: ${gridTemplate};
      `}
    >
      {children}
    </div>
  )
}
