import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { FaTrash, FaEdit } from "react-icons/fa";
import DeleteDroppable from "./DeleteDroppable";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  &:hover {
    svg {
      opacity: 1;
      visibility: visible;
    }
  }
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "rgba(200, 200, 200,1.0)"
      : props.$draggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
  min-height: 150px;

  width: 250px;
  overflow-y: auto;
  margin-bottom: 45px;
`;
const BoardHeader = styled.header`
  height: 40px;
  width: 100%;
  padding: 0px 10px;
  display: flex;
  position: relative;
  border-bottom: 1px solid whitesmoke;
  margin-bottom: 10px;
  font-size: 20px;
  div {
    position: absolute;
    right: 10px;
  }
  svg {
    font-size: 22px;
    margin-left: 7px;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s ease-in-out;
    &:hover {
      transform: scale(120%);
    }
  }
`;
const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 10px;
`;
const Form = styled.form`
  width: 100%;
  position: absolute;
  bottom: 0px;
  margin-top: 30px;

  input {
    width: 100%;
    padding: 15px 15px;
    border: none;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      position: relative;
      left: 2px;
    }
  }
`;
const Box = styled.div<{ $isDragging: Boolean }>``;

export interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}
interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoardProps) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const handleBoardDelete = () => {
    const isDelete = window.confirm(
      `Are you sure you want to delete the ${boardId} board? `
    );
    if (!isDelete) return;
    setToDos((allBoards) => {
      const boardEntries = Object.entries(allBoards);
      const filter = boardEntries.filter(
        (board) => String(board[0]) !== boardId
      );
      const updateBoard = Object.fromEntries(filter);
      return updateBoard;
    });
  };
  const handleBoardEdit = () => {
    const newTitle = window.prompt(
      `What name do you want to change the ${boardId} to?`,
      `${boardId}`
    );
    if (!newTitle || newTitle.trim() === "") return;
    setToDos((prevToDos) => {
      const updatedEntries = Object.entries(prevToDos).map(([key, value]) => {
        if (key === boardId) {
          // 보드 아이디가 일치하는 경우, 새로운 타이틀을 사용하여 수정된 보드를 반환합니다.
          return [newTitle, value];
        }
        // 일치하지 않는 경우, 원래의 키와 값으로 구성된 쌍을 반환합니다.
        return [key, value];
      });

      // 수정된 보드 엔트리로부터 새로운 객체를 생성합니다.
      return Object.fromEntries(updatedEntries);
    });
  };
  return (
    <>
      <Draggable draggableId={boardId} index={index}>
        {(provided, snapshot) => (
          <Box
            $isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={boardId}>
              {(provided, snapshot) => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                  <BoardHeader>
                    <Title>{boardId}</Title>
                    <div>
                      <FaEdit onClick={handleBoardEdit} />
                      <FaTrash onClick={handleBoardDelete} />
                    </div>
                  </BoardHeader>
                  <Form onSubmit={handleSubmit(onValid)}>
                    <input
                      {...register("toDo", { required: true })}
                      type="text"
                      placeholder={`Write a ${boardId}`}
                    />
                  </Form>
                  <Area
                    $isDraggingOver={snapshot.isDraggingOver}
                    $draggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  >
                    {toDos.map((toDo, index) => (
                      <DraggableCard
                        key={toDo.id}
                        toDoText={toDo.text}
                        toDoId={toDo.id}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </Area>
                </Wrapper>
              )}
            </Droppable>
          </Box>
        )}
      </Draggable>
    </>
  );
};

export default Board;
