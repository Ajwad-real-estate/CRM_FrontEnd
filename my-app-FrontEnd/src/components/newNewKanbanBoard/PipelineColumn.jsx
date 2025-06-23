import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import the useTheme hook
import { tokens } from "../../helpers/redux/theme";

const PipelineColumn = ({ title, children, onAdd }) => {
  const theme = useTheme(); // Access the theme using useTheme hook
  const colors = tokens(theme.palette.mode); // Get colors based on the current theme

  return (
    <Box
      backgroundColor="primary"
      sx={{
        width: "100%",
        padding: 1,
        borderRadius: 1,
        background: colors.columns[900],
        boxShadow: 6,
        border: "0.01px solid ",
        borderColor: colors.columns[100],
      }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ mb: 3, mt: 2, fontSize: "17px" }}>
          {title}
        </Typography>
      </Box>
      {children}

      {/* If you want to use colors (after defining them in tokens), you can access them this way */}
      {/* Example assuming you have colors object from tokens */}
      {/* <Button sx={{ backgroundColor: colors.primary[600] }}>Click Me</Button> */}
    </Box>
  );
};

export default PipelineColumn;
