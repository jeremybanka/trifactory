/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect, useRef } from 'react'
import { funnel } from 'luum'
import Label from './Label'
import { getCssGridTemplate } from './controlStyles'
import { sliderCSS } from './css'
import { Icon } from './Icon'

const defaultDimensions =
{ height: 36,
  innerPad: 3,
  rangeWidth: null,
  thumbWidth: 20,
  numInputWidth: 50 }

const numberIfString = value => {
  if(typeof value === 'string') return Number(value)
  return value
}

export default function Slider({
  label,
  valueProvided,
  disabled,
  handler,
  step = 1,
  shiftStep = step * 10,
  range,
  limit = range,
  dimensions,
  gridArea = 'slider',
  cssExtra,
  numeric,
  liveUpdate,
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
  const autoRangeWidth = rangeWidth ? `${rangeWidth}px` : 'auto'
  const rangeRef = useRef(null)
  const trueRangeWidth = rangeRef.current?.offsetWidth
  const [rangeWidthState, setRangeWidthState] = useState(trueRangeWidth)

  const rangeTotal = range[1] - range[0]
  const limitTotal = limit[1] - limit[0]
  const limitWithinRange = limitTotal / rangeTotal
  const innerHeight = height - innerPad * 2
  const slidableSpace = rangeWidthState - thumbWidth
  const trackWidth = thumbWidth + slidableSpace * limitWithinRange
  const trackProgress = limit[0] / rangeTotal
  const trackDisplace = rangeWidthState * trackProgress
  const thumbProgress = (value - limit[0]) / (limitTotal || 1)
  const thumbDisplace = thumbProgress * slidableSpace * limitWithinRange

  useEffect(
    () => { setValue(funnel(valueProvided, limit)) },
    [valueProvided, limit]
  )

  useEffect(
    () => setRangeWidthState(rangeRef.current?.offsetWidth),
    [trueRangeWidth]
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
  /*
  const layoutCSS = numeric
    ? getCssGridTemplate('numeric-slider', `${height}px`, autoRangeWidth, `${numInputWidth + 10}px`)
    : getCssGridTemplate('slider', `${height}px`, autoRangeWidth, `${numInputWidth + 10}px`)
  */
  return (
    <div
      onMouseUp={() => !disabled && handler(numberIfString(value))}
      onTouchEnd={() => !disabled && handler(numberIfString(value))}
      css={css`
        ${sliderCSS}
        ${cssExtra}
        --thumb-width: ${thumbWidth}px;
        grid-area: ${gridArea};
        flex-grow: ${rangeWidth ? 0 : 1};
        .range-wrapper {
          --slidable-space: calc(100% - var(--thumb-width));
          --track-width: calc(var(--thumb-width) + var(--slidable-space) * ${limitWithinRange});
          --track-displace: ${trackProgress * 100}%;
          --thumb-displace: calc(${thumbProgress} * var(--slidable-space) * ${limitWithinRange});
          input[type=range] {
            width:  ${trackWidth}px;
            margin-left: ${trackDisplace}px;
            height: ${height}px;
            &::-webkit-slider-thumb { 
              height: ${height}px;
              width:  ${thumbWidth}px;
            }
            &::-moz-range-thumb { 
              height: ${height}px;
              width:  var(--thumb-width);
            }
          }
          .range {
            width:  ${autoRangeWidth};
            height: ${innerHeight}px;
            margin: ${innerPad}px 0;
            .track {
              width:  ${trackWidth}px;
              margin-left: ${trackDisplace}px;
              height: ${innerHeight}px;
              .thumb {
                width:  ${thumbWidth}px;
                height: ${innerHeight}px;
                margin-left: ${thumbDisplace}px;
                .label-wrap {              
                  width:  ${thumbWidth}px;
                }
              }
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
      className={`
        interactive
        ${enterIsHeld ? 'active' : ''}
        ${disabled ? 'disabled' : ''}
      `}
    >
      <button
        type='button'
        tabIndex='-1'
        disabled={value === limit[0] || disabled}
        onClick={() => handler(numberIfString(value) - shiftStep)}
      >
        <Icon value='minus' />
      </button>
      <div className='range-wrapper'>
        <div className='range' ref={rangeRef}>
          <div className='track'>
            <div className='thumb'>
              {label && <Label
                text={label.text || label}
                place={label.place || 'above'}
              />}
            </div>
          </div>
        </div>
        <input
          type="range"
          tabIndex={-1}
          value={value}
          disabled={disabled}
          onChange={handleSetValue}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          min={Math.round(limit[0])}
          max={Math.round(limit[1])}
          step={step}
        />
      </div>
      <button
        type='button'
        tabIndex='-1'
        disabled={value === limit[1] || disabled}
        onClick={() => handler(numberIfString(value) + shiftStep)}
      >
        <Icon value='plus' />
      </button>
      {numeric &&
        <input
          type="number"
          inputMode="numeric"
          disabled={disabled}
          value={Math.round(numberIfString(value))}
          onChange={handleSetValue}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />}
    </div>
  )
}
