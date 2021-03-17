import React from "react"
import {
  HashRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom"
// luum
import { builtInTunerKit } from "luum"
// logic
import manageHues from "./logic/manageHues"
import manageColors from "./logic/manageColors"
// Structure
import { DemoSelect, ColorLogicDemo } from "./StyleDefinitions"
import { TilesDemo } from "./Tiles"
// Children
import PaletteModule from "./PaletteModule"
// temporary
import calibrationSheets from "./preconfig/calibrationSheets"
import useLocalStorageState from "./util/useLocalStorageState"
import HueModule from "./HuesModule"

localStorage.clear()

export default function Application() {
  const tuner = builtInTunerKit.simulateCMYK
  const [hues, setHues] = useLocalStorageState(
    "hues",
    calibrationSheets.default.hues
  )
  const [colors, setColors] = useLocalStorageState(
    "colors",
    calibrationSheets.default.colors
  )

  const [
    changeColor,
    applyChangesToColors,
    undoChange,
    redoChange,
    addColor,
    deleteColor,
  ] = manageColors(colors, setColors, tuner, hues)

  const [changeHue, applyChangesToHues, addHue, deleteHue] = manageHues(
    hues,
    setHues,
    colors,
    applyChangesToColors
  )

  return (
    <HashRouter basename="logic">
      <DemoSelect>
        <ul>
          <li>
            <Link to="/">Tiles</Link>
          </li>
          <li>
            <Link to="/logic">Logic</Link>
          </li>
        </ul>
      </DemoSelect>
      <Switch>
        <Route exact path="/#">
          <TilesDemo colors={colors} setColors={setColors} tuner={tuner} />
        </Route>
        <Route path="/#logic">
          <ColorLogicDemo>
            <HueModule
              hues={hues}
              changeHue={changeHue}
              addHue={addHue}
              deleteHue={deleteHue}
              applyChangesToHues={applyChangesToHues}
              tuner={tuner}
            />
            {[...colors, undefined].map((color, colorIdx) => (
              <PaletteModule
                key={`color-${colorIdx}`}
                hues={hues}
                tuner={tuner}
                color={color}
                colorIdx={colorIdx}
                addColor={addColor}
                deleteColor={deleteColor}
                changeColor={changeColor}
                undoChange={undoChange}
                redoChange={redoChange}
              />
            ))}
          </ColorLogicDemo>
        </Route>
      </Switch>
    </HashRouter>
  )
}
// ${color ? color.hue : 0}-${color ? color.sat : 0}-${color ? color.lum : 0}
