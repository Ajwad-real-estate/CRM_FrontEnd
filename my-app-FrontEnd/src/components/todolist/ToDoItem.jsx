import React from 'react';
import { Box, Typography, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";
import { useTheme } from '@emotion/react';

const ToDoItem = ({ todo, onComplete, onDelete }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p="10px"
            mb="10px"
            borderRadius="4px"
            sx={{
                backgroundColor: colors.grey[900],
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
            }}
        >
            <Checkbox
                checked={todo.completed}
                onChange={() => onComplete(todo.id)}
                sx={{
                    color: colors.greenAccent[500],
                    '&.Mui-checked': {
                        color: colors.greenAccent[600],
                    }
                }}
            />
            <Typography
                variant="body1"
                sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: colors.grey[100],
                    flexGrow: 1,
                    marginLeft: "10px"
                }}
            >
                {todo.title}
            </Typography>
            <IconButton onClick={() => onDelete(todo.id)} color="error">
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default ToDoItem;
