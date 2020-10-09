/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import Label from './Label'
import { sliderWrap, sliderInput, numberInput, subOption, closed } from './controlStyles'
// import './controls.scss'

export default function SliderNumeric({
  label,
  value,
  onChange,
  onClick,
  range,
  subordinate,
  isClosed,
}) {

  return (
    <div css={css`
      ${sliderWrap}
      ${subordinate ? subOption : ""}
      ${isClosed ? closed : ""}
    `}
    >
      <Label text={label} />
      <input
        type="range"
        value={value}
        onChange={onChange}
        onClick={onClick}
        min={range[0]}
        max={range[1]}
        css={sliderInput}
      />
      <input
        id="how-many-mag-groups"
        type="number"
        value={value}
        onChange={onChange}
        onClick={onClick}
        onTouchEnd={onClick}
        min={range[0]}
        max={range[1]}
        css={numberInput}
      />
    </div>
  )
}
