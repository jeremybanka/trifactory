import { css } from '@emotion/core'
import { buttonCSS } from './button'
import { cssInteractiveLabel } from './interactive-label'
import { cssInteractiveTransform } from './interactive-transform'
import { panelCSS } from './panel'

export const dropdownCSS = css`
overflow: visible;
display: flex;
* {
  transition-property: all;
  transition-duration: .1s;
  transition-timing-function: ease-in;
}
.icon {
  pointer-events: none;
  z-index: 1002;
  font-size: 13.5px; 
  font-variation-settings: 'wght' 300;
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
}
> .blocker {
    z-index: 10;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
}
> .spaceholder {
  user-select: none;
  padding-left: 10px;
  padding-right: 36px;
  text-align: left;
  overflow: hidden; pointer-events: none; opacity: 0;
  }
> .select {
  ${panelCSS};
  ${cssInteractiveTransform};
  ${cssInteractiveLabel}
  background: none;
  display: inline-flex;
  position: absolute;
  > .option-list-window {
    position: relative;
    overflow: hidden;
    > .option-list {
      position: relative;
      > .option {
        ${buttonCSS};
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
        padding-right: 36px;
        background-color: var(--bg-color);
        white-space: nowrap;
        //opacity: .88;
      }
    }
  }
  &::-ms-expand {
    display: none;
  }

}
`
