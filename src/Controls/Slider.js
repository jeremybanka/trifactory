/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import { funnel } from 'luum'
import Label from './Label'
import { getCssGridTemplate } from './controlStyles'
import { sliderCSS } from './css'
import { Icon } from './Icon'

const defaultDimensions =
{ height: 36,
  innerPad: 3,
  rangeWidth: 150,
  thumbWidth: 20,
  numInputWidth: 50 }

const numberIfString = value => {
  if(typeof value === 'string') return Number(value)
  return value
}

export default function Slider({
  id,
  labelText,
  valueProvided,
  handler,
  step = 1,
  shiftStep = step * 10,
  range,
  limit = range,
  numeric,
  liveUpdate,
  dimensions,
  injectCSS,
}) {
  const [value, setValue] = useState(funnel(valueProvided, limit))
  const [enterIsHeld, setEnterIsHeld] = useState(false)
  const [shiftIsHeld, setShiftIsHeld] = useState(false)

  const {
    height,
    innerPad,
    rangeWidth,
    thumbWidth,
    numInputWidth,
  } = { ...defaultDimensions, ...dimensions }

  // console.log('value', value, 'limit', limit)

  const rangeTotal = range[1] - range[0]
  const limitTotal = limit[1] - limit[0]
  const limitFraction = limitTotal / rangeTotal
  const innerHeight = height - innerPad * 2
  const slidableSpace = rangeWidth - thumbWidth
  const trackWidth = thumbWidth + slidableSpace * limitFraction
  const trackDisplace = rangeWidth * limit[0] / rangeTotal
  const thumbProgress = (value - limit[0]) / (limitTotal || 1)
  const thumbDisplace = thumbProgress * slidableSpace * limitFraction

  useEffect(
    () => { setValue(funnel(valueProvided, limit)) },
    [valueProvided, limit]
  )

  const handleSetValue = e => {
    setValue(e.target.value)
    if(liveUpdate) handler(Number(e.target.value))
  }
  const handleKeyDown = e => {
    switch(e.keyCode) {
      case 13: setEnterIsHeld(true); break
      case 16: setShiftIsHeld(true); break
      case 37:
      case 40:
        setValue(numberIfString(value) - (shiftIsHeld ? shiftStep : step))
        e.preventDefault()
        break
      case 38:
      case 39:
        setValue(numberIfString(value) + (shiftIsHeld ? shiftStep : step))
        e.preventDefault()
        break
      default:
    }
  }
  const handleKeyUp = e => {
    switch(e.keyCode) {
      case 13: setEnterIsHeld(false); handler(numberIfString(value)); break
      case 16: setShiftIsHeld(false); break
      default:
    }
  }

  const layoutCSS = numeric
    ? getCssGridTemplate('numeric-slider', height, rangeWidth, numInputWidth)
    : getCssGridTemplate('slider', height, rangeWidth, numInputWidth)

  return (
    <div
      onMouseUp={() => handler(numberIfString(value))}
      onTouchEnd={() => handler(numberIfString(value))}
      css={css`
        ${sliderCSS}
        ${layoutCSS}
        ${injectCSS}
        input[type=range] {
          margin-left: ${trackDisplace}px;
          width:  ${trackWidth}px;
          height: ${height}px;
          &::-webkit-slider-thumb { 
            height: ${height}px;
            width:  ${thumbWidth}px;
          }
          &::-moz-range-thumb { 
            height: ${height}px;
            width:  ${thumbWidth}px;
          }
        }
        .range {
          width:  ${rangeWidth}px;
          height: ${innerHeight}px;
          margin: ${innerPad}px 0;
          .track {
            height: ${innerHeight}px;
            width:  ${trackWidth}px;
            margin-left: ${trackDisplace}px;
            .thumb {
              width:  ${thumbWidth}px;
              height: ${innerHeight}px;
              margin-left: ${thumbDisplace}px;

            }
          }
        }
        input[type=number] {
          grid-area: number;
          width:  ${numInputWidth}px;
          height: ${innerHeight}px;
        }
        button {
          height: ${innerHeight}px;
          width:  ${innerHeight}px;
        }
      `}
      className={enterIsHeld ? 'active' : ''}
    >
      <Label text={labelText} />
      <div className='range'>
        <div className='track'>
          <div className='thumb' />
        </div>
      </div>
      <input
        type="range"
        tabIndex={-1}
        id={id}
        value={value}
        onChange={handleSetValue}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        min={Math.round(limit[0])}
        max={Math.round(limit[1])}
        step={step}
      />
      <button
        type='button'
        disabled={value === limit[0]}
        onClick={() => handler(numberIfString(value) - shiftStep)}
      >
        <Icon value='minus' />
      </button>
      <button
        type='button'
        disabled={value === limit[1]}
        onClick={() => handler(numberIfString(value) + shiftStep)}
      >
        <Icon value='plus' />
      </button>
      {numeric &&
        <input
          id={id}
          type="number"
          value={Math.round(numberIfString(value))}
          onChange={handleSetValue}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />}
    </div>
  )
}
