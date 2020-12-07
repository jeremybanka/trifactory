import { useEffect, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { wrapAround } from 'luum'
import Label from './Label'
import { dropdownCSS } from './css'
import { Icon } from './Icon'

const defaultDimensions =
{ height: 36,
  width: null }

export default function Dropdown({
  handler,
  options,
  labelText = 'Label',
  valueProvided,
  dimensions,
  injectCSS,
}) {
  const indexOfValue = (value, options) => {
    const option = options.find(option => option.value === value)
    return options.indexOf(option)
  }
  const indexOfValueProvided = indexOfValue(valueProvided, options)

  const { height, width } = { ...defaultDimensions, ...dimensions }
  const autoWidth = width ? `${width}px` : 'auto'
  const [focused, setFocused] = useState({ value: valueProvided, index: indexOfValueProvided })
  const [isOpen, setIsOpen] = useState(false)
  const [enterIsHeld, setEnterIsHeld] = useState(false)

  useEffect(() => {
    const index = indexOfValue(valueProvided, options)
    setFocused({ value: valueProvided, index })
  }, [valueProvided, options])

  const handleClick = idx => {
    const { value } = options[idx]
    handler(value)
  }

  const incrementFocused = increment => {
    const newIndex = focused.index + increment
    const indexWrapped = wrapAround(newIndex, [0, options.length])
    const { value } = options[indexWrapped]
    setFocused({ value, index: indexWrapped })
  }
  const handleKeyDown = e => {
    switch(e.keyCode) {
      case 9:
      case 27: if(isOpen) setIsOpen(false); break
      case 40: e.preventDefault(); incrementFocused(1); break
      case 38: e.preventDefault(); incrementFocused(-1); break
      case 32: e.preventDefault(); setEnterIsHeld(true); break
      case 13: setEnterIsHeld(true); break
      default:
    }
  }
  const handleKeyUp = e => {
    switch(e.keyCode) {
      case 38:
      case 40:
        e.preventDefault()
        if(!isOpen) handler(focused.value)
        break
      case 13:
      case 32:
        setEnterIsHeld(false)
        if(isOpen) handler(focused.value)
        setIsOpen(!isOpen)
        break
      default:
    }
  }

  return (
    <div
      css={css`
        ${dropdownCSS}
        ${injectCSS}
        .icon { 
          height: ${height}px;
          width:  ${height}px;
        }
        > .blocker {
          ${!isOpen && `pointer-events: none`}
        }
        > .spaceholder {
          width: ${width ? `${width - 46}px` : 'auto'};
          height: ${height}px;
        }
        > .select {
          width: ${autoWidth};
          z-index: ${isOpen ? 1000 : 0};
          height: auto;
          margin-top: -${isOpen ? height * focused.index : 0}px;
          &::after {
            z-index: ${isOpen ? 1001 : 0};
            transform: rotate(${isOpen ? 135 : -45}deg);
            right: 13px;
            top: ${isOpen ? 14 : 11}px;
          }
          > .option-list-window {
            height: ${isOpen ? height * options.length : height}px;
            width:  ${autoWidth};
            > .option-list {
              height: auto;
              width:  ${autoWidth};
              top: -${isOpen ? 0 : height * focused.index}px;
              > .option {
                width: ${width ? `${width - 46}px` : 'auto'};
                min-height: ${height}px;
                pointer-events: ${isOpen ? 'auto' : 'none'};
              }
            }
          }
        }
      `}
    >
      <div className='spaceholder'>
        {options.map((option, idx) =>
          <div key={`spaceholder${idx}`}>{option.label}</div>
        )}
      </div>
      <div className='blocker' onClick={() => setIsOpen(!isOpen)} />
      <div
        tabIndex='0'
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={enterIsHeld ? 'select active' : 'select'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon value='divot' />
        <Label text={labelText} />
        <div className='option-list-window'>
          <div className='option-list'>
            {options.map((option, idx) =>
              <div
                className={isOpen && idx === focused.index ? 'option focus' : 'option'}
                key={idx}
                value={idx}
                onClick={() => handleClick(idx)}
              >{option.label}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
