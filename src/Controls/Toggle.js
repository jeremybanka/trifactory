/** @jsx jsx */
import { css, jsx } from '@emotion/core' // eslint-disable-line
import { toggleWrap } from './controlStyles'
// import './controls.scss'

export default function Toggle({ id, label, checked, onChange }) {
  return (
    <div
      css={css`${toggleWrap}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        css={css`
          
        `}
      />
      <label
        htmlFor={id}
        css={css`
          
        }
        &::before,
        &::after {
          position: absolute;
        }
        &::before {
          // box & bg
          content: "";
          border-color: var(--applied);
          background-color: #aaa;
          display: inline-block;
          height: 20px;
          width: 20px;
          top: 10px;
          right: 10px;
          border-style: solid;
          border-width: 0px;
          transition: border-width 0.05s;
          //border-radius: 2px;
        }
        &::after {
          // checkmark
          content: "";
          display: inline-block;
          border: none;
          border-left: 3.5px solid #eee;
          border-bottom: 3.5px solid #eee;
          height: 7px;
          width: 12px;
          right: 14px;
          top: 15px;
          transform: rotate(-45deg) scale(0.75);
          opacity: 0;
          transform-origin: center;
          transition: transform 0.1s;
        }
      `}
      >
        {label}</label>
    </div>
  )
}
