import { useEffect, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import Label from './Label'
import { dropdownClassicCSS } from './css'

const defaultDimensions =
{ height: 36,
  width: 150 }

export default function Dropdown({
  handler,
  options,
  labelText = 'Label',
  valueProvided,
  dimensions,
  injectCSS,
}) {
  const { height, width } = { ...defaultDimensions, ...dimensions }

  const [value, setValue] = useState(valueProvided)
  const [isOpen, setIsOpen] = useState(false)
  const [enterIsHeld, setEnterIsHeld] = useState(false)

  useEffect(() => { setValue(valueProvided) }, [valueProvided])

  const handleSetValue = e => {}

  const handleKeyDown = e => {
    switch(e.keyCode) {
      case 13: setEnterIsHeld(true); break
      default:
    }
  }
  const handleKeyUp = e => {
    switch(e.keyCode) {
      case 13:
        setEnterIsHeld(false)
        if(isOpen) handleSetValue(e.target.value)
        setIsOpen(!isOpen)
        break
      default:
    }
  }

  return (
    <div css={css`height: ${height}px;`}>
      <div
        className={enterIsHeld ? 'active' : ''}
        css={css`
          ${dropdownClassicCSS}
          ${injectCSS}
          height: ${height}px;
          width: ${width}px;
        `}
      >
        <Label text={labelText} />
        <select
          onChange={handler}
          value={value}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        >
          {options.map((option, idx) =>
            <option
              key={idx}
              value={option?.value}
            >{option?.label}</option>
          )}
        </select>
      </div>
    </div>
  )
}
