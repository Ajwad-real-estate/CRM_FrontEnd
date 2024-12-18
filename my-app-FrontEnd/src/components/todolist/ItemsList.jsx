import { Box, Button, TextField, Typography } from "@mui/material";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import delet from "../../assets/delet.mp3";
import { useTasks } from "./useTasks";
import formatTaskDates from "./date-visualization";
import ProgressCircle from "../ProgressCircle";

function ItemsList() {
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();
  //const todos = useSelector((state) => state.todolist.todos);
  const { isPending, data, error, isError } = useTasks();
  let All_TASKS = [];
  if (!isPending) {
    console.log(data.allTasks);
    console.log(data.todayTasks);
    console.log(data);
    All_TASKS = data.allTasks;
    console.log(All_TASKS);
    All_TASKS = All_TASKS.map((task) => formatTaskDates(task));
  }
  //length
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
      {data && !isPending && (
        <Box mt="20px " sx={{ minHeight: "50vh" }}>
          {All_TASKS.length > 0 ? (
            All_TASKS.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
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
      )}
      {isError && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {error}
        </Box>
      )}
      {isPending && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProgressCircle />
        </Box>
      )}
    </div>
  );
}

export default ItemsList;
