/** @jsx jsx */
import { jsx } from '@emotion/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import manageDragUi from '../util/manageDragUi'
import useLocalStorageState from '../util/useLocalStorageState'
import Tile from './tile'
import uiSample from './uiSample'

/*
const SortableContainer = sortableContainer(({ children }) => (
  <ul css={css`
    display: flex;
    width: 100%;
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    flex-wrap: wrap;
  `}
  >{children}
  </ul>)
)
*/

const Container = styled.div`
  display: flex;
  width: 100%;
`

export function TilesDemo() {
  const [ui, setUi] = useLocalStorageState('ui', uiSample)
  const onDragEnd = manageDragUi(ui, setUi)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="root"
        direction="horizontal"
        type="ui"
      >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {ui.layout.content.map((structure, index) => (
              <Tile
                key={structure.id}
                index={index}
                structure={structure}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
