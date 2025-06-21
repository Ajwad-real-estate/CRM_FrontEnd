import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { tokens } from "../../theme";
import ProgressCircle from "../../components/dashboard Charts/ProgressCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useTeam } from "./useTeam";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isPending, data, error, isError } = useTeam();
  const navigate = useNavigate(); // Use navigate at the top level

  // Fetch data in useEffect
  console.log(isPending);
  console.log(data);
  console.log(isError);
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
          }>
          {value || "N/A"}
        </Typography>
      ),
    },
    {
      headerName: "Health",
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
            borderRadius="4px">
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
  const handleCellClick = (params) => {
    const salesColumns = ["name", "title", "status"]; // Define the columns for Sales ID page

    if (salesColumns.includes(params.field)) {
      const salesId = params.row.id; // Assuming `id` is the sales identifier
      navigate(`/sales/${salesId}`);
      // } else if (params.field === "health") {
    } else {
      const agentId = params.row.id; // Assuming `id` is the agent identifier
      navigate(`/agent-details/${agentId}`);
    }
  };

  return (
    <Box m="20px">
      {isPending && isError && (
        <Box textAlign="center" mt="50px">
          <Box
            sx={{
              height: "75vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <ProgressCircle size="80" rotate />
          </Box>
          <Typography variant="h4" color={colors.primary[100]}>
            Loading data...
          </Typography>
        </Box>
      )}

      {data && (
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
          }}>
          <DataGrid
            checkboxSelection
            rows={data.agents}
            columns={columns}
            pageSize={isNonMobile ? 10 : 5}
            getRowId={(row) => row.id} // Use `id` internally for unique row identification
            onCellClick={(params) => handleCellClick(params)}
          />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 600, color: colors.redAccent[500] }}>
            Error Occurd Call IT Department
          </Typography>
          <WarningAmberIcon
            sx={{
              marginLeft: "23px",
              fontSize: "3rem",
              fontWeight: 700,
              color: colors.redAccent[500],
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Team;
