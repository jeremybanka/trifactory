/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default function Label({ text }) {
  return (
    <label
      css={css`
        pointer-events: none;
        transition-property: transform;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
        transform: translateY(-10px) scaleY(0.9);
        opacity: 0;
        position: absolute;
        top: -17px;
        right: -2px;
        height: 25px;
        padding: 0 5px;
        background-color: var(--fg-color);
        color: white;
        font-size: 16px;
        font-weight: 500;
      `}
    >
      {text}
    </label>
  )
}
