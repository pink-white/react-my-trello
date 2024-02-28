import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { BsTrello } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { toDoState } from "../atoms";
const Wrapper = styled.div`
  width: 100vw;
  height: 90px;
  background: linear-gradient(to top, #74b9ff, #a29bfe);
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 4px 10px #0984e3;
`;
const TitleBox = styled.div`
  display: flex;
  font-size: 33px;
  align-items: center;
  margin-left: 50px;
`;
const Title = styled.h1`
  font-size: 38px;
  font-weight: 700;
  margin-left: 10px;
`;
const NewBoardBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: -400px;
`;
const BoardSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boardColor};
  margin-right: 7px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
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
  transition: 0.3s ease-in-out;
  &:focus {
    border-bottom: 2px solid #0984e3;
  }
`;

const Header = () => {
  const setBoard = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm();
  const createBoard = (data: any) => {
    console.log(data);
    setBoard((allBoard) => {
      return {
        ...allBoard,
        [data.board]: [],
      };
    });
    setValue("board", "");
  };

  return (
    <Wrapper>
      <TitleBox>
        <BsTrello />
        <Title>My trello</Title>
      </TitleBox>
      <NewBoardBox>
        <Form onSubmit={handleSubmit(createBoard)}>
          <BoardSpan>
            <FaPlus />
            Create New Board
          </BoardSpan>

          <Input {...register("board", { required: true })} type="text" />
          <button type="submit">GWEG</button>
        </Form>
      </NewBoardBox>
    </Wrapper>
  );
};

export default Header;
