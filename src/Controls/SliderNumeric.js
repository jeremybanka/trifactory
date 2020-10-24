/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import Label from './Label'
import { sliderWrap, numberInput, getColorStyles, getExtraColorStyles } from './controlStyles'

export default ({
  id,
  label,
  initialValue,
  handler,
  range,
  step = 1,
  colors,
  dimensions = [36, 150],
}) => {
  const [currentNumber, setCurrentNumber] = useState(initialValue)

  useEffect(() => {
    setCurrentNumber(initialValue)
    setCurrentNumber(initialValue)
  }, [initialValue])

  const handleChange = e => {
    setCurrentNumber(e.target.value)
    if(document.activeElement === document.getElementById(id)) {
      setCurrentNumber(e.target.value)
    }
  }
  const colorStyles = colors
    ? getColorStyles(colors)
    : ''
  const extraColorStyles = colors
    ? getExtraColorStyles(colors)
    : ''

  return (
    <div css={css`
      ${sliderWrap}
      ${colorStyles}
      ${extraColorStyles}
    `}
    >
      <Label text={label} />
      <input
        id={id}
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
        value={Math.round(currentNumber)}
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
