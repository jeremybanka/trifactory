import { css } from '@emotion/core'

export const panelCSS = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  text-decoration: none;
  border: 0;
  padding: 0;
  user-select: none;
  cursor: pointer;
  color: var(--fg-color);
  background-color: var(--bg-color);
  position: relative;
  display: inline-flex;
  font-weight: 500;
  font-size: 16px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  transition: box-shadow transform background-color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transform-origin: center center;
  &:hover,
  &.focus,
  &:focus,
  &:focus-within {
    box-shadow: 0 0px 0px 2px var(--fg-color);
    outline: none;
    z-index: 1000;
  }
  &:active, 
  &.active {
    transition-duration: 0.03s;
  }
  &.disabled,
  &:disabled {
    color: var(--bg-color);
    cursor: not-allowed;
    background: none;
    &:hover,
    &.focus,
    &:focus,
    &:focus-within {
    box-shadow: none; // 0 0px 0px 2px var(--bg-color);
    outline: none;
    }
  }
  .text {
    margin-left: 0;
    margin-right: 12px;
    line-height: 1em;
  }
`
export const cssCorePanel90 = css`
  ${panelCSS}
  transform: rotate(-90deg);
  &:hover, 
  &.focus,
  &:focus,
  &:focus-within {
    transform: rotate(-90deg) scale(1.02);
  }
  &:active, 
  &.active {
    transform: rotate(-90deg)scale(0.98);
  }
`
