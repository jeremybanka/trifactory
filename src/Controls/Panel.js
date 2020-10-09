/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { flexControl } from './controlStyles'

export default function Dropdown({
  onClick,
  label,
  dimensions = [100, 100],
}) {
  return (
    <div
      onClick={onClick}
      css={css`
        ${flexControl};
        height: ${dimensions[1]}px;
        width: ${dimensions[0]}px;
        align-items: center;
      `}
    >
      {label}
    </div>
  )
}
