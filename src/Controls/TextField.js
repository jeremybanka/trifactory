import { useState, useEffect } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from '../StyleDefinitions'
import Label from './Label'
import Panel from './Panel'
import { textFieldCSS } from './css'

const defaultDimensions =
{ height: 36,
  fieldWidth: 150 }

export default function TextField({
  valueProvided,
  validate,
  handler,
  frontMatter,
  dimensions,
  injectCSS,
  buttonInjectCSS = injectCSS,
}) {
  const [value, setValue] = useState(valueProvided)
  const [valueIsAcceptable, setValueIsAcceptable] = useState(false)
  const [enterIsHeld, setEnterIsHeld] = useState(false)

  const { height, fieldWidth } = { ...defaultDimensions, ...dimensions }

  useEffect(() => { setValue(valueProvided) }, [valueProvided])

  const handleSetValue = e => {
    const maxLength = validate.acceptLengths[0]
    const attempt = e.target.value
    const attemptIsEmpty = attempt.length === 0
    const attemptIsLegal = validate.test(attempt)
    const attemptIsTooLong = attempt.length > maxLength
    const attemptIsAcceptableLength = validate.acceptLengths.some(
      validLength => validLength === attempt.length
    )
    // console.log(attempt, attemptIsLegal ? 'is valid' : 'is not valid')
    if(
      (attemptIsEmpty || attemptIsLegal)
      && !attemptIsTooLong
    ) setValue(e.target.value)
    setValueIsAcceptable(attemptIsAcceptableLength)
  }
  const handleKeyDown = e => {
    if(e.keyCode === 13) setEnterIsHeld(true)
  }
  const handleKeyUp = e => {
    if(e.keyCode === 13) {
      if(valueIsAcceptable) handler(value)
      setEnterIsHeld(false)
    }
  }
  const handleButtonPress = () => {
    if(valueIsAcceptable) handler(value)
  }

  const labelContent = 'Hexcode'

  return (
    <div
      className={enterIsHeld ? 'active' : ''}
      css={css`
        ${textFieldCSS}
        ${injectCSS}
        height: ${height}px;
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
        css={css`width: ${fieldWidth}px;`}
      />
      <Panel
        onClick={handleButtonPress}
        dimensions={{ height, width: height }}
        cssExtra={buttonInjectCSS}
      >
        <Icon>
          R
        </Icon>
      </Panel>
    </div>
  )
}
