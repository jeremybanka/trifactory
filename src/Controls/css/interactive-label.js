import { css } from '@emotion/core'

export const cssInteractiveLabel = css`
overflow: visible;
.label-wrap {
  pointer-events: none;
  display: flex;
  height: 20px;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-content: center;
  opacity: 0;
  transition: transform 0.15s ease-in, opacity 0.05s .1s;
  z-index: 100;
  label {
    display: flex;
    justify-content: center;
    position: absolute;
    height: 20px;
    padding: 0 5px;
    background-color: var(--fg-color);
    color: var(--bg-color);
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    &::before {
      content: "";
      z-index: -1;
      height: 5px;
      width: 5px;
      position: absolute;
      bottom: -8px;
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid var(--fg-color);
    }
  }
  &.above {
    transform: perspective(500px) rotateX(30deg) translateY(2px);
    top: -32px;
  }
  &.above-left {
    transform: perspective(500px) rotateX(30deg) translateY(2px);
    top: -30px;
    justify-content: flex-start;
    label:before {
      left: -5px;
      bottom: -5px;
      transform: perspective(500px) rotateZ(90deg)
    }
  }
  &.right {
    transform: perspective(500px) rotateY(10deg) translateX(2px);
    transform-origin: calc(0% - 5px) 50%;
    right: calc(-100% - 10px);
    justify-content: flex-start;
    label:before {
      left: -12px;
      bottom: 5px;
      transform: rotateZ(90deg);
    }
  }
  &.left {
    transform: perspective(500px) rotateY(-10deg) translateX(-2px);
    transform-origin: calc(100% + 5px) 50%;
    left: calc(-100% - 10px);
    justify-content: flex-end;
    label:before {
      right: -12px;
      bottom: 5px;
      transform: rotateZ(270deg);
    }
  }
}
&:hover,
&.focus,
&:focus,
&:focus-within {
  .label-wrap {
    opacity: 1;
    transition: transform 0.15s ease-in, opacity 0.1s .05s;
    &.above, &.above-left {
      transform: perspective(500px) translateY(0px);
    }
    &.right, &.left {
      transform: perspective(500px) translateX(0px);
    }
  }
}
`
