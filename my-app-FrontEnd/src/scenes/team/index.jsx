import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { getSalesAgent } from "./apiStuff";
import { tokens } from "../../theme";

const Team = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [agents, setAgents] = useState([]); // Initialize as an empty array
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data in useEffect
  useEffect(() => {
    async function fetchAgents() {
      try {
        const data = await getSalesAgent(); // Wait for data
        setAgents(data.agents || []); // Safely access `agents` array
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    }

    fetchAgents();
  }, []);

  // Define columns for DataGrid (excluding `id`)
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography
          color={
            value === "online" ? colors.greenAccent[400] : colors.grey[500]
          }
        >
          {value || "N/A"}
        </Typography>
      ),
    },
    {
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="75%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && (
              <AdminPanelSettingsOutlinedIcon fontSize="small" />
            )}
            {access === "manager" && <SecurityOutlinedIcon fontSize="small" />}
            {access === "user" && <LockOpenOutlinedIcon fontSize="small" />}
            {isNonMobile && (
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {access}
              </Typography>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: isNonMobile ? "14px" : "8px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={agents}
          columns={columns}
          pageSize={isNonMobile ? 10 : 5}
          getRowId={(row) => row.id} // Use `id` internally for unique row identification
        />
      </Box>
    </Box>
  );
};

export default Team;
