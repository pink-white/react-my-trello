import styled from "styled-components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import Board from "./Board";
import DeleteDroppable from "./DeleteDroppable";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80vh;
  padding: 0px 50px;
  position: relative;
  bottom: -70px;
`;
const Boards = styled.div`
  display: flex;
  gap: 15px;
`;

const Drag = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { source, destination } = info;
    if (!destination) return;
    /*    if (!isNaN(Number(draggableId))) {
      console.log("Asfaf");
      setToDos((prevToDos) => {
        const updatedEntries = Object.entries(prevToDos).map(([key, value]) => {
          return [String(key), value];
        });
        console.log(updatedEntries);
        return Object.fromEntries(updatedEntries);
      });
    } */
    if (destination.droppableId === "Board") {
      setToDos((allBoards) => {
        const boardEntries = Object.entries(allBoards);
        const task = boardEntries[source.index];
        boardEntries.splice(source.index, 1);
        boardEntries.splice(destination.index, 0, task);
        const newObj = Object.fromEntries(boardEntries);
        return newObj;
      });
    } else {
      if (source.droppableId === destination?.droppableId) {
        setToDos((allBoards) => {
          const copyBoard = [...allBoards[source.droppableId]];
          const taskObj = copyBoard[source.index];
          copyBoard.splice(source.index, 1);
          copyBoard.splice(destination.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: copyBoard,
          };
        });
      }
      if (destination.droppableId === "Delete") {
        setToDos((allBoards) => {
          const copyBoard = [...allBoards[source.droppableId]];
          copyBoard.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: copyBoard,
          };
        });
      } else if (source.droppableId !== destination?.droppableId) {
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          sourceBoard.splice(source.index, 1);
          const destBoard = [...allBoards[destination.droppableId]];
          destBoard.splice(destination.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destBoard,
          };
        });
      }
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="Board" type="board" direction="horizontal">
            {(provided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Board
                    index={index}
                    toDos={toDos[boardId]}
                    key={boardId}
                    boardId={boardId}
                  />
                ))}
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
        <DeleteDroppable />
      </DragDropContext>
    </>
  );
};

export default Drag;
