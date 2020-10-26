import { useState, useEffect } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { keyStyle, getColorStyles, getExtraColorStyles } from './controlStyles'
import { Icon } from '../StyleDefinitions'
import Label from './Label'
import { Panel } from '.' // eslint-disable-line

export default ({
  frontMatter,
  passedValue,
  validate,
  handleSubmit,
  colors,
  buttonColors = colors,
  dimensions = [150, 36],
}) => {
  const [value, setValue] = useState(passedValue)
  const [valueIsAcceptable, setValueIsAcceptable] = useState(false)
  const [enterIsHeld, setEnterIsHeld] = useState(false)

  useEffect(() => {
    setValue(passedValue)
    setValue(passedValue)
  }, [passedValue])

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
  const handleKeyDown = e => { // it triggers by pressing the enter key'
    if(e.keyCode === 13) {
      setEnterIsHeld(true)
    }
  }
  const handleKeyUp = e => { // it triggers by pressing the enter key'
    if(e.keyCode === 13) {
      if(valueIsAcceptable) handleSubmit(value)
      setEnterIsHeld(false)
    }
  }
  const handleButtonPress = () => {
    if(valueIsAcceptable) handleSubmit(value)
  }

  const labelContent = 'Hexcode'

  const colorStyles = colors
    ? getColorStyles(colors)
    : ''
  const extraColorStyles = colors
    ? getExtraColorStyles(colors)
    : ''

  return (
    <div
      css={css`
        ${keyStyle}
        ${colorStyles}
        ${extraColorStyles}
      `}
      className={enterIsHeld ? 'active' : ''}
    >
      {frontMatter &&
        <div
          css={css`
            ${colorStyles};
            display: flex;
            height: 36px;
            font-size: 20px;
            border: none;
            padding-left: 10px;
            align-items: center;
            cursor: default;
          `}
        >
          {frontMatter}
        </div>
      }
      <Label text={labelContent} />
      <input
        type="text"
        value={value}
        onChange={handleSetValue}
        onKeyDownCapture={handleKeyDown}
        onKeyUpCapture={handleKeyUp}
        css={css`
          ${colorStyles};
          width:  ${dimensions[0]}px;
          height: ${dimensions[1]}px;
          color: var(--fg-color);
          background: none;
          font-family: Theia;
          display: flex;
          font-size: 20px;
          border: none;
          padding: 0 10px;
          box-shadow: 0 0 0 0px -moz-mac-focusring;
          outline: none;
        `}
      />
      <Panel
        label=''
        onClick={handleButtonPress}
        dimensions={[dimensions[1], dimensions[1]]}
        colors={buttonColors}
      >
        <Icon>
          R
        </Icon>
      </Panel>
    </div>
  )
}