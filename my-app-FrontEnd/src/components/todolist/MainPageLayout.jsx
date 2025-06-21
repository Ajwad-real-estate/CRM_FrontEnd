import { Box, Button, Tab, Tabs, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ToDoItem from "./tasks/TaskItem";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "./tasks/taskQueries";
import formatTaskDates from "./utils/date-visualization";
import ProgressCircle from "../dashboard Charts/ProgressCircle";
import ActionItem from "./actions/ActionItem";
import AddToDo from "./tasks/AddToDo";
// import ActionItem from "./actions/addActionForm";

function ItemsList({ optionValue = 0 }) {
  const [searchQuery, setSearchQuery] = useState();
  const [activeTab, setActiveTab] = useState(optionValue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setActiveTab(optionValue);
  }, [optionValue]);
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
    navigate("addtask", { state: { refetch: true } });
  }

  // useEffect(() => {
  //   const unlisten = navigate.listen((location) => {
  //     if (location.state?.refetch) {
  //       // Trigger refetch of data
  //       useTasks.refetch();
  //     }
  //   });

  //   return () => {
  //     unlisten();
  //   };
  // }, [navigate]);
  let VIEW_All_TASKS = All_TASKS;
  let VIEW_All_ACTIONS = All_ACTIONS;
  const activeEvents = useMemo(() => {
    switch (activeTab) {
      case 0: // All
        return;
      case 1: // Tasks
        VIEW_All_ACTIONS = [];
        return;
      case 2: // Actions
        VIEW_All_TASKS = [];
        return;
      default:
        return [];
    }
  }, [activeTab, VIEW_All_TASKS, VIEW_All_ACTIONS]);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",

        display: "flex",
        flexDirection: "column",
      }}>
      <div className="items-list-container">
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="All" />
          <Tab label="Tasks" />
          <Tab label="Actions" />
        </Tabs>
      </div>
      <Box
        className="search-and-add-container"
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
        <>
          <Button
            sx={{ width: "10%", marginRight: "10px", minWidth: "110px" }}
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}>
            Add New Task
          </Button>
          <AddToDo open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={HandleNavigate}
          sx={{ width: "10%", marginRight: "10px", minWidth: "110px" }}>
          Add New Task
        </Button> */}
      </Box>
      {data && !isPending && !isError && (
        <Box
          sx={{
            // flex: 1, // Take up remaining space
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
          {/* {</Typography>activeEvents.map((todo) => {
            console.log("todotodotodo");
            console.log(todo.type);
            return (
              <>
                <h1>{todo.type}</h1>
                <ToDoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={(taskId) => {
                    // Optimistically update local state
                    All_TASKS = All_TASKS.filter((task) => task.id !== taskId);
                  }}
                />
              </>
            );
          })} */}
          {All_TASKS.length > 0 ? (
            VIEW_All_TASKS.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onDelete={(taskId) => {
                  // Optimistically update local state
                  VIEW_All_TASKS = VIEW_All_TASKS.filter(
                    (task) => task.id !== taskId
                  );
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
            VIEW_All_ACTIONS.map((todo) => (
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
            // flex: 1,
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
            // flex: 1,
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
ItemsList.propTypes = {
  optionValue: PropTypes.number,
};

export default ItemsList;
