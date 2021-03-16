/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import { ControlStrip } from '../StyleDefinitions'
import useHistory from '../util/useHistory'

const defaultDimensions =
{ height: 0,
  width: 0 }

export default function ColorPicker({
  label = 'Label',
  state: { color },
  handler = console.log(`no setter passed to colorPicker ${label}`),
  dimensions,
  css,
}) {
  const [color, setColor, changeColor, clearHistory] = useHistory(color)
  const [isOpen, setIsOpen] = useState(false)
  const [enterIsHeld, setEnterIsHeld] = useState(false)
  const [shiftIsHeld, setShiftIsHeld] = useState(false)

  useEffect(() => {
    setFocused({ value: valueProvided, index })
  }, [state, options])

  return (
    <div
      className='archipelago'
      css={css``}
    >
      <div className='island main'>
        <div />
      </div>
      <ControlStrip className='island' />
    </div>
  )
}
