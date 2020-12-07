/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, useState } from 'react'
import { switchCSS } from '../css'

const defaultDimensions =
{ height: 24,
  innerPad: 3,
  trackWidth: 36 }

export default function ToggleFlip({
  id,
  labelText,
  toggleStateProvided,
  handler,
  injectCSS,
  dimensions,
  disabled,
}) {
  const [checked, setChecked] = useState(toggleStateProvided)
  const [initialSwitchPosition, setInitialSwitchPosition] = useState(toggleStateProvided ? 100 : 0)
  const [switchPosition, setSwitchPosition] = useState(toggleStateProvided ? 100 : 0)
  const [actionIsDrag, setActionIsDrag] = useState(false)

  const {
    height,
    innerPad,
    trackWidth,
    thumbWidth,
  } = { ...defaultDimensions, ...dimensions }
  const innerHeight = height - innerPad * 2
  const thumbDisplace = innerPad + (trackWidth - height) * (switchPosition / 100)

  useEffect(() => {
    setSwitchPosition(toggleStateProvided ? 100 : 0)
    setChecked(toggleStateProvided)
  }, [toggleStateProvided])

  const handleSetInitialSwitchPosition = () => {
    setInitialSwitchPosition(switchPosition)
  }
  const handleSetSwitchPosition = e => {
    const newPosition = e.target.value
    if(newPosition !== initialSwitchPosition && !actionIsDrag) setActionIsDrag(true)
    setSwitchPosition(newPosition)
  }
  const resolveEvent = e => {
    const resolvedSwitchPosition = actionIsDrag
      ? switchPosition > 50 ? 100 : 0
      : initialSwitchPosition > 50 ? 0 : 100
    setSwitchPosition(resolvedSwitchPosition)
    if(initialSwitchPosition !== resolvedSwitchPosition) handler(e)
    setActionIsDrag(false)
  }

  return (
    <div
      css={css`
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template:
          [row1-start] "label     switch           " ${height}px [row1-end]
          /             auto      ${trackWidth}px;
        label {
          cursor: pointer;
          user-select: none;
          padding: 0 5px;
        }
      `}
    >
      {labelText && <label htmlFor={id}>
        {labelText}
      </label>
      }
      <div
        onMouseDown={handleSetInitialSwitchPosition}
        onTouchStart={handleSetInitialSwitchPosition}
        onMouseUp={resolveEvent}
        onTouchEnd={resolveEvent}
        css={css`
          ${switchCSS}
          ${injectCSS}
          grid-template:
            [row1-start] "switch           " ${height}px [row1-end]
            /             ${trackWidth}px;
          input[type=checkbox] {
            height: ${height}px;
            width:  ${trackWidth}px;
          }
          input[type=range] {
            height: ${innerHeight}px;
            width:  ${trackWidth}px;
            &::-webkit-slider-thumb {
              height: ${innerHeight}px;
              width:  ${thumbWidth || innerHeight}px;
            }
            &::-moz-range-thumb {
              height: ${innerHeight}px;
              width:  ${thumbWidth || innerHeight}px;
            }
          }
          .switch {
            height: ${height}px;
            width:  ${trackWidth}px;
            .thumb {
              width:  ${thumbWidth || innerHeight}px;
              height: ${innerHeight}px;
              margin: ${innerPad}px 0;
              margin-left: ${thumbDisplace}px;
            }
          }
        `}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handler}
          disabled={disabled}
        />
        <input
          type="range"
          value={switchPosition}
          onChange={handleSetSwitchPosition}
          min={0}
          max={100}
          disabled={disabled}
        />
        <div className='switch'>
          <div className='thumb' />
        </div>
      </div>
    </div>
  )
}
