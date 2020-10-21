/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { sliderWrap, getColorStyles } from './controlStyles'
import Label from './Label'

export default ({
  id,
  label,
  value,
  onChange,
  range,
  className,
  colors,
  dimensions = [40, 150],
}) => {
  const colorStyles = colors
    ? getColorStyles(colors)
    : ''
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
        css={css`
          ${colorStyles}
          width:  ${dimensions[0]}px;
          height: ${dimensions[1]}px;
          &::-webkit-slider-thumb { height: ${dimensions[2] || dimensions[1]}px }
          &::-moz-range-thumb { height: ${dimensions[2] || dimensions[1]}px }
        `}
      />
    </div>
  )
}
