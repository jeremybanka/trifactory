import { css } from '@emotion/core'

export const cssInteractiveTransform = css`
  &:hover,
  &.focus,
  &:focus,
  &:focus-within {
    transform: scale(1.02);
  }
  &.active,
  &:active {
    transform: scale(0.98);
  }
  &.disabled,
  &:disabled {
    &:hover,
    &.focus,
    &:focus,
    &:focus-within {
    transform: none;
    }
    &:active, 
    &.active {
      transform: none;
    }
  }
`
