import { css } from '@emotion/core'
import { panelCSS } from './panel'

export const switchCSS = css`
  ${panelCSS}
  grid-area: switch;
  display: grid;
  align-items: center;
  justify-items: center;
  * { cursor: pointer; }
  input[type=checkbox] {
    grid-area: switch;
    opacity: 0;
    &:checked ~ .switch { 
      background-color: var(--fg-color);
    }
  }
  input[type=range] {
    grid-area: switch;
    margin: 0px;
    appearance: none;
    outline: none;
    border-radius: 0;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      border: none;
      transition: transform 0.05s;
      opacity: 0;
    }
    &::-moz-range-thumb {
      border-radius: 0px;
      transition: transform 0.05s;
      opacity: 0;
    }
  }
  .switch {
    pointer-events: none;
    grid-area: switch;
    overflow: hidden;
    background-color: var(--mg-color);
    .thumb {
      background: var(--ex-bg-color);
      margin: 2px;
      transition-property: all;
      transition-duration: 0.1s;
      transition-timing-function: ease-out;
    }
  }
`
