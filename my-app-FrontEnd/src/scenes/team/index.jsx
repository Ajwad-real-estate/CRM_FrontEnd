import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { getSalesAgent } from "./apiStuff";
import { tokens } from "../../theme";
import ProgressCircle from "../../components/ProgressCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Team = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [agents, setAgents] = useState([]);
  const [status, setStatus] = useState("idle");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data in useEffect
  useEffect(() => {
    setStatus("loading");
    async function fetchAgents() {
      try {
        const data = await getSalesAgent();
        setAgents(data.agents || []);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching agents:", error);
        setStatus("error");
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
      {status === "loading" && (
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProgressCircle size="80" rotate />
        </Box>
      )}

      {status === "success" && agents && (
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
      )}
      {status === "error" && (
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 600, color: colors.redAccent[500] }}
          >
            Internet Connection is Required
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
