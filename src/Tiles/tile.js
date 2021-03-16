import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  color: white;
  font-weight: 200;
  padding: 8px;
`
const Tasklist = styled.div`
  padding: 8px;
  transition-property: background height;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  background: ${props => (props.isDraggingOver ? '#00ffff99' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`

export default function Tile({
  structure,
  index,
}) {
  const { id, direction, locked, type, content } = structure

  switch(type) {
    case 'strip': return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              {id}
            </Title>
            <Droppable
              droppableId={id}
              direction="horizontal"
              type="ui"
            >
              {provided => (
                <Container
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {content.map((structure, index) => (
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
          </Container>
        )}
      </Draggable>
    )
    case 'stack': return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              {id}
            </Title>
            {content.map((structure, index) => (
              <Tile
                key={structure.id}
                index={index}
                structure={structure}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
    )
    case 'terminal': return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              {id}
            </Title>
          </Container>
        )}
      </Draggable>
    )

    default: throw new Error('oops')
  }
/*
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>
            {content}
          </Title>
          <Droppable droppableId={id} type="ui">
            {(provided, snapshot) => (
              <Tasklist
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {childTiles.map((childTile, index) =>
                  <Tile
                    key={childTile.id}
                    tile={childTile}
                    childTiles={childTile.tileIds}
                    index={index}
                  />)}
                {provided.placeholder}
              </Tasklist>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
  */
}
