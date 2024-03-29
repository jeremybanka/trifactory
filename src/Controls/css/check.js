import { css } from '@emotion/core'
import { cssInteractiveTransform } from './interactive-transform'
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
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      ~ .icon {
        color: var(--fg-color);
        opacity: 0.3;
        &:hover { color: var(--fg-color); }
      }
      ~ .box { opacity: 0.2; }
      &.active, &:active, &:checked {
        ~ .icon {
          color: var(--fg-color);
          opacity: 0.3;
        }
      }
      &.active, &:active {
        ~ .box {
          border-width: 0px;
        }
      }
    }
    &:checked {
      ~ .icon {
        color: var(--bg-color);
        &.check {
          transform: scale(1);
          opacity: 1;
        }
      }
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
