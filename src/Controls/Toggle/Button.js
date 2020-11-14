/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { getCssGridTemplate } from '../controlStyles'
import { checkCSS } from '../css'

const defaultDimensions =
{ height: 36,
  width: null }

export default function Button({
  id,
  labelText = 'Label',
  toggleStateProvided,
  handler,
  layout,
  dimensions,
  injectCSS,
}) {
  const { height, width } = { ...defaultDimensions, ...dimensions }
  const cssGridTemplate = getCssGridTemplate(layout, height)

  return (
    <label
      htmlFor={id}
      css={css`
        ${checkCSS};
        ${injectCSS};
        ${cssGridTemplate};
        height: ${height}px;
        width:  ${width ? `${width}px` : 'auto'};
        input[type=checkbox] {
          height: ${height}px;
          width:  ${height}px;
          &.active,
          &:active, 
          &:checked { ~ .box {
            // fill the box:
            border-width: ${(height - 20) / 2}px;
          }}
        }
        .title {
          height: ${height}px;
          width:  ${width ? `${width}px` : 'auto'};;
        }
        .box {
          height: ${height - 20}px;
          width:  ${height - 20}px;
        }
        .check {
          border-left:   3.5px solid var(--bg-color);
          border-bottom: 3.5px solid var(--bg-color);
          height: ${height * 0.1}px;
          width:  ${height * 0.2}px;
          margin-top:  -${height * 0.05}px;
          margin-left: -${height * 0.02}px;
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
      <div className='check' />
    </label>
  )
}
