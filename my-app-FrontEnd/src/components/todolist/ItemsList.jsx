import { Box, Button, TextField, Typography } from "@mui/material";
import ToDoItem from "./ToDoItem";
import { useListInfo } from "./Contexts/TempContext";
import { useState } from "react";
function ItemsList() {
  const { todos, handleComplete, HandleNavigate } = useListInfo();
  const [searchQuery, setSearchQuery] = useState();
  const handleStopPropagation = (event) => {
    event.stopPropagation(); // Stops the click from expanding the accordion
  };

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
          todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onComplete={handleComplete}
              handleStopPropagation={handleStopPropagation}
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
