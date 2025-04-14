import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/clients`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });

        const data = await response.json();
        console.log("Fetched clients:", data);
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        // Check if the response is empty
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/clients/${params.id}`);
  };

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone_numbers",
      headerName: "Phone Numbers",
      flex: 1,
      renderCell: (params) => {
        return params.value ? params.value.join(", ") : "-";
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "street",
      headerName: "Street",
      flex: 1,
    },
    {
      field: "budget",
      headerName: "Budget",
      flex: 1,
      type: "number",
      renderCell: (params) => {
        return params.value ? `$${params.value.toLocaleString()}` : "-";
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "channel",
      headerName: "Channel",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
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
            cursor: "pointer",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}>
        <DataGrid
          rows={clients}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          loading={loading}
          autoHeight
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default Clients;
