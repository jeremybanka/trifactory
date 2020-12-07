/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { checkCSS } from '../css'
import { Icon } from '../Icon'

const defaultDimensions =
{ height: 36 }

export default function Key({
  id,
  icon,
  labelText = 'Label',
  toggleStateProvided,
  handler,
  dimensions,
  injectCSS,
}) {
  const { height } = { ...defaultDimensions, ...dimensions }

  return (
    <label
      htmlFor={id}
      css={css`
        ${checkCSS};
        ${injectCSS};
        height: ${height}px;
        input[type=checkbox] {
          height: ${height}px;
          width:  ${height}px;
          &.active,
          &:active, 
          &:checked { 
            ~ .box {
            // fill the box:
            border-width: ${(height) / 2}px;
            }
            ~ .icon {
              color: var(--bg-color)
            }
          }
        }
        .box {
          height: ${height}px;
          width:  ${height}px;
        }
        .icon {
          font-size: ${(height) * 0.5}px;
          font-variation-settings: 'wght' 200;
          color: var(--fg-color)
        }
      `}
    >
      <input
        id={id}
        type="checkbox"
        checked={toggleStateProvided}
        onChange={handler}
      />
      <div className='box' />
      <Icon value={icon} />
    </label>
  )
}
