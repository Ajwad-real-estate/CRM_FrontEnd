import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../../helpers/redux/theme";

function AddPhoneNumber({
  handleAdd,
  handleRemove,
  handleChange,
  newPhoneNumber,
  numbersList,
}) {
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);

  // Handle adding a new item

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "26px",
        height: "170px",
      }}>
      <List
        sx={{
          width: "50%",
          borderRadius: "10px",
          border: "1px solid",
          height: "100%",
          overflowY: "scroll",
        }}>
        {numbersList.map((item, index) => (
          <ListItem key={index} sx={{ borderBottom: "1px solid #eee" }}>
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleRemove(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box sx={{ width: "40%" }}>
        <TextField
          fullWidth
          label="New Phone Number"
          value={newPhoneNumber}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAdd}
          sx={{ mb: 2 }}>
          Add Phone Number
        </Button>
      </Box>
    </Box>
  );
}

export default AddPhoneNumber;
