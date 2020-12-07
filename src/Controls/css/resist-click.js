import { css } from '@emotion/core'

export const resistClickCSS = css`
&:hover,
&.focus,
&:focus,
&:focus-within {
  &:active { // does not apply to .active
    transform: scale(1.02); // stay at expanded size
    &.disabled,
    &:disabled {
      transform: scale(1);
    }
  }
}
`
