/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default ({
  hex,
  importHexColor,
}) => (
  <div
    onClick={() => importHexColor(hex)}
    css={css`
      display: inline-flex;
      flex-grow: 1;
      height: 100px;
      background: ${hex};
      transition-property: all;
      transition-duration: .2s;
      transition-timing-function: initial;
      align-items: center;
      justify-content: center;
    `}
  >{hex}</div>
)
