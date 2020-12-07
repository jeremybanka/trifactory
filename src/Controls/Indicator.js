/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Icon } from './Icon'

export default function Indicator({

}) {
  return (
    <div className='indicator'>
      <div className='box' />
      <Icon value='check' />
    </div>
  )
}

export function checkBox({

}) {
  return (
    <div className='indicator'>
      <div className='box' />
      <Icon value='check' />
    </div>
  )
}
