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

  // Define states
  const [dashboardData, setDashboardData] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
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
    }, 10000); // 10 seconds timeout

    fetchDashboardData();

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  // If timeout occurs, show error message
  if (errorTimeout) {
    return (
      <Box textAlign="center" mt="50px">
        <Typography variant="h4" color={colors.error.main}>
          Restart Page and Contact IT Department
        </Typography>
      </Box>
    );
  }

  // Loading state
  if (!dashboardData) {
    return (
      <Box textAlign="center" mt="50px">
        <Typography variant="h4" color={colors.primary[100]}>
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  // Fallback for empty data
  if (Object.keys(dashboardData).length === 0) {
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

  // Rest of your component code...

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>Hi {Cookies.get('name') || 'unknown'}, Welcome Back</Box>
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
        {[
          { title: "Done Clients", value: dashboardData.doneClientsCount || 0, icon: <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
          { title: "Follow Ups", value: dashboardData.followUpCount || 0, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
          { title: "Meetings", value: dashboardData.meetingCount || 0, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
          { title: "Calls", value: dashboardData.callCount || 0, icon: <TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
        ].map((box, index) => (
          <StatBox
            key={index}
            title={box.title}
            subtitle={box.value}
            progress="0.75"
            increase="+14%"
            icon={box.icon}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
