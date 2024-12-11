import React from "react";
import PropTypes from "prop-types";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import TheSideBar from "./TheSideBar"; // Your custom Sidebar component
import Topbar from "./Topbar";   // Your custom Topbar component

const drawerWidth = 240; // Sidebar width

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Reset default CSS styles */}
      <CssBaseline />

      {/* Topbar */}
      <Topbar drawerWidth={drawerWidth} />

      {/* Sidebar */}
      <TheSideBar drawerWidth={drawerWidth} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px", // Leave space for the fixed Topbar (AppBar height is typically 64px)
          marginLeft: `${drawerWidth}px`, // Leave space for the fixed Sidebar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
