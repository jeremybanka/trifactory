/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, useState } from 'react'
import { getCssVarsColor, cssCorePanel } from '../controlStyles'

export default function ToggleFlip({
  id,
  checked,
  handler,
  dimensions: [x, y] = [64, 36],
  colorScheme,
}) {
  const cssVarsColor = colorScheme ? getCssVarsColor(colorScheme) : ''
  const [switchPosition, setSwitchPosition] = useState(checked ? 100 : 0)

  useEffect(() => {
    setSwitchPosition(checked ? 100 : 0)
  }, [checked])

  const handleSetSwitchPosition = e => {
    setSwitchPosition(e.target.value)
  }
  return (
    <label
      htmlFor={id}
      css={css`
        ${cssCorePanel}
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template:
          [row1-start] "checkbox  switch    " ${y}px [row1-end]
          /             0px       ${x}px;
        input[type=checkbox] {
          grid-area: switch;
          height: ${y}px;
          width:  ${y}px;
        }
        input[type=range] {
          height: ${y}px;
          width:  ${x}px;
          margin: 0px;
          cursor: grab;
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
            background: var(--mg-color);
            transition: transform 0.05s;
          }
          &::-moz-range-thumb {
            border-radius: 0px;
            width: 20px;
            background: var(--mg-color);
            cursor: grab;
            transition: transform 0.05s;
          }
        }
        .switch-ex {
          grid-area: switch;
          overflow: hidden;
          height: ${y}px;
          width:  ${x}px;
          .switch-in {
            transition-property: margin;
            transition-duration: 0.1s;
            transition-timing-function: ease-out;
            pointer-events: none;
            height: ${y}px;
            width:  ${2 * x - y}px;
            margin-left: ${-1 * (x - y) + (x - y) * (switchPosition / 100)}px;
            .active, 
            .handle,
            .inactive {
              height: ${y}px;
              display: inline-block;
            }
            .active {
              background-color: #00ff00aa;
              width:  ${x - y}px;
            }
            .handle {
              background-color: #000000aa;
              width:  ${y}px;
            }
            .inactive {
              background-color: #ff0000aa;
              width:  ${x - y}px;
            }
          }
        }
      `}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handler}
      />
      <input
        type="range"
        value={switchPosition}
        onChange={handleSetSwitchPosition}
        onClick={handler}
        min={0}
        max={100}
      />
      <div className='switch-ex'>
        <div className='switch-in'>
          <div className='active' />
          <div className='handle' />
          <div className='inactive' />
        </div>
      </div>
    </label>
  )
}
