import { Box, Button, TextField, Typography } from "@mui/material";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import delet from "../../assets/delet.mp3";

function ItemsList() {
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todolist.todos);
  function HandleNavigate() {
    navigate("addtask");
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search Task"
          variant="outlined"
          size="small"
          sx={{ width: "60%", marginRight: "10px" }}
        />

        <Button variant="contained" color="primary" onClick={HandleNavigate}>
          Add New Task
        </Button>
      </Box>
      <Box mt="20px " sx={{ minHeight: "50vh" }}>
        {todos.length > 0 ? (
          todos.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
        ) : (
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            Task List is Empty
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default ItemsList;
