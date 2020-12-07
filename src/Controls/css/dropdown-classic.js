import { css } from '@emotion/core'
import { panelCSS } from './panel'

export const dropdownClassicCSS = css`
  ${panelCSS};
  > select {
    cursor: pointer;
    margin-left: 10px;
    color: var(--fg-color);
    width: 150px;
    font-size: 16px;
    font-weight: 600;
    display: inline-flex;
    background: none;
    border: 0px solid #000;
    border-radius: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover,
    &:focus {
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
    height: 7px;
    width: 7px;
    right: 13px;
    top: 11px;
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
