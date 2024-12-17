import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define state for the dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(false);

  // Fetch dashboard data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch the data from the API
        const response = await axios.get(apiUrl + "/api/dashboard", {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
          },
        });

        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };


    // Timeout logic
    const timeout = setTimeout(() => {
      setErrorTimeout(true);
    }, 60000); // 1 Minute timeout

    fetchDashboardData();

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);
  if (errorTimeout) {
    return (
      <Box textAlign="center" mt="50px">
        <Typography variant="h4"
        // color={colors.error.main}
        >
          Reload Page and Contact IT Department
        </Typography>
      </Box>
    );
  }

  // if (!dashboardData) {
  //   return <Typography>Loading...</Typography>; // Show loading state
  // }
  if (dashboardData === null) {
    // Show a friendly message while loading or in case of an error
    return (
      <Box textAlign="center" mt="50px">
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
        <Typography variant="h4" color={colors.primary[100]}>
          Loading data...
        </Typography>
        {/* <Typography variant="subtitle1" color={colors.grey[400]}>
          Please check your network connection or IT Department and try again later.
        </Typography> */}
      </Box>
    );
  }

  if (Object.keys(dashboardData).length === 0) {
    // Show a fallback message if no data is available
    return (
      <Box textAlign="center" mt="50px">
        <Typography variant="h4" color={colors.grey[300]}>
          No data available
        </Typography>
        <Typography variant="subtitle1" color={colors.grey[400]}>
          Please ensure data is being sent from the server.
        </Typography>
      </Box>
    );
  }

  // StatBox data to display
  const statBoxes = [
    { title: "Done Clients", value: dashboardData.doneClientsCount || 0, icon: <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Follow Ups", value: dashboardData.followUpCount || 0, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Meetings", value: dashboardData.meetingCount || 0, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Calls", value: dashboardData.callCount || 0, icon: <TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Emails", value: dashboardData.emailCount || 0, icon: <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "New Clients", value: dashboardData.newClientsCount || 0, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Qualified Clients", value: dashboardData.qualifiedClientsCount || 0, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Reserved Clients", value: dashboardData.reservedClientsCount || 0, icon: <TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
  ];

  // Set target and doneDeals data for the BarChart component
  const target = dashboardData.target || 0;  // Default to 0 if target is undefined
  const doneDeals = dashboardData.doneClientsCount || 0;  // Default to 0 if doneDeals is undefined

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>hi {Cookies.get('name') || 'unknown'}, Welcome Back</Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Render StatBox dynamically */}
        {statBoxes.map((box, index) => (
          <StatBox
            key={index}
            title={box.title}
            subtitle={box.value}
            progress="0.75" // Add logic to calculate progress if needed
            increase="+14%"  // Add logic for increase percentage if needed
            icon={box.icon}
          />
        ))}

        {/* Additional Rows */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${dashboardData.target} revenue generated
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            // gridRow="span 2"
            height="250px"
            m="-20px 0 0 0"
          >
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* BarChart with dynamic target and doneDeals */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
        // sx={{width:'2'}} width="75vh"
        >
          <BarChart target={target} doneDeals={doneDeals} isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
