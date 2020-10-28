/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import Label from './Label'
import { cssCoreSlider, numberInput, getCssVarsColor } from './controlStyles'

export default ({
  id,
  label,
  initialValue,
  handler,
  range,
  step,
  colorScheme,
  numeric,
  liveUpdate,
  dimensions = [36, 150],
}) => {
  const [value, setValue] = useState(initialValue)
  const [enterIsHeld, setEnterIsHeld] = useState(false)
  const [shiftIsHeld, setShiftIsHeld] = useState(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSetValue = e => {
    setValue(e.target.value)
    if(liveUpdate) handler(e)
  }
  const handleKeyDown = e => {
    switch(e.keyCode) {
      case 13: setEnterIsHeld(true); break
      case 16: setShiftIsHeld(true); break
      case 37:
      case 40:
        setValue(parseInt(value, 10) - (shiftIsHeld ? 10 : 1))
        e.preventDefault()
        break
      case 38:
      case 39:
        setValue(parseInt(value, 10) + (shiftIsHeld ? 10 : 1))
        e.preventDefault()
        break
      default:
    }
  }
  const handleKeyUp = e => {
    switch(e.keyCode) {
      case 13: setEnterIsHeld(false); handler(e); break
      case 16: setShiftIsHeld(false); break
      default:
    }
  }
  const cssVarsColor = colorScheme ? getCssVarsColor(colorScheme) : ''
  return (
    <div
      css={css`
        ${cssCoreSlider}
        ${cssVarsColor}
      `}
      className={enterIsHeld ? 'active' : ''}
    >
      <Label text={label} />
      <input
        type="range"
        id={id}
        value={value}
        onChange={handleSetValue}
        onClick={handler}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
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
      {numeric &&
        <input
          id={id}
          type="number"
          value={Math.round(value)}
          onChange={handleSetValue}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onClick={handler}
          css={css`
          ${numberInput}
          width:  ${dimensions[0]}px;
          height: ${dimensions[1] - 6}px;
        `}
        />}
    </div>
  )
}
