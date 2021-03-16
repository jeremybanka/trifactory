/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { iconCSS } from './css'

const iconLetter = {
  auto: 's',
  check: 'c',
  close: 'x',
  divot: 'v',
  go: 'l',
  minus: '-',
  plus: '+',
  redo: 'r',
  reset: 'u',
  right: 'r',
  undo: 'u',
}

export default function Icon({ value, gridArea = value }) {
  const letter = iconLetter[value]
  return (
    <div
      className={`icon ${value}`}
      css={css`
        ${iconCSS};
        grid-area: ${gridArea};
      `}
    >{letter}</div>
  )
}
