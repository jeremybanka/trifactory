/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { getCssVarsColor, getCssGridTemplate, cssCoreCheck } from '../controlStyles'

export default function TogglePress({
  id,
  label = 'Label',
  checked,
  handler,
  dimensions: [x, y] = [null, 36], // 36 is min/default height
  templateName,
  colorScheme,
}) {
  const cssVarsColor = colorScheme ? getCssVarsColor(colorScheme) : ''
  const cssGridTemplate = getCssGridTemplate(templateName, y)

  return (
    <label
      htmlFor={id}
      css={css`
        ${cssCoreCheck};
        ${cssVarsColor};
        ${cssGridTemplate};
        height: ${y}px;
        width:  ${x ? `${x}px` : 'auto'};
        input[type=checkbox] {
          height: ${y}px;
          width:  ${y}px;
          &.active  ~ .box,
          &:active  ~ .box, 
          &:checked ~ .box {
            border-width: ${(y - 20) / 2}px; // fill the box
          }
        }
        .title {
          height: ${y}px;
          width:  ${x ? `${x}px` : 'auto'};;
        }
        .box {
          height: ${y - 20}px;
          width:  ${y - 20}px;
        }
        .check {
          border-left:   3.5px solid var(--bg-color);
          border-bottom: 3.5px solid var(--bg-color);
          height: ${y * 0.1}px;
          width:  ${y * 0.2}px;
          margin-top:  -${y * 0.05}px;
          margin-left: -${y * 0.02}px;
        }
      `}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handler}
      />
      <div className='title'>{label}</div>
      <div className='box' />
      <div className='check' />
    </label>
  )
}
