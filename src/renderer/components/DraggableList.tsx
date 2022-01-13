import React, { ReactElement, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface DraggableListProps<T> {
  items: T[];
  renderItem: (item: T, isDragging: boolean) => ReactElement;
  onDragEnd: (sourceIndex: number, destinationIndex: number) => void;
}

export const DraggableList = <T extends { id: string }>({
  items,
  renderItem,
  onDragEnd: onDragEndCb,
}: DraggableListProps<T>) => {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.destination) {
        // only call the external onDragEnd if the item was dropped within the droppable area
        onDragEndCb(result.source.index, result.destination.index);
      }
    },
    [onDragEndCb],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                  const { isDragging } = snapshot;

                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}>
                      {renderItem(item, isDragging)}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
