/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { useState } from 'react'
import Label from './Label'
import { sliderWrap, numberInput, subOption, closed, getColorStyles } from './controlStyles'
// import './controls.scss'

export default ({
  label,
  initialValue,
  handler,
  range,
  step = 1,
  subordinate,
  isClosed,
  colors,
  dimensions = [40, 150],
}) => {
  const [currentNumber, setCurrentNumber] = useState(initialValue)
  const handleChange = e => {
    setCurrentNumber(e.target.value)
    if(document.activeElement === document.getElementById("how-many-mag-groups")) {
      setCurrentNumber(e.target.value)
    }
  }
  const colorStyles = colors
    ? getColorStyles(colors)
    : ''

  return (
    <div css={css`
      ${sliderWrap}
      ${colorStyles}
      ${subordinate ? subOption : ""}
      ${isClosed ? closed : ""}
    `}
    >
      <Label text={label} />
      <input
        type="range"
        value={currentNumber}
        onChange={handleChange}
        onClick={handler}
        min={range[0]}
        max={range[1]}
        step={step}
        css={css`
          width:  ${dimensions[0]}px;
          height: ${dimensions[1]}px;
          &::-webkit-slider-thumb { height: ${dimensions[2] || dimensions[1]}px }
          &::-moz-range-thumb { height: ${dimensions[2] || dimensions[1]}px }
        `}
      />
      <input
        type="number"
        value={currentNumber}
        onChange={handleChange}
        onClick={handler}
        css={css`
          ${numberInput}
          width:  ${dimensions[0]}px;
          height: ${dimensions[1] - 6}px;
        `}
      />
    </div>
  )
}
