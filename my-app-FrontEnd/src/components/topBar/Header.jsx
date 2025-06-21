import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      mb="30px"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0", color: "#FCFCFC" }}>
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
