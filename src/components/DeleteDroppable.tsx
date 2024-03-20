import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FcFullTrash } from "react-icons/fc";
import { FcEmptyTrash } from "react-icons/fc";

const ToDoDeleteBox = styled.div<{ $isDraggingOver: Boolean }>`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isDraggingOver ? "rgba(255, 118, 117,1)" : "rgba(116, 185, 255, 1)"};
  position: fixed;
  bottom: -120px;
  left: 43%;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;
  svg {
    font-size: 60px;
    position: fixed;
    bottom: 13px;
    color: ${(props) => props.theme.iconColor};
    transition: 0.2s ease-in-out;
    transform: ${(props) => (props.$isDraggingOver ? `scale(115%)` : `none`)};
  }
`;

const DeleteDroppable = () => {
  return (
    <Droppable droppableId="Delete">
      {(provided, snapshot) => (
        <ToDoDeleteBox
          ref={provided.innerRef}
          {...provided.droppableProps}
          $isDraggingOver={snapshot.isDraggingOver}
        >
          {snapshot.isDraggingOver ? <FcFullTrash /> : <FcEmptyTrash />}

          {provided.placeholder}
        </ToDoDeleteBox>
      )}
    </Droppable>
  );
};
export default DeleteDroppable;
