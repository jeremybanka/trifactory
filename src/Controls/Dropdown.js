import { useEffect, useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { wrapAround } from 'luum'
import { dropdownCSS } from './css'
import { Icon } from './Icon'
import Label from './Label'

const defaultDimensions =
{ height: 36,
  width: null }

export default function Dropdown({
  label = 'Label',
  handler = console.log(`no setter passed to colorPicker ${label}`),
  options,
  disabled = options.length === 0,
  valueProvided,
  dimensions,
  cssExtra,
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
    const index = indexOfValueProvided
    setFocused({ value: valueProvided, index })
  }, [valueProvided, indexOfValueProvided, options])

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
      className={`
        interactive
        ${disabled ? 'disabled' : ''}
      `}
      css={css`
        ${dropdownCSS}
        ${cssExtra}
        .icon { 
          height: ${height}px;
          width:  ${height}px;
          opacity: ${isOpen ? 0 : 1};
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
          > .option-list-window {
            height: ${isOpen ? height * options.length : height}px;
            min-height: ${height}px;
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
        {(
          options[0] ? options : [{ label: '--' }]
        ).map((option, idx) =>
          <div key={`spaceholder${idx}`}>{option.label}</div>
        )
      }
      </div>
      <div
        className='blocker'
        onClick={disabled ? null : () => setIsOpen(!isOpen)}
        onTouchEnd={disabled ? null : () => setIsOpen(!isOpen)}
      />
      <div
        tabIndex={disabled ? '-1' : '0'}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={`
          select
          ${disabled ? 'disabled' : ''}
          ${enterIsHeld ? 'active' : ''}
        `}
        onClick={disabled ? null : () => setIsOpen(!isOpen)}
      >
        <Icon value='divot' />
        {label && <Label
          text={label.text || label}
          place={label.place || 'above'}
        />}
        <div className='option-list-window'>
          <div className='option-list'>
            {(
              options[0] ? options : [{ label: '--' }]
            ).map((option, idx) =>
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
