import { css } from '@emotion/core'
import { panelCSS } from './panel'

export const textFieldCSS = css`
  ${panelCSS};
  overflow: visible;
  input[type=text] {
    color: var(--fg-color);
    background: none;
    font-family: Theia;
    display: flex;
    font-size: 20px;
    border: none;
    padding: 0 10px;
    box-shadow: 0 0 0 0px;
    outline: none;
  }
  .front-matter {
    display: flex;
    font-size: 20px;
    border: none;
    padding-left: 10px;
    align-items: center;
    cursor: default;
  }
`
