import { Box, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../redux/theme";

function PageDesign({ children }) {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          fontSize: isNonMobile ? "14px" : "8px",
          backgroundColor: colors.primary[400],
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}>
        {children}
      </Box>
    </Box>
  );
}

export default PageDesign;
