import { Box, Button, colors, TextField, Typography } from "@mui/material";
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
  let TODAY = [];
  console.log(data);
  if (!isPending) {
    All_TASKS = data.allTasks;
    TODAY = data.todayTasks;

    All_TASKS = All_TASKS.map((task) => formatTaskDates(task));
    TODAY = TODAY.map((task) => formatTaskDates(task));
    All_TASKS = All_TASKS.sort((a, b) => b.priority_level - a.priority_level);
    TODAY = TODAY.sort((a, b) => b.priority_level - a.priority_level);
    console.log(All_TASKS);
    console.log(TODAY);
  }
  //length
  function HandleNavigate() {
    navigate("addtask");
  }
  return (
    <div
      style={{
        width: "90%",

        height: `${isPending ? "80vh" : "100%"}`,
      }}
    >
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
      {data && !isPending && !isError && (
        <Box
          sx={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "30px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ marginBottom: "10px", marginTop: "18px" }}
          >
            Today&apos;s Tasks
          </Typography>
          <Box
            mt="20px"
            sx={{
              height: "200px",
              width: "100%",
              overflowY: "scroll",
              borderRadius: "10px",
            }}
          >
            {TODAY.length > 0 ? (
              TODAY.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
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
                No Tasks Today
              </Typography>
            )}
          </Box>
          <Typography
            variant="h3"
            sx={{ marginBottom: "10px", marginTop: "18px" }}
          >
            All Tasks
          </Typography>
          <Box
            mt="20px "
            sx={{ height: "400px", width: "100%", overflowY: "scroll" }}
          >
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
          <ProgressCircle rotate />
        </Box>
      )}
    </div>
  );
}

export default ItemsList;
