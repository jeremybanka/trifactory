import { css } from '@emotion/core'
import { panelCSS } from './panel'

export const checkCSS = css` 
  ${panelCSS};
  display: grid;
  align-items: center;
  justify-items: center;
  &:hover > .box, 
  &:focus > .box { 
    border-width: 2px 
  }
  input[type=checkbox] { // hide the box itself
    cursor: pointer;
    grid-area: status;
    opacity: 0;
    margin: 0px;
    &:checked ~ .check {
      transform: rotate(-45deg) scale(1);
      opacity: 1;
    }
  }
  .box, .check, .title { 
    pointer-events: none;
  }
  .box, .check { 
    grid-area: status;
  }
  .title {
    grid-area: label;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
  }
  .box {
    background-color: var(--ex-bg-color);
    border-color: var(--fg-color);
    border-style: solid;
    border-width: 0px;
    box-sizing: border-box;
    transition: border-width 0.05s;
  }
  .check {
    opacity: 0;
    transform: rotate(-45deg) scale(0.75);
    transform-origin: center;
    transition: transform 0.1s;
 }
`
