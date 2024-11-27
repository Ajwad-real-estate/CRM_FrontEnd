import { createContext, useContext, useEffect, useState } from "react";
import add from "./add.mp3";
import delet from "./delet.mp3";
import { checkTaskDateValidation } from "../../../helpers/dates";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import todoData from "../../../data/todoData";

const ToDoContext = createContext();

function ToDoListProvider({ children }) {
  //YourStates Here-->
  const [todos, setTodos] = useState(todoData);
  const navigate = useNavigate();

  function HandleNavigate() {
    navigate("addtask");
  }
  const onAdd = (
    title,
    deadLineDate,
    deadLineTime,
    startDate,
    startTime,
    taskDetails
  ) => {
    if (!deadLineDate || !deadLineTime || !title) {
      return;
    }

    const newTodo = {
      id: (todos.length + 1).toString(),
      title,

      deadLineDate,
      deadLineTime,
      completed: false,
      startTime,
      startDate,
      taskDetails,
    };
    if (startDate && startTime) {
      console.log(
        checkTaskDateValidation(
          startDate,
          startTime,
          deadLineDate,
          deadLineTime
        )
      );

      if (
        !checkTaskDateValidation(
          startDate,
          startTime,
          deadLineDate,
          deadLineTime
        )
      ) {
        toast.error("Task Time is not valid");
        return;
      }
    }
    toast.success("Task added Successfully");
    setAddSound(true);
    setTodos([...todos, newTodo]);
  };

  const handleComplete = (id) => {
    let updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    updatedTodos = updatedTodos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  useEffect(
    function () {
      const playSound = function () {
        if (addsound) {
          const sound = new Audio(add);
          sound.play();
        } else if (dltSound) {
          const sound = new Audio(delet);
          sound.play();
        }
        setAddSound(false);
        setDltSound(false);
      };
      playSound();
    },
    [addsound, dltSound, setAddSound, setDltSound]
  );

  //
  return (
    <ToDoContext.Provider
      value={{
        todos,
        onAdd,
        handleComplete,

        HandleNavigate,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

function useListInfo() {
  const context = useContext(ToDoContext);
  if (context === undefined) {
    throw new Error(`You 're consuming the Context out of the Provider`);
  }
  return context;
}
export { ToDoListProvider, useListInfo };
