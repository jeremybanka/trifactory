import { useState, useEffect } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from './Icon'
import Label from './Label'
import { textFieldCSS } from './css'

const noHandlerMessage = value => console.log('no handler: "', value, '" was dropped on the floor')

const defaultDimensions =
{ height: 36,
  width: 180 }

export default function TextField({
  valueProvided,
  validate = {},
  handler = noHandlerMessage,
  frontMatter,
  dimensions,
  injectCSS,
  undoButton,
  goButton,
  disabled,
}) {
  const [value, setValue] = useState(valueProvided)
  const [valueIsReady, setValueIsReady] = useState(false)
  const [enterIsHeld, setEnterIsHeld] = useState(false)

  const { height, width } = { ...defaultDimensions, ...dimensions }

  useEffect(() => { setValue(valueProvided) }, [valueProvided])

  const validateDraft = value => {
    const valueIsValidDraft = validate.draft
      ? validate.draft(value)
      : true
    const attemptIsEmpty = value.length === 0
    return (valueIsValidDraft || attemptIsEmpty)
  }
  const validateFinal = value => validate.final
    ? validate.final(value)
    : true

  const handleSetValue = e => {
    const attempt = e.target.value
    const attemptIsValid = validateDraft(attempt)
    if(attemptIsValid) setValue(e.target.value)
    const newValue = attemptIsValid ? attempt : value
    const newValueIsReady = validateFinal(newValue)
    setValueIsReady(newValueIsReady)
  }
  const handleKeyDown = e => {
    if(e.keyCode === 13) setEnterIsHeld(true)
  }
  const handleKeyUp = e => {
    if(e.keyCode === 13) {
      console.log(e.target.value)
      if(valueIsReady) handler(e.target.value)
      setEnterIsHeld(false)
    }
  }
  const handleButtonPress = () => { if(valueIsReady) handler(value) }

  const labelContent = 'Hexcode'

  return (
    <div
      className={`
        ${enterIsHeld && 'active'}
        ${disabled && 'disabled'}
      `}
      css={css`
        ${textFieldCSS}
        ${injectCSS}
        height: ${height}px;
        width: ${width}px;
        input[type=text] {
          flex-grow: 1;
        }
        .buttonset {
          button { 
            height: ${height - 6}px;
            width: ${height - 6}px;
            &:last-of-type { margin-right: 3px }
            &.cancel { width: ${value === valueProvided ? 0 : height - 6}px }
            &:disabled {
              background: none;
              opacity: 50%;
            }
          }
        }
      `}
    >
      {frontMatter && <div className='front-matter'>
        {frontMatter}
      </div>}
      <Label text={labelContent} />
      <input
        type="text"
        value={value}
        onChange={handleSetValue}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        disabled={disabled}
      />
      <div className='buttonset'>
        {undoButton && <button
          type='button'
          className='button cancel'
          onClick={() => setValue(valueProvided)}
          disabled={disabled}
        ><Icon value='undo' />
        </button>}
        {goButton && <button
          type='button'
          onClick={handleButtonPress}
          disabled={disabled}
        ><Icon value='go' />
        </button>}
      </div>
    </div>
  )
}
