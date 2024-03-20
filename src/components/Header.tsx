import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { BsTrello } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useRef } from "react";
import { toDoState } from "../atoms";
const Wrapper = styled.div`
  width: 100vw;
  height: 90px;
  background: linear-gradient(to top, #74b9ff, #a29bfe);
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 10px #0984e3;
  position: sticky;
  top: 0px;
  z-index: 1;
`;
const TitleBox = styled.div`
  display: flex;
  font-size: 33px;
  align-items: center;
  margin-left: 50px;
`;
const Title = styled.h1`
  font-size: 35px;
  font-weight: 700;
  margin-left: 10px;
`;
const NewBoardBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: -200px;
`;
const CreateBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(116, 185, 255, 1);
  margin-right: 7px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid whitesmoke;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    transform: scale(108%);
  }
  svg {
    margin-right: 5px;
  }
`;
const Form = styled.form``;
const Input = styled.input`
  border: none;
  padding: 10px;
  outline: none;
  background: transparent;
  border-bottom: 2px solid #0984e3;
  opacity: 0;
  width: 300px;
  transition: 0.3s ease-in-out;
  &:focus {
    opacity: 1;
  }
`;

const Header = () => {
  const setBoard = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm();
  //ref를 따로 설정하기 위해 분리
  const { ref, ...rest } = register("board");
  const createBoard = (data: any) => {
    setBoard((allBoard) => {
      return {
        ...allBoard,
        [data.board]: [],
      };
    });
    setValue("board", "");
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <Wrapper>
      <TitleBox>
        <BsTrello />
        <Title>My trello</Title>
      </TitleBox>
      <NewBoardBox>
        <CreateBoard onClick={onClick}>
          <FaPlus />
          Create New Board
        </CreateBoard>
        <Form onSubmit={handleSubmit(createBoard)}>
          <Input
            {...rest}
            type="text"
            placeholder="Board name"
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
          />
        </Form>
      </NewBoardBox>
    </Wrapper>
  );
};

export default Header;
