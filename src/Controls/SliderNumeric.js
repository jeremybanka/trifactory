/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import Label from './Label'
import { sliderWrap, numberInput, subOption, closed, getColorStyles } from './controlStyles'
// import './controls.scss'

export default function SliderNumeric({
  label,
  value,
  onChange,
  onClick,
  range,
  subordinate,
  isClosed,
  colors,
  dimensions = [40, 150],
}) {
  const colorStyles = colors
    ? getColorStyles(colors)
    : ''
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
        defaultValue={value}
        onChange={onChange}
        onClick={onClick}
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
      <input
        type="number"
        defaultValue={value}
        onChange={onChange}
        onClick={onClick}
        onTouchEnd={onClick}
        css={css`
          ${colorStyles}
          ${numberInput}
          width:  ${dimensions[0]}px;
          height: ${dimensions[1] - 6}px;
          &::-webkit-slider-thumb { height: ${dimensions[2] || dimensions[1]}px }
          &::-moz-range-thumb { height: ${dimensions[2] || dimensions[1]}px }
        `}
      />
    </div>
  )
}
