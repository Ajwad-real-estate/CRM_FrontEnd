import { Box, Button, TextField, Typography } from "@mui/material";
import ToDoItem from "./tasks/TaskItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "./tasks/taskQueries";
import formatTaskDates from "./utils/date-visualization";
import ProgressCircle from "../ProgressCircle";
import ActionItem from "./actions/ActionItem";
// import ActionItem from "./actions/addActionForm";

function ItemsList() {
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();
  //const todos = useSelector((state) => state.todolist.todos);
  const { isPending, data, error, isError } = useTasks();
  let All_TASKS = [];
  let All_ACTIONS = [];
  if (!isPending) {
    console.log(data);
  }
  // console.log(data.allTasks);
  // console.log(data.allActions);
  if (!isPending) {
    All_TASKS = data.allTasks;
    All_TASKS = All_TASKS.map((task) => formatTaskDates(task));
    All_TASKS = All_TASKS.sort((a, b) => b.priority_level - a.priority_level);

    All_ACTIONS = data.allActions;
    All_ACTIONS = All_ACTIONS.map((task) => formatTaskDates(task));
    All_ACTIONS = All_ACTIONS.sort(
      (a, b) => b.priority_level - a.priority_level
    );
    console.log(All_TASKS);
  }
  console.log(All_ACTIONS);
  console.log(All_TASKS);
  //length
  function HandleNavigate() {
    navigate("addtask");
  }
  return (
    <div
      style={{
        width: "100%",
        height: "80vh",

        display: "flex",
        flexDirection: "column",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search Task"
          variant="outlined"
          size="small"
          sx={{ width: "85%", marginRight: "10px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={HandleNavigate}
          sx={{ width: "10%", marginRight: "10px", minWidth: "110px" }}>
          Add New Task
        </Button>
      </Box>
      {data && !isPending && !isError && (
        <Box
          sx={{
            flex: 1, // Take up remaining space
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            overflowY: "auto", // Enable scrolling if content overflows
          }}>
          <Box
            mt="20px"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}>
            <Typography
              variant="h3"
              sx={{ marginBottom: "10px", marginTop: "18px" }}>
              Tasks
            </Typography>
          </Box>
          {All_TASKS.length > 0 ? (
            All_TASKS.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onDelete={(taskId) => {
                  // Optimistically update local state
                  All_TASKS = All_TASKS.filter((task) => task.id !== taskId);
                }}
              />
            ))
          ) : (
            <Typography
              variant="h2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "60px",
              }}>
              Task List is Empty
            </Typography>
          )}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}>
            <Typography
              variant="h3"
              sx={{ marginBottom: "10px", marginTop: "18px" }}>
              Actions
            </Typography>
          </Box>
          {All_ACTIONS.length > 0 ? (
            All_ACTIONS.map((todo) => (
              <ActionItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "60px",
                  border: "10px solid",
                }}
                key={todo.id}
                todo={todo}
              />
            ))
          ) : (
            <Typography
              variant="h2"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "60px",
              }}>
              Action List is Empty
            </Typography>
          )}
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {error}
        </Box>
      )}
      {isPending && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <ProgressCircle rotate />
        </Box>
      )}
    </div>
  );
}

export default ItemsList;
