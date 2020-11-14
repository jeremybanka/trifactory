import { css } from '@emotion/core'

export const panelCSS = css`
  user-select: none;
  cursor: pointer;
  color: var(--fg-color);
  background-color: var(--bg-color);
  position: relative;
  display: inline-flex;
  font-family: Theia;
  font-weight: 500;
  font-size: 16px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  transition: box-shadow transform background-color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transform-origin: center center;
  &:hover, 
  &:focus,
  &:focus-within {
    transform: scale(1.02);
    box-shadow: 0 0px 0px 2px var(--fg-color);
    z-index: 2;
  }
  &:active, 
  &.active {
    transform: scale(0.98);
    transition-duration: 0.03s;
  }
  &:disabled {
    cursor: not-allowed;
  }
`
export const cssCorePanel90 = css`
  ${panelCSS}
  transform: rotate(-90deg);
  &:hover, 
  &:focus,
  &:focus-within {
    transform: rotate(-90deg) scale(1.02);
  }
  &:active, 
  &.active {
    transform: rotate(-90deg)scale(0.98);
  }
`
