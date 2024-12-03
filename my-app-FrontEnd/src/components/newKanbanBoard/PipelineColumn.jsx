import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook

const PipelineColumn = ({ title, children, onAdd }) => {
    const theme = useTheme();  // Access the theme using useTheme hook

    return (
        <Box backgroundColor="primary"
            sx={{ width: 250, padding: 1, borderRadius: 1 }}>

            <Typography variant="h6" align="center" gutterBottom
            sx={{mb:3, mt:2}}>
                {title}
            </Typography>
            {children}

            {/* Using the primary color from the theme */}
            <Button sx={{ backgroundColor: theme.palette.primary[600] }}>
                Click Me
            </Button>

            {/* If you want to use colors (after defining them in tokens), you can access them this way */}
            {/* Example assuming you have colors object from tokens */}
            {/* <Button sx={{ backgroundColor: colors.primary[600] }}>Click Me</Button> */}
        </Box>
    );
};

export default PipelineColumn;
