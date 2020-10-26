/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import { toggleWrap } from './controlStyles'
// import './controls.scss'

export default ({
  id,
  label = 'Prefer Sat.',
  checked,
  handler,
  type,
  colorScheme,
  dimensions = [null, 36],
}) => {
  const [switchPosition, setSwitchPosition] = useState(checked ? 100 : 0)
  return (
    <div
      css={css`
      ${toggleWrap};
      height: ${dimensions[1]}px;
      width: ${dimensions[0] ? `${dimensions[0]}px` : 'auto'};
      min-width: ${dimensions[1]}px;
      input[type=checkbox] {
        height: ${dimensions[1] - 20}px;
        width: ${dimensions[1] - 20}px;
        top: 10px;
        right: 10px;
        &:checked + label {
          &::before {
            border-width: 10px; 
            // keep box filled
          }
        }
      }
      label {
        height: ${dimensions[1]}px;
        width: ${dimensions[0]}px;
        min-width: ${dimensions[1]}px;
        padding-right: ${dimensions[1]}px;
        padding-left: 10px;
        &::before {
          height: ${dimensions[1] - 20}px;
          width: ${dimensions[1] - 20}px;
          top: 10px;
          right: 10px;
        }
      }
    `}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handler}
      />
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
