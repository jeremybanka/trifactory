/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { getCssGridTemplate } from '../controlStyles'
import { checkCSS } from '../css'
import { Icon } from '../Icon'

const defaultDimensions =
{ height: 36,
  width: null,
  innerPad: 20 }

export default function Button({
  id,
  labelText = 'Label',
  toggleStateProvided,
  handler,
  layout,
  dimensions,
  injectCSS,
}) {
  const { height, width, innerPad } = { ...defaultDimensions, ...dimensions }
  const autoWidth = width ? `${width}px` : 'auto'
  const innerHeight = height - innerPad
  const cssGridTemplate = getCssGridTemplate(layout, height)

  return (
    <label
      htmlFor={id}
      css={css`
        ${checkCSS};
        ${injectCSS};
        ${cssGridTemplate};
        height: ${height}px;
        width:  ${autoWidth};
        &:hover > .box, 
        &:focus > .box { 
          border-width: 2px 
        }
        input[type=checkbox] {
          height: ${height}px;
          width:  ${height}px;
          &.active,
          &:active, 
          &:checked { ~ .box {
            // fill the box:
            border-width: ${(innerHeight) / 2}px;
          }}
        }
        .title {
          height: ${height}px;
          width:  ${autoWidth};
        }
        .box {
          height: ${innerHeight}px;
          width:  ${innerHeight}px;
        }
        .icon {
          height: ${innerHeight}px;
          width:  ${innerHeight}px;
          font-size: ${(innerHeight) * 0.75}px;
          font-variation-settings: 'wght' 500;
          color: var(--bg-color)
        }
      `}
    >
      <input
        id={id}
        type="checkbox"
        checked={toggleStateProvided}
        onChange={handler}
      />
      <div className='title'>{labelText}</div>
      <div className='box' />
      <Icon value='check' />
    </label>
  )
}
