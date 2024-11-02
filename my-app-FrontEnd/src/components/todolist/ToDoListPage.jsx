import React, { useState } from 'react';
import todoData from '../../data/todoData';
import ToDoItem from './ToDoItem';
import AddToDo from './AddToDo';
import './ToDoListPage.css';

import { Box, Typography, useTheme, useMediaQuery, Button, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ToDoListPage = () => {
  const [todos, setTodos] = useState(todoData);

  const handleAdd = (title) => {
    const newTodo = {
      id: (todos.length + 1).toString(),
      title,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
      <Box m="20px">
        <Header title="To-Do List" subtitle="Manage your tasks effectively" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            fontSize: isNonMobile ? '14px' : '8px',
            backgroundColor: colors.primary[400],
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"

          }}
        >
          <AddToDo onAdd={handleAdd} />
          <Box mt="20px">
            {todos.map(todo => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            ))}
          </Box>
        </Box>
      </Box>
  );
};

export default ToDoListPage;
