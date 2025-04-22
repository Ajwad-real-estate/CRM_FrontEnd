// src/components/PipelineColumn.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const PipelineColumn = ({ title, children }) => (
    <Box sx={{ width: 250, padding: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="h6" align="center" gutterBottom>
            {title}
        </Typography>
        {children}
    </Box>
);

export default PipelineColumn;
