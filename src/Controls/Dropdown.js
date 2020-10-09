/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import Label from './Label'
import { dropdownWrap, subOption, closed } from './controlStyles'

export default function Dropdown({
  onChange,
  options,
  label,
  subordinate,
  isClosed,
  value,
}) {
  return (
    <div css={css`
      ${dropdownWrap}
      ${subordinate ? subOption : ""}
      ${isClosed ? closed : ""}
    `}
    >
      <Label text={label} />
      <select
        onChange={onChange}
        css={css`{
          cursor: pointer;
          color: var(--applied);
          width: 150px;
          font-size: 16px;
          font-weight: 600;
          display: inline-flex;
          background: none;
          height: 40px;
          border: 0px solid #000;
          border-radius: 0px;
          -webkit-appearance: none;
          -moz-appearance: none;
          }
          &:hover,
          &:focus {
            box-shadow: 0 0 0 0px -moz-mac-focusring;
            outline: none;
          }
          option {
            font-weight: normal;
          }
        `}
        value={value}

      >
        {options.map((option, idx) =>
          <option
            key={idx}
            i={option.i}
            value={option.value}
            css={css`{
              font-weight: normal;
            }`}
          >{option.label}</option>
        )}
      </select>
    </div>
  )
}
