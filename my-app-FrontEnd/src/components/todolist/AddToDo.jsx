import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const AddToDo = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" mb="20px">
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new task"
                variant="outlined"
                size="small"
                sx={{ width: "60%", marginRight: "10px" }}
            />
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Add Task
            </Button>
        </Box>
    );
};

export default AddToDo;
