import { css } from '@emotion/core'
import { panelCSS } from './panel'

export const dropdownCSS = css`
  ${panelCSS};
  width: 158px;
  padding-left: 9px;
  select {
    cursor: pointer;
    color: var(--applied);
    width: 150px;
    font-size: 16px;
    font-weight: 600;
    display: inline-flex;
    background: none;
    height: 40px;
    border: 0px solid #000;
    border-radius: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover,
    &:focus {
      box-shadow: 0 0 0 0px -moz-mac-focusring;
      outline: none;
    }
    option {
      font-weight: normal;
    }
  }
  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    border-left: 3px solid var(--fg-color);
    border-bottom: 3px solid var(--fg-color);
    height: 10px;
    width: 10px;
    right: 13px;
    top: 13px;
    transform: rotate(-45deg);
  }
  &::-ms-expand {
    display: none;
  }
  &:hover {
    overflow: visible;
    label {
      transform: translateY(-15px) scaleY(1);
      opacity: 1;
    }
  }
`
