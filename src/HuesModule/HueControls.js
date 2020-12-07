import React from 'react' // eslint-disable-line
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core'
import { HUE_STRUCTURES, specToHex } from 'luum'
import { Dropdown, Panel, Slider, TextField, Toggle, Icon } from '../Controls'
import { ControlStrip } from '../StyleDefinitions'

export default function HueControls({
  hue,
  hues,
  hueIdx,
  addHue,
  deleteHue,
  applyChangesToHues,
  tuner,
}) {
  const { name, angle, deriveHue, hueIsDerived, nameIsDerived } = hue
  const linkHueOptions = [...hues].slice(0, hueIdx)

  const validate = {
    final: attempt =>
      !(hues.some(hue => hue.name === attempt))
      &&
      attempt.length !== 0,
  }
  const saveThisHue = content => applyChangesToHues([{ targetIdx: hueIdx, content }])

  const toggleHueIsDerived = () => {
    let newDeriveHue = { ...deriveHue }
    if(deriveHue === null) {
      newDeriveHue = {
        from: hues[0].name,
        via: Object.keys(HUE_STRUCTURES)[1],
        to: 0,
      }
    }
    saveThisHue({
      hueIsDerived: !hueIsDerived,
      deriveHue: newDeriveHue,
    })
  }
  const toggleNameIsDerived = () => {
    saveThisHue({ nameIsDerived: !hue.nameIsDerived })
  }

  const adjustDeriveHue = content => {
    const newDeriveHue = { ...deriveHue, ...content }
    saveThisHue({ deriveHue: newDeriveHue })
  }

  return (
    <ControlStrip>
      {name
        ? (
          <>
            <div
              key={`hue-${hueIdx}`}
              css={css`
                  width: 36px;
                  height: 36px;
                  background: ${specToHex(
                { hue: angle, sat: 255, lum: 1, prefer: 'sat', tuner })};
                `}
            />
            <Toggle
              handler={toggleNameIsDerived}
              toggleStateProvided={nameIsDerived}
              type='key'
              icon='go'
            />
            <TextField
              id={hueIdx}
              handler={name => saveThisHue({ name })}
              valueProvided={name}
              validate={validate}
              goButton
              undoButton
              disabled={nameIsDerived}
            />
            <Toggle
              disabled={hueIdx === 0}
              type='switch'
              dimensions={{ height: 36, trackWidth: 48 }}
              handler={toggleHueIsDerived}
              toggleStateProvided={hueIsDerived}
            />
            {hueIsDerived
              ? (
                <>
                  <Dropdown
                    labelText='Source'
                    valueProvided={hue.deriveHue?.from}
                    dimensions={{ width: 100 }}
                    handler={from => adjustDeriveHue({ from })}
                    options={linkHueOptions.map(hue =>
                      ({ value: hue.name, label: hue.name })
                    )}
                  />
                  <Dropdown
                    labelText='Relation'
                    valueProvided={hue.deriveHue?.via}
                    dimensions={{ width: 100 }}
                    handler={via => adjustDeriveHue({ via })}
                    options={Object.keys(HUE_STRUCTURES).slice(1).map(structure => (
                      { value: structure, label: structure }
                    ))}
                  />
                  <Dropdown
                    labelText='Transformation'
                    valueProvided={hue.deriveHue?.to}
                    dimensions={{ width: 100 }}
                    handler={to => adjustDeriveHue({ to })}
                    options={HUE_STRUCTURES[hue.deriveHue?.via].map((structure, idx) => (
                      { value: idx, label: structure }
                    ))}
                  />
                </>
              ) : ( // no hue from
                <Slider
                  dimensions={{ rangeWidth: 188 }}
                  labelText="Hue"
                  handler={angle => saveThisHue({ angle })}
                  valueProvided={angle}
                  range={[0, 360]}
                  numeric
                />
              )
            }
            <Panel
              onClick={(() => deleteHue(hueIdx))}
              dimensions={{ height: 36, width: 36 }}
            ><Icon value='close' /></Panel>
          </>
        ) : ( // no hue name
          <Panel
            onClick={addHue}
            dimensions={{ height: 36 }}
            label='Add Hue'
          >
            <Icon value='plus' />
          </Panel>
        )
      }
    </ControlStrip>
  )
}
