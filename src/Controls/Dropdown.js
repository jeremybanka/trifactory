/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import Label from './Label'
import { dropdownCSS } from './css'

export default function Dropdown({
  handler,
  options,
  label,
  value,
}) {
  return (
    <div css={css`${dropdownCSS}`}>
      <Label text={label} />
      <select
        onChange={handler}
        value={value}
      >
        {options.map((option, idx) =>
          <option
            key={idx}
            i={option.i}
            value={option.value}
          >{option.label}</option>
        )}
      </select>
    </div>
  )
}
