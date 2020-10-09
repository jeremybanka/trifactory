import { css } from '@emotion/core'

const button = css`{
  user-select: none;
  cursor: pointer;
  --shading: #ddd;
  --applied: #555;
  color: var(--applied);
  background-color: var(--shading);
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  transition: box-shadow transform background-color;
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  transform-origin: center center;
  }
  &:hover, 
  &:focus {
    --shading: #eee;
    transform: scale(1.02);
    box-shadow: 0 0px 0px 2px var(--applied);
    z-index: 2;
  }
  &:active {
    --applied: black;
    transform: scale(0.98);
    transition-duration: 0.03s;
  }
`

const flexControl = css` {
  position: relative;
  display: inline-flex;
  ${button}
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
  input { 
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
  label { 
    // the label is what people see and click
    ${flexControl};
    white-space: nowrap;
    padding: 7px 37px 0 12px;
    height: 40px;
  }
`

const dropdownWrap = css` {
  ${flexControl};
  width: 158px;
  padding-left: 9px;
  }
  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    border-left: 3px solid var(--applied);
    border-bottom: 3px solid var(--applied);
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
  ${flexControl};
  &:hover {
    overflow: visible;
    label {
      transform: translateY(-15px) scaleY(1);
      opacity: 1;
    }
  }
`

const sliderInput = css` {
  -webkit-appearance: none;
  cursor: pointer;
  appearance: none;
  width: 150px;
  height: 40px;
  background: var(--shading);
  outline: none;
  border-radius: 0;
  }
  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      transform: scaleX(1.25) scaleY(1.05);
      background: var(--applied);
    }
    &::-moz-slider-thumb {
      transform: scaleX(1.25) scaleY(1.05);
      background: var(--applied);
      color: var(--applied);
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    border: none;
    appearance: none;
    width: 20px; /* Set a specific slider handle width */
    height: 40px; /* Slider handle height */
    background: #888;
    cursor: pointer;
    transition: transform 0.05s;
  }
  &::-moz-range-thumb {
    border-radius: 0px;
    width: 20px;
    height: 40px;
    background: #888;
    cursor: pointer;
    transition: transform 0.05s;
  }
  &::before,
  &::after {
    color: #888;
    display: inline;
    font-size: 24px;
    margin: 0px 6px;
  }
  &::before {
    content: "–"; //endash
  }
  &::after {
    content: "+";
  }
`

const numberInput = css`{
  height: 40px;
  margin: none;
  border: 3px solid var(--shading);
  font-weight: 600;
  padding: 0 0 0 8px;
  background-color: #eee;
  border-radius: 0px;
  min-width: 45px;
  max-width: 50px;
  &:hover,
  &:focus {
    box-shadow: 0 0 0 0px -moz-mac-focusring;
    outline: none;
  }
}
`

const subOption = css`{
  transition-property: flex transform box-shadow background-color;
  overflow: hidden;
  --shading: #ccc;
  }
`

const closed = css`{
  display:none
  }
`

export {
  button,
  dropdownWrap,
  flexControl,
  sliderWrap,
  sliderInput,
  numberInput,
  toggleWrap,
  subOption,
  closed,
}
