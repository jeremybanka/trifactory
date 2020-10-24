import { css } from '@emotion/core'

const keyStyle = css`
  font-family: Theia;
  user-select: none;
  cursor: pointer;
  --bg-color: #ddd;
  --fg-color: #555;
  color: var(--fg-color);
  background-color: var(--bg-color);
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  transition: box-shadow transform background-color;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transform-origin: center center;
  position: relative;
  display: inline-flex;
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
const toggleWrap = css` 
  &:hover label, 
  &:focus label {
    &::before {
      border-width: 2px;
      // clarify the box
    }
  }
  &:active label {
    transition-property: box-shadow; 
    // make everything except the box shadow 'snap'
    &::before {
      border-width: 10px;
      // fill the box
    }
  }
  input[type=checkbox] { 
    // the box itself is actually hidden
    position: absolute;
    right: 30;
    opacity: 0;
    height: 40px;
    width: 40px;
    margin-right: -30px;
    &:checked + label {
      &::before {
        border-width: 10px; 
        // keep box filled
      }
      &::after {
        transform: rotate(-45deg) scale(1);
        opacity: 1;
      }
    }
  }
  // the label is what people see and click
  label { 
    ${keyStyle};
    white-space: nowrap;
    padding: 7px 37px 0 12px;
    height: 40px;
  }
`

const dropdownWrap = css`
  ${keyStyle};
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

const sliderWrap = css`
  ${keyStyle};
  display:flex;
  &:hover,
  &:focus,
  &:focus-within {
    overflow: visible;
    label {
      transform: translateY(-15px) scaleY(1);
      opacity: 1;
    }
  }
  -webkit-appearance: none;
  cursor: pointer;
  appearance: none;
  background: var(--bg-color);
  outline: none;
  border-radius: 0;
  align-items: center;
  &:hover,
  &:focus,
  &:focus-within{
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
    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      border: none;
      appearance: none;
      width: 20px; /* Set a specific slider handle width */
      background: #888;
      cursor: pointer;
      transition: transform 0.05s;
    }
    &::-moz-range-thumb {
      border-radius: 0px;
      width: 20px;
      background: #888;
      cursor: pointer;
      transition: transform 0.05s;
    }
    &::before,
    &::after {
      color: #888;
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
    -webkit-appearance: none;
    cursor: pointer;
    appearance: none;
    background: var(--bg-color);
    outline: none;
    border-radius: 0;
    margin: 0;
    align-items: center;
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
      cursor: pointer;
      transition: transform 0.05s;
    }
    &::-moz-range-thumb {
      border-radius: 0px;
      width: 20px;
      background: var(--mg-color);
      cursor: pointer;
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

const numberInput = css`
  font-family: Theia;
  font-weight: 500;
  font-size: 15px;
  height: 40px;
  margin-left: -2px;
  border: 3px solid var(--bg-color);
  padding: 0 0 0 8px;
  color: var(--ex-fg-color);
  background-color: var(--ex-bg-color);
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

const subOption = css`
  transition-property: flex transform box-shadow background-color;
  overflow: hidden;
  --bg-color: #ccc;
`

const closed = css`
  display:none
`

export function getColorStyles(colors) {
  return (
    css`
    --bg-color: ${colors.bg[0]};
    --fg-color: ${colors.fg[0]};
    &:hover, 
    &:focus,
    &:focus-within {
      --bg-color: ${colors.bg[1]};
      --fg-color: ${colors.fg[1]};
    }
    &:active {
      --bg-color: ${colors.bg[2]};
      --fg-color: ${colors.fg[2]};
    }
    `
  )
}

export function getExtraColorStyles(colors) {
  return (
    css`
    --ex-fg-color: ${colors.exfg};
    --ex-bg-color: ${colors.exbg};
    --mg-color: ${colors.mg[0]};
    &:hover, 
    &:focus,
    &:focus-within {
      --mg-color: ${colors.mg[0]};
    }
    &:active {
      --mg-color: ${colors.mg[0]};
    }
    `
  )
}

export {
  keyStyle,
  dropdownWrap,
  sliderWrap,
  numberInput,
  toggleWrap,
  subOption,
  closed,
}
