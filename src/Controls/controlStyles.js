import { css } from '@emotion/core'

export const getCssGridTemplate = (templateName, y, x, z) => {
  switch(templateName) {
    case 'slider': return css`grid-template:
      [row1-start] "minus     slider    plus      " ${y}px [row1-end]
      /             ${y}px    ${x}px    ${y}px
      `
    case 'numeric-slider': return css`grid-template:
      [row1-start] "minus     slider    plus      number      " ${y}px [row1-end]
      /             ${y}px    ${x}px    ${y}px    ${z + 10}px
      `
    case 'icon-card': return css`grid-template:
      [row1-start] "magnitude   title       close       " 76px [row1-end]
      [row2-start] "magnitude   traits      traits      " 24px [row1-end]
      [row3-start] "left        right       right       " auto [row2-end]
      /             120px       auto        45px;
      `
    case 'title-left': return css`grid-template:
      [row1-start] "null      label     status    " ${y}px [row1-end]
      /             10px      auto      ${y}px
      `
    case 'title-right':
    default: return css`grid-template:
      [row1-start] "status    label     null      " ${y}px [row1-end]
      /             ${y}px    auto      10px
      `
  }
}
