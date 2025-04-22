import React, { useState } from "react";
import { Tabs, Tab, Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";

const Classification = ({ activeTab, setActiveTab, handleTabChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%", gridArea: "clas" }}>
      {/* Grid Container for Tabs */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "2px",
          justifyItems: "center",
          width: "100%",
        }}
      >
        {/* Custom Tabs Rendering */}
        {["New", "Qualified", "Reserved", "Done Deal", "Archived", "Lost"].map(
          (label, index) => (
            <Tab
              key={label}
              label={label}
              onClick={() => handleTabChange(null, index)}
              sx={{
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                border: "1px solid",
                padding: "8px 16px",
                minWidth: "120px",
                textAlign: "center",
                justifyContent: "center",
                transition: "all 0.3s ease-in-out",
                borderColor:
                  activeTab === index
                    ? colors.primary[900]
                    : colors.blueAccent[300],
                backgroundColor:
                  activeTab === index ? colors.primary[900] : "transparent",
                cursor: "pointer",
              }}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default Classification;
