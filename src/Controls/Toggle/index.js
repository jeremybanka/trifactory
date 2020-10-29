import React from 'react'
import Button from './Button'
import Switch from './Switch'

export default function Toggle({
  id,
  label,
  checkProvided,
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
        checkProvided={checkProvided}
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
        checkProvided={checkProvided}
        handler={handler}
        dimensions={dimensions}
        templateName={templateName}
        colorScheme={colorScheme}
      />
    )
  }
}
