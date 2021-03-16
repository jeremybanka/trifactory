import arrayMove from 'array-move'

export default function manageDragUi(state, setState) {
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if(!destination) return
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    if(type === 'column') {
      const columnOrder = arrayMove(state.columnOrder, source.index, destination.index)
      setState({ ...state, columnOrder })
      return
    }

    const home = state.columns[source.droppableId]
    const foreign = state.columns[destination.droppableId]

    if(home === foreign) {
      const newTaskIds = arrayMove(
        home.taskIds, source.index, destination.index
      )
      const newColumn = {
        ...home,
        taskIds: newTaskIds,
      }
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }
      setState(newState)
      return
    }

    const homeTaskIds = Array.from(home.taskIds)
    homeTaskIds.splice(source.index, 1)
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    }
    const foreignTaskIds = Array.from(foreign.taskIds)
    foreignTaskIds.splice(destination.index, 0, draggableId)
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    }
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    }
    setState(newState)
  }
  return [state, onDragEnd]
}

const tilesSamples = {
  tiles: {
    'tile-1': {
      id: 'tile-1',
      content: 'Take out the garbage',
      tileIds: [],
    },
    'tile-2': {
      id: 'tile-2',
      content: 'Watch my favorite show',
      tileIds: [],
    },
    'tile-3': {
      id: 'tile-3',
      content: 'Charge phone',
      tileIds: ['tile-4'],
    },
    'tile-4': {
      id: 'tile-4',
      content: 'Cook dinner',
      tileIds: [],
    },
  },
  // Facilitate reordering of the columns
  tileOrder: ['tile-1', 'tile-2', 'tile-3'],
}
