import React from 'react'
import Button from './Button'
import Key from './Key'
import Switch from './Switch'

export default function Toggle({
  id,
  icon,
  disabled,
  labelText,
  toggleStateProvided,
  handler,
  type,
  dimensions,
  layout,
  injectCSS,
}) {
  switch(type) {
    case 'key': return (
      <Key
        id={id}
        icon={icon}
        disabled={disabled}
        labelText={labelText}
        toggleStateProvided={toggleStateProvided}
        handler={handler}
        dimensions={dimensions}
        layout={layout}
        injectCSS={injectCSS}
      />
    )
    case 'switch': return (
      <Switch
        id={id}
        disabled={disabled}
        labelText={labelText}
        toggleStateProvided={toggleStateProvided}
        handler={handler}
        dimensions={dimensions}
        layout={layout}
        injectCSS={injectCSS}
      />
    )
    default: return (
      <Button
        id={id}
        disabled={disabled}
        labelText={labelText}
        toggleStateProvided={toggleStateProvided}
        handler={handler}
        dimensions={dimensions}
        layout={layout}
        injectCSS={injectCSS}
      />
    )
  }
}
