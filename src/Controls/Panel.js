/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { panelCSS } from './css'
import { cssInteractiveLabel } from './css/interactive-label'
import { cssInteractiveTransform } from './css/interactive-transform'
import Label from './Label'

const defaultDimensions =
{ height: 100,
  width: null }

export default function Panel({
  children,
  handler,
  text,
  label,
  cssExtra,
  gridArea,
  dimensions,
  disabled,
}) {
  const { height, width } = { ...defaultDimensions, ...dimensions }
  const autoWidth = width ? `${width}px` : 'auto'

  return (
    <button
      type='button'
      className='interactive'
      onClick={handler}
      disabled={disabled}
      css={css`
        ${panelCSS};
        ${cssInteractiveTransform};
        ${cssInteractiveLabel};
        ${cssExtra};
        grid-area: ${gridArea};
        height: ${height}px;
        width: ${autoWidth};
        align-items: center;
        align-content: center;
        justify-content: center;
        text-align: center;
        .icon { 
          height: ${height}px;
          width:  ${height}px;
        }
      `}
    >
      {children}
      {text && <div className='text'>{label}</div>}
      {label &&
        <Label
          text={label.text || label}
          place={label.place || 'above'}
        />}
    </button>
  )
}
