import manageHistory from "./manageHistory"
import useLocalStorageState from "./useLocalStorageState"

export default function useLocalHistory(key, defaultValue = '') {
  const [state, setState] = useLocalStorageState(
    key,
    () => typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue
  )
  const [marker, setMarker] = useLocalStorageState(`${key}TimelineMarker`, 0)
  const [timeline, setTimeline] = useLocalStorageState(`${key}Timeline`, [])

  const {
    makeChange,
    undoChange,
    redoChange,
  } = manageHistory({
    state,
    marker,
    timeline,
    setState,
    setMarker,
    setTimeline,
  })

  const changeState = {
    to: makeChange,
    undo: undoChange,
    redo: redoChange,
    cannotUndo: marker === 0,
    cannotRedo: marker === timeline.length,
  }
  return [state, changeState]
}
