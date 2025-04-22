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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // Define state for the dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch the data from the API
        const response = await axios.get(apiUrl + "/api/dashboard", {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // Assuming token is stored in cookies
          },
        });
        console.log(response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
          }}>
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
    {
      title: "Follow Ups",
      value: dashboardData.followUpCount,
      icon: (
        <PointOfSaleIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      link: "/todolist",
    },
    {
      title: "Meetings",
      value: dashboardData.meetingCount,
      icon: (
        <PersonAddIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      link: "/todolist",
    },
    {
      title: "follow Meetings",
      value: dashboardData.followMeetCount,
      icon: (
        <TrafficIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      link: "/todolist",
    },
    {
      title: "Emails",
      value: dashboardData.emailCount,
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
      ),
      link: "/todolist",
    },
    {
      title: "New Clients",
      value: dashboardData.newClientsCount,
      icon: (
        <PointOfSaleIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      link: "/NewNewKanbanBoard/new",
    },
    {
      title: "Qualified Clients",
      value: dashboardData.qualifiedClientsCount,
      icon: (
        <PersonAddIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      link: "/NewNewKanbanBoard/qualified",
    },
    {
      title: "Reserved Clients",
      value: dashboardData.reservedClientsCount,
      icon: (
        <TrafficIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      ),
      link: "/NewNewKanbanBoard/reserved",
    },
    {
      title: "Done Clients",
      value: dashboardData.doneClientsCount,
      icon: (
        <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
      ),
      link: "/NewNewKanbanBoard/done_deal",
    },
  ];

  // Set target and doneDeals data for the BarChart component
  const target = dashboardData.target || 0; // Default to 0 if target is undefined
  const doneDeals = dashboardData.doneClientsCount || 0; // Default to 0 if doneDeals is undefined

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>hi {Cookies.get("name") || "unknown"}, Welcome Back</Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>
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
        gap="20px">
        {/* Render StatBox dynamically */}
        {statBoxes.map((box, index) => (
          <Box
            key={index}
            onClick={() => navigate(box.link)}
            sx={{
              cursor: "pointer",
              // "&:hover": {
              //   backgroundColor: colors.primary[500],
              // },
            }}
            // display="grid"
            // // gridTemplateColumns="repeat(12, 1fr)"
            // gridAutoRows="140px"
            // gap="20px"
            // gridColumn="span 2"
            // gridRow="span 1"
            // backgroundColor={colors.primary[400]}
            gridColumn="span 3" // Adjust the width of each box to span 3 columns
            gridRow="span 1" // Adjust the height of each box to span 1 row
            backgroundColor={colors.primary[400]} // Box background color
            display="grid" // Center content inside the box
            // justifyContent="center"
            // alignItems="center"
            gridAutoRows="140px">
            <StatBox
              // key={index}
              title={box.title}
              subtitle={box.value}
              progress="0.75" // Add logic to calculate progress if needed
              increase="+14%" // Add logic for increase percentage if needed
              icon={box.icon}
              // sx={{ padding: '10px' }}
            />
          </Box>
        ))}

        {/* Additional Rows */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center">
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}>
                sales #not work today
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}>
                done deal : {dashboardData.target} sales
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
            m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* BarChart with dynamic target and doneDeals */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}

          // sx={{width:'2'}} width="75vh"
        >
          <BarChart target={target} doneDeals={doneDeals} isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
