import { css } from '@emotion/core'
import { buttonCSS } from './button'
import { cssInteractiveLabel } from './interactive-label'
import { cssInteractiveTransform } from './interactive-transform'
import { panelCSS } from './panel'
import { resistClickCSS } from './resist-click'

export const sliderCSS = css`
  ${panelCSS};
  ${cssInteractiveLabel}
  ${cssInteractiveTransform};
  ${resistClickCSS};
  display: inline-flex;
  &:hover,
  &.focus,
  &:focus,
  &:focus-within { .range-wrapper {
    .range .track {
      opacity: 1;
      .thumb { 
      background: none;
    }
  }
    input[type=range] {
      &::-webkit-slider-thumb {
          opacity: 1;
          transform: scaleY(1.01);
        }
      &::-moz-range-thumb {
        border: none;
        opacity: 1;
        transform: scaleY(1.01);
      }
    }
  }}
  &.disabled,
  &:disabled {
    background-color: var(--bg-color);
    &:hover,
    &.focus,
    &:focus,
    &:focus-within { 
      .range-wrapper .range .track .thumb { 
        background: var(--mg-color); 
//        .label {opacity: 1;}
      }
      .range-wrapper input[type=range] {
        &::-webkit-slider-thumb { opacity: 0; }
        &::-moz-range-thumb { opacity: 0; }
      } 
    }
    input[type=number] { 
      opacity: 80%;
    }
    .range-wrapper  .range .track, 
    input[type=number] { 
      background: #00000000; 
    }
    .range-wrapper input[type=range],
    input[type=number] { 
      cursor: not-allowed; 
      &::-webkit-slider-thumb {  cursor: not-allowed; }
      &::-moz-range-thumb { cursor: not-allowed; }
      &:hover,
      &.focus,
      &:focus,
      &:focus-within {
        &::-webkit-slider-thumb { background: var(--mg-color); }
        &::-moz-range-thumb { background: var(--mg-color); }
      }
    }
  }
  .range-wrapper {
    flex-grow: 1;
    display: grid;
    grid-template: 
      [row1-start] "content" auto [row1-end]
      /             auto;    
    input[type=range] {
      cursor: pointer;
      z-index: 10;
      grid-area: content;
      margin: 0px;
      appearance: none;
      outline: none;
      border-radius: 0;
      background: #00000000;
      // opacity: .2;
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        cursor: grab;
        appearance: none;
        opacity: 0;
        border: none;
        width: 20px;
        background: var(--mg-color);
      }
      &::-moz-range-thumb {
        cursor: grab;
        border-radius: 0px;
        opacity: 0;
        width: 20px;
        background: var(--mg-color);
      }
      &:hover,
      &.focus,
      &:focus,
      &:focus-within {
        &::-webkit-slider-thumb { background: var(--fg-color); }
        &::-moz-range-thumb { background: var(--fg-color); }
      }
    }
    .range {
      cursor: not-allowed;
      width: 100%;
      grid-area: content;
      .track {
        pointer-events: none;
        overflow-x: visible;
        transition: all 0.33s ease-out;
        background-color: var(--ex-bg-color);
        opacity: .75;
        // box-shadow: 0 0px 0px 1px var(--fg-color);
        .thumb { 
          background: var(--mg-color);
          overflow: visible;
          transition: margin 0.33s ease-out;
          opacity: 1;
        }
      }
    }
  }
  input[type=number] {
    border: none;
    border-radius: 0;
    color: var(--ex-fg-color);
    background-color: var(--ex-bg-color);
    font-weight: 500;
    font-size: 15px;
    margin: 3px;
    margin-left: 0;
    padding: 0;
    padding-left: 7px;
    &:hover,
    &.focus,
    &:focus,
    &:focus-within {
      box-shadow: 0 0 0 0;
      outline: none;
    }
  }
  button {
    ${buttonCSS}
    margin: 3px;
    &:disabled {
      color: var(--fg-color);
    }
    .icon { 
      font-size: 13.5px; 
      font-variation-settings: 'wght' 300;
    }
  }
`
