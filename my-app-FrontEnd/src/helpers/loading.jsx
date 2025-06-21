import { Box } from "@mui/material";
import React from "react";
import ProgressCircle from "../components/dashboard Charts/ProgressCircle";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}>
      <ProgressCircle rotate />
    </Box>
  );
};

export default Loading;
