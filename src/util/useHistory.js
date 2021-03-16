import { useState } from "react"

export default function useHistory(defaultValue = '') {
  const [state, setState] = useState(
    () => typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue
  )
  const [marker, setMarker] = useState(0)
  const [timeline, setTimeline] = useState([])

  const makeChange = change => {
    const { content, fromHistory } = change
    let newState = { ...state }
    let newMarker = marker
    const newTimeline = [...timeline]
    switch(fromHistory) {
      case 'undo': newMarker += 1; break
      case 'redo': newMarker -= 1; break
      default:
        const contentInverse = {}
        const contentKeys = Object.keys(change)
        for(let index = 0; index < contentKeys.length; index++) {
          const contentKey = contentKeys[index]
          contentInverse[contentKey] = state[contentKey]
        }
        const newTimelineStep = {
          undo: contentInverse,
          redo: content,
        }
        newTimeline.splice(0, newMarker, newTimelineStep)
        newMarker = 0
        // console.log('||| newMarker', newMarker)
    }
    newState = { ...state, ...content }
    setState(newState)
    setMarker(newMarker)
    setTimeline(newTimeline)
    /*
    console.log('change.fromHistory', change.fromHistory)
    console.log('newHistory', newHistory)
    console.log('timeline', ...newTimeline)
    */
  }
  const traverseTimeline = direction => {
    const markerFromDirection = direction === 'undo' ? marker : marker - 1
    if(typeof timeline[markerFromDirection] === 'undefined') return
    makeChange({
      content: timeline[markerFromDirection][direction],
      fromHistory: direction,
    })
  }
  const undoChange = () => traverseTimeline('undo')
  const redoChange = () => traverseTimeline('redo')
  const changeState = {
    with: makeChange,
    undo: undoChange,
    redo: redoChange,
    cannotUndo: marker === 0,
    cannotRedo: marker === timeline.length,
  }
  return [state, changeState]
}
