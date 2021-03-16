import React from 'react'
import Button from './Button'
import Key from './Key'
import Switch from './Switch'

export default function Toggle({
  type,
  id = Math.random(),
  icon,
  disabled,
  label,
  toggleStateProvided,
  handler,
  dimensions,
  layout,
  gridArea,
  cssExtra,
}) {
  switch(type) {
    case 'key': return (
      <Key
        id={id}
        icon={icon}
        disabled={disabled}
        label={label}
        toggleStateProvided={toggleStateProvided}
        handler={handler}
        dimensions={dimensions}
        layout={layout}
        gridArea={gridArea}
        cssExtra={cssExtra}
      />
    )
    case 'switch': return (
      <Switch
        id={id}
        disabled={disabled}
        label={label}
        toggleStateProvided={toggleStateProvided}
        handler={handler}
        dimensions={dimensions}
        layout={layout}
        gridArea={gridArea}
        cssExtra={cssExtra}
      />
    )
    default: return (
      <Button
        id={id}
        disabled={disabled}
        label={label}
        toggleStateProvided={toggleStateProvided}
        handler={handler}
        dimensions={dimensions}
        layout={layout}
        gridArea={gridArea}
        cssExtra={cssExtra}
      />
    )
  }
}
