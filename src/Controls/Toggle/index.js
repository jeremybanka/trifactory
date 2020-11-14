import React from 'react'
import Button from './Button'
import Switch from './Switch'

export default function Toggle({
  id,
  labelText,
  toggleStateProvided,
  handler,
  type,
  dimensions,
  layout,
  injectCSS,
}) {
  switch(type) {
    case 'switch': return (
      <Switch
        id={id}
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
