/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { panelCSS } from './css'
import { cssInteractiveTransform } from './css/cssInteractiveTransform'

const defaultDimensions =
{ height: 100,
  width: null }

export default function Panel({
  id,
  children,
  onClick,
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
      id={id}
      onClick={onClick}
      disabled={disabled}
      css={css`
        ${panelCSS};
        ${cssInteractiveTransform};
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
      {children}{label && <div className='text'>{label}</div>}
    </button>
  )
}
