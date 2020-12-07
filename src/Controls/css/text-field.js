import { css } from '@emotion/core'
import { buttonCSS } from './button'
import { cssInteractiveTransform } from './cssInteractiveTransform'
import { panelCSS } from './panel'
import { resistClickCSS } from './resist-click'

export const textFieldCSS = css`
  ${panelCSS};
  ${cssInteractiveTransform};
  ${resistClickCSS}
  display: flex;
  justify-content: left;
  overflow: visible;
  input[type=text] {
    width: 10px;
    color: var(--fg-color);
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    background: none;
    font-size: 20px;
    border: none;
    padding-left: 10px;
    box-shadow: 0 0 0 0px;
    outline: none;
    &::-moz-selection {
      color: var(--mg-color);
      background: var(--fg-color);
    }
    &::selection {
      color: var(--mg-color);
      background: var(--fg-color);
    }
  }
  .front-matter {
    display: flex;
    font-size: 20px;
    border: none;
    padding-left: 10px;
    align-items: center;
    cursor: default;
  }
  .buttonset {
    display: inline-flex;
    width: auto;
    flex-grow: 0;
    flex-basis: content;
    min-width: 0px;
    justify-content: flex-end;
    button { 
      ${buttonCSS} 
      display: inline;
      margin: 3px;
      overflow: hidden;
      margin-right: 0px;
    }
  }
`
