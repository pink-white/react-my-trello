import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { BsTrash2Fill } from "react-icons/bs";

const ToDoDeleteBox = styled.div<{ $isDraggingOver: Boolean }>`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isDraggingOver ? "tomato" : "white")};
  position: fixed;
  bottom: -120px;
  left: 43%;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;
  svg {
    font-size: 42px;
    position: fixed;
    bottom: 18px;
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
          {snapshot.isDraggingOver ? <BsTrash2Fill /> : <FaTrash />}

          {provided.placeholder}
        </ToDoDeleteBox>
      )}
    </Droppable>
  );
};
export default DeleteDroppable;
