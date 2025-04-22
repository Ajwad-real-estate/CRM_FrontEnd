import { Box, Button, TextField, Typography } from "@mui/material";
// import ToDoItem from "./ToDoItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import delet from "./delet.mp3";

function SignUp() {
  const navigate = useNavigate();

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
          // value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search Task"
          variant="outlined"
          size="small"
          sx={{ width: "60%", marginRight: "10px" }}
        />
      </Box>
    </div>
  );
}

export default SignUp;
