import React from 'react'
import Button from './Button'
import Switch from './Switch'

export default function Toggle({
  id,
  label = 'Prefer Sat.',
  checked,
  handler,
  type,
  dimensions,
  templateName,
  colorScheme,
}) {
  switch(type) {
    case 'switch': return (
      <Switch
        id={id}
        label={label}
        checked={checked}
        handler={handler}
        dimensions={dimensions}
        templateName={templateName}
        colorScheme={colorScheme}
      />
    )
    default: return (
      <Button
        id={id}
        label={label}
        checked={checked}
        handler={handler}
        dimensions={dimensions}
        templateName={templateName}
        colorScheme={colorScheme}
      />
    )
  }
}
