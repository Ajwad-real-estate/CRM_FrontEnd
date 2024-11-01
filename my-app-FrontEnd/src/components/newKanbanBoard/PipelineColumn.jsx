import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PipelineColumn = ({ title, children, onAdd }) => (
    <Box sx={{ width: 250, padding: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Button variant="contained" color="primary" onClick={onAdd} sx={{ mb: 2 }}>
            Add Lead
        </Button>
        <Typography variant="h6" align="center" gutterBottom>
            {title}
        </Typography>
        {children}
    </Box>
);

export default PipelineColumn;
