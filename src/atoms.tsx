import { atom, AtomEffect } from "recoil";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? window.localStorage.removeItem(key)
        : window.localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoStateProps {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoStateProps>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects: [localStorageEffect("toDos")],
});
