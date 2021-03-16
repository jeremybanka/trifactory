import React from 'react' // eslint-disable-line
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core'
import { HUE_STRUCTURES, specToHex, wrapAround } from 'luum'
import { Dropdown, Panel, Slider, TextField, Toggle, Icon, ControlGroup } from '../Controls'
import { ControlCluster } from '../StyleDefinitions'

export default function HueControls({
  hue,
  hues,
  hueIdx,
  changeHue,
  addHue,
  deleteHue,
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
  const saveThisHue = content => changeHue({ targetIdx: hueIdx, content })

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
    <ControlGroup
      gap={2}
      gridTemplate='
          [row1-start] "view  tdn  field drops tdh  slider action" auto [row1-end]
          /             0fr   0fr  0fr   0fr   0fr   1fr   0fr'
    >
      {name
        ? (
          <>
            <div
              key={`hue-${hueIdx}`}
              css={css`
                  grid-area: view;
                  width: 36px;
                  height: 36px;
                  background: ${specToHex(
                { hue: angle, sat: 255, lum: 1, prefer: 'sat', tuner })};
                `}
            />
            <Toggle
              handler={toggleNameIsDerived}
              toggleStateProvided={nameIsDerived}
              gridArea='tdn'
              type='key'
              icon='auto'
              label='autoname ON'
            />
            <TextField
              label='Name'
              valueProvided={name}
              validate={validate}
              handler={name => saveThisHue({ name })}
              disabled={nameIsDerived}
              goButton
              undoButton
            />
            <Toggle
              disabled={hueIdx === 0}
              type='key'
              label={{ text: 'Derive Hue' }}
              dimensions={{ height: 36, trackWidth: 48 }}
              gridArea='tdh'
              handler={toggleHueIsDerived}
              toggleStateProvided={hueIsDerived}
              icon='auto'
            />
            <ControlCluster gridArea='drops'>
              <Dropdown
                label='Derive From'
                valueProvided={hue.deriveHue?.from}
                dimensions={{ width: 100 }}
                handler={from => adjustDeriveHue({ from })}
                disabled={!hueIsDerived}
                options={linkHueOptions.map(hue =>
                  ({ value: hue.name, label: hue.name })
                )}
              />
              <Dropdown
                label='Derive Via'
                valueProvided={hue.deriveHue?.via}
                dimensions={{ width: 100 }}
                handler={via => adjustDeriveHue({ via })}
                disabled={!hueIsDerived}
                options={hue.deriveHue?.from
                  ? Object.keys(HUE_STRUCTURES).slice(1).map(structure => (
                    { value: structure, label: structure }
                  ))
                  : []
              }
              />
              <Dropdown
                label='Derive To'
                valueProvided={hue.deriveHue?.to}
                dimensions={{ width: 100 }}
                handler={to => adjustDeriveHue({ to })}
                disabled={!hueIsDerived}
                options={hue.deriveHue?.via
                  ? HUE_STRUCTURES[hue.deriveHue?.via].map((structure, idx) => (
                    { value: idx, label: (`+ ${structure}°`) }
                  ))
                  : []
              }
              />
            </ControlCluster>
            <Slider
              label="Hue"
              handler={angle => saveThisHue({ angle })}
              disabled={hueIsDerived}
              valueProvided={wrapAround(angle, [0, 360])}
              range={[0, 360]}
              numeric
            />
            <Panel
              handler={(() => deleteHue(hueIdx))}
              dimensions={{ height: 36, width: 36 }}
              gridArea='action'
              label='Delete Hue'
            ><Icon value='close' /></Panel>
          </>
        ) : ( // no hue name
          <Panel
            handler={addHue}
            dimensions={{ height: 36 }}
            gridArea='action'
            label={{ text: 'Add Hue', place: 'left' }}
          >
            <Icon value='plus' />
          </Panel>
        )
      }
    </ControlGroup>
  )
}
