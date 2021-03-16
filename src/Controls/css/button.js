import { css } from '@emotion/core'
import { cssInteractiveTransform } from './interactive-transform'
import { panelCSS } from './panel'

export const buttonCSS = css` 
  ${panelCSS};
  ${cssInteractiveTransform};
  display: flex;
  justify-content: center;
  appearance: none;
  background: var(--ex-bg-color);
  color: var(--fg-color);
  outline: none;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    box-sizing: border-box;
    transition-property: border;
    transition-duration: .05s;
    transition-timing-function: ease-out;
  }
  &:disabled {
    background: var(--bg-color);
    opacity: 50%;
    &:hover,
    &.focus,
    &:focus,
    &:focus-within {
      background: var(--bg-color);
      color: var(--fg-color);
    }
  }
  &:hover,
  &.focus,
  &:focus,
  &:focus-within {
    box-shadow: none;
    color: var(--bg-color);
    background: var(--fg-color);
  } 
  &.active,
  &:active {
    transform: none;
    &::after {
      border: 3px solid var(--bg-color);
    }
  }
`
