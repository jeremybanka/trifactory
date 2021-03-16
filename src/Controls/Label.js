/** @jsx jsx */
import { jsx } from '@emotion/core'

export default function Label({
  text,
  place,
}) {
  return (
    <div className={`
      label-wrap
      ${place || ''}
    `}
    >
      <label>
        {text}
      </label>
    </div>
  )
}
