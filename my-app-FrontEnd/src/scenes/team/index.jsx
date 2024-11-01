import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define columns conditionally based on screen size
  const columns = [
    { field: "id", headerName: "ID", flex: isNonMobile ? 0.5 : 1 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column-cell" },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: isNonMobile ? 0.5 : 1,
      hide: !isNonMobile,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      hide: !isNonMobile,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      hide: !isNonMobile,
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
            {access === "admin" && <AdminPanelSettingsOutlinedIcon fontSize="small" />}
            {access === "manager" && <SecurityOutlinedIcon fontSize="small" />}
            {access === "user" && <LockOpenOutlinedIcon fontSize="small" />}
            {isNonMobile ? (
              <>
                <Typography
                  color={colors.grey[100]}
                  sx={{
                    ml: "5px",
                  }}
                >
                  {access}
                </Typography>
              </>
            ) : null}
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
            fontSize: isNonMobile ? '14px' : '8px',
          },
          "& .MuiBox-root": {
            mt: "10px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
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
          ".MuiDataGrid-container--top [role=row]": {
            backgroundColor: colors.blueAccent[700] + "!important",
            borderBottom: "none",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={mockDataTeam}
          columns={columns}
          pageSize={isNonMobile ? 10 : 5} // Adjust page size for better mobile experience
        />
      </Box>
    </Box>
  );
};

export default Team;
