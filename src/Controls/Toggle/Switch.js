/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, useState } from 'react'
import { getCssVarsColor, cssCorePanel } from '../controlStyles'

export default function ToggleFlip({
  id,
  checkProvided,
  handler,
  dimensions: [x, y] = [64, 36],
  colorScheme,
}) {
  const cssVarsColor = colorScheme ? getCssVarsColor(colorScheme) : ''
  const [checked, setChecked] = useState(checkProvided)
  const [initialSwitchPosition, setInitialSwitchPosition] = useState(checkProvided ? 100 : 0)
  const [switchPosition, setSwitchPosition] = useState(checkProvided ? 100 : 0)
  const [actionIsDrag, setActionIsDrag] = useState(false)

  useEffect(() => {
    setSwitchPosition(checkProvided ? 100 : 0)
    setChecked(checkProvided)
  }, [checkProvided])

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
      id={id}
      onMouseDown={handleSetInitialSwitchPosition}
      onTouchStart={handleSetInitialSwitchPosition}
      onMouseUp={resolveEvent}
      onTouchEnd={resolveEvent}
      css={css`
        ${cssCorePanel}
        ${cssVarsColor}
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template:
          [row1-start] "switch    " ${y}px [row1-end]
          /             ${x}px;
        * { cursor: pointer; }
        input[type=checkbox] {
          grid-area: switch;
          opacity: 0;
          height: ${y}px;
          width:  ${x}px;
          &:checked ~ .switch > .track { 
            background-color: var(--fg-color);
            > .handle {
              background-color: var(--ex-bg-color);
            }
          }
        }
        input[type=range] {
          height: ${y}px;
          width:  ${x}px;
          margin: 0px;
          grid-area: switch;
          -webkit-appearance: none;
          appearance: none;
          outline: none;
          border-radius: 0;
          &::-webkit-slider-thumb {
            -webkit-appearance: none; /* Override default look */
            appearance: none;
            border: none;
            height: ${y}px;
            width:  ${y}px;
            background: red;
            transition: transform 0.05s;
            opacity: 0;
          }
          &::-moz-range-thumb {
            border-radius: 0px;
            width: 20px;
            background: red;
            transition: transform 0.05s;
          }
        }
        .switch {
          pointer-events: none;
          grid-area: switch;
          overflow: hidden;
          height: ${y}px;
          width:  ${x}px;
          .track {
            display: flex;
            justify-content: center;
            transition-property: all;
            transition-duration: 0.1s;
            transition-timing-function: ease-out;
            height: ${y}px;
            width:  ${2 * x + y}px;
            margin-left: ${-1 * x + (x - y) * (switchPosition / 100)}px;
            background-color: var(--mg-color);
            //   0 -> -x
            // 100 -> -y
            .handle {
              width:  ${y - 4}px;
              height: ${y - 4}px;
              background: var(--ex-bg-color);
              margin: 2px;
            }
          }
        }
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handler}
      />
      <input
        type="range"
        value={switchPosition}
        onChange={handleSetSwitchPosition}
        min={0}
        max={100}
      />
      <div className='switch'>
        <div className='track'>
          <div className='handle' />
        </div>
      </div>
    </div>
  )
}
