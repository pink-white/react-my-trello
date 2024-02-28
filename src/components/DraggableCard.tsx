import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ $isDragging: Boolean }>`
  width: 100%;
  height: 70px;
  background-color: ${(props) =>
    props.$isDragging ? "rgba(116, 185, 255,0.6)" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "2px 2px 10px rgba(0,0,0,0.5)" : "none"};
  margin-bottom: 10px;
  border-radius: 5px;
  span {
    font-size: 17px;
    font-weight: 500;
    position: relative;
    bottom: -20px;
    margin-left: 10px;
  }
`;

interface IDraggableCardProps {
  toDoText: string;
  toDoId: number;
  index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{toDoText}</span>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
