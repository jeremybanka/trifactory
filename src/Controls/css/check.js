import { css } from '@emotion/core'
import { cssInteractiveTransform } from './cssInteractiveTransform'
import { panelCSS } from './panel'

export const checkCSS = css` 
  ${panelCSS};
  ${cssInteractiveTransform};
  display: grid;
  align-items: center;
  justify-items: center;
  input[type=checkbox] { // hide the box itself
    cursor: pointer;
    grid-area: status;
    opacity: 0;
    margin: 0px;
    &:checked ~ .check.icon {
      transform: scale(1);
      opacity: 1;
    }
  }
  .box, .icon, .title { 
    pointer-events: none;
  }
  .box, .icon { 
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
  .icon.check {
    opacity: 0;
    transform: scale(0.75);
    transform-origin: center;
    transition: transform 0.1s;
 }
`
