import { css } from '@emotion/core'

export const cssCorePanel = css`
  user-select: none;
  cursor: pointer;
  --bg-color: #ddd;
  --md-color: #aaa;
  --fg-color: #555;
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
    --bg-color: #eee;
    transform: scale(1.02);
    box-shadow: 0 0px 0px 2px var(--fg-color);
    z-index: 2;
  }
  &:active, 
  &.active {
    --fg-color: black;
    transform: scale(0.98);
    transition-duration: 0.03s;
  }
`
export const cssCoreCheck = css` 
  ${cssCorePanel};
  display: grid;
  align-items: center;
  justify-items: center;
  &:hover > .box, 
  &:focus > .box { 
    border-width: 2px 
  }
  input[type=checkbox] { // hide the box itself
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
export const dropdownWrap = css`
  ${cssCorePanel};
  width: 158px;
  padding-left: 9px;
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
export const cssCoreSlider = css`
  ${cssCorePanel};
  align-items: center;
  &:hover,
  &:focus,
  &:focus-within {
    overflow: visible;
    label {
      transform: translateY(-15px) scaleY(1);
      opacity: 1;
    }
    &::-webkit-slider-thumb {
      transform: scaleX(0.25) scaleY(1.05);
      background: var(--fg-color);
    }
    &::-moz-slider-thumb {
      transform: scaleX(0.25) scaleY(1.05);
      background: var(--fg-color);
      color: var(--fg-color);
    }
  }
  input[type=range] {
    cursor: grab;
    appearance: none;
    background: var(--bg-color);
    outline: none;
    border-radius: 0;
    margin: 0;
    align-items: center;
    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      border: none;
      appearance: none;
      width: 20px; /* Set a specific slider handle width */
      background: var(--mg-color);
      cursor: grab;
      transition: transform 0.05s;
    }
    &::-moz-range-thumb {
      border-radius: 0px;
      width: 20px;
      background: var(--mg-color);
      cursor: grab;
      transition: transform 0.05s;
    }
    &::before,
    &::after {
      color: var(--mg-color);
      display: flex;
      font-size: 24px;
      height: 1em;
      margin: 0px 6px 6px;
    }
    &::before {
      font-family: Theia;
      content: "-"; //endash
    }
    &::after {
      font-family: Theia;
      content: "+";
    }
    &:hover,
    &:focus {
      &::-webkit-slider-thumb {
        transform: scaleX(1.25) scaleY(1.05);
        background: var(--fg-color);
      }
      &::-moz-slider-thumb {
        transform: scaleX(1.25) scaleY(1.05);
        background: var(--fg-color);
        color: var(--fg-color);
      }
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      transform: scaleX(1) scaleY(1);
      border: none;
      appearance: none;
      width: 20px; /* Set a specific slider handle width */
      background: var(--mg-color);
      transition: transform 0.05s;
    }
    &::-moz-range-thumb {
      border-radius: 0px;
      width: 20px;
      background: var(--mg-color);
      transition: transform 0.05s;
    }
    &::before,
    &::after {
      color: var(--mg-color);
      display: flex;
      font-size: 24px;
      height: 1em;
      margin: 0px 6px 6px;
    }
    &::before {
      font-family: Theia;
      content: "-"; //endash
    }
    &::after {
      font-family: Theia;
      content: "+";
    }
  }
`
export const numberInput = css`
  border: 3px solid var(--bg-color);
  color: var(--ex-fg-color);
  background-color: var(--ex-bg-color);
  font-family: Theia;
  font-weight: 500;
  font-size: 15px;
  margin-left: -2px;
  padding: 0 0 0 8px;
  border-radius: 0px;
  min-width: 45px;
  max-width: 50px;
  &:hover,
  &:focus,
  &:focus-within {
    box-shadow: 0 0 0 0;
    outline: none;
  }
`
export function getCssVarsColor(colors) {
  return (
    css`
    --ex-fg-color: ${colors.exfg};
    --ex-bg-color: ${colors.exbg};
    --bg-color: ${colors.bg[0]};
    --mg-color: ${colors.mg[0]};
    --fg-color: ${colors.fg[0]};
    &:hover, 
    &:focus,
    &:focus-within {
      --bg-color: ${colors.bg[1]};
      --mg-color: ${colors.mg[1]};
      --fg-color: ${colors.fg[1]};
    }
    &:active, 
    &.active {
      --bg-color: ${colors.bg[2]};
      --mg-color: ${colors.mg[2]};
      --fg-color: ${colors.fg[2]};
    }
    `
  )
}
export const getCssGridTemplate = (templateName, y) => {
  switch(templateName) {
    case 'icon-card': return css`grid-template:
      [row1-start] "magnitude   title       close       " 76px [row1-end]
      [row2-start] "magnitude   traits      traits      " 24px [row1-end]
      [row3-start] "left        right       right       " auto [row2-end]
      /             120px       auto        45px;
      `
    case 'title-left': return css`grid-template:
      [row1-start] "null      label     status    " ${y}px [row1-end]
      /             10px      auto      ${y}px
      `
    case 'title-right':
    default: return css`grid-template:
      [row1-start] "status    label     null      " ${y}px [row1-end]
      /             ${y}px    auto      10px
      `
  }
}
