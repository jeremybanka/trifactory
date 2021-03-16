/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { checkCSS } from '../css'
import { cssInteractiveLabel } from '../css/interactive-label'
import { Icon } from '../Icon'
import Label from '../Label'

const defaultDimensions =
{ height: 36 }

export default function Key({
  id,
  icon,
  label = 'Label',
  toggleStateProvided,
  handler,
  disabled,
  dimensions,
  gridArea = 'key',
  cssExtra,
}) {
  const { height } = { ...defaultDimensions, ...dimensions }

  return (
    <label
      htmlFor={id}
      className={`
        interactive
        ${disabled ? 'disabled' : ''}
      `}
      css={css`
        ${checkCSS};
        ${cssExtra};
        ${cssInteractiveLabel}
        grid-area: ${gridArea};
        height: ${height}px;
        input[type=checkbox] {
          height: ${height}px;
          width:  ${height}px;
          &.active,
          &:active, 
          &:checked { 
            ~ .box { // fill the box:
            border-width: ${(height) / 2}px;
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
        disabled={disabled}
      />
      <div className='box' />
      <Icon value={icon} />
      {label && <Label
        text={label.text || label}
        place={label.place || 'above'}
      />}
    </label>
  )
}
