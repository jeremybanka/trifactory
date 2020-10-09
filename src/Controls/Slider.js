/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { sliderWrap, sliderInput } from './controlStyles'
import Label from './Label'

export default function Slider({
  id,
  label,
  value,
  onChange,
  range,
  className,
}) {
  return (
    <div
      className={`slider ${className}`}
      css={sliderWrap}
    >
      <Label text={label} />
      <input
        type="range"
        id={id}
        value={value}
        onChange={onChange}
        min={range[0]}
        max={range[1]}
        css={sliderInput}
      />
    </div>
  )
}
