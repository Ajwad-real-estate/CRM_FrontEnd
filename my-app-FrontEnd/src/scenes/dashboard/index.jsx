import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
// const userName = Cookies.get("userName");

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const isSmallMobile = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:600px) and (max-width:1000px)"
  );

  // Define state for the dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard data when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(apiUrl + "/api/dashboard", {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (dashboardData === null) {
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
      </Box>
    );
  }

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

  const target = dashboardData.target || 0;
  const doneDeals = dashboardData.doneClientsCount || 0;

  // Determine grid column spans based on screen size
  const getStatBoxGridSpan = () => {
    if (isNonMobile) return 3; // 4 boxes per row on large screens
    if (isMediumScreen) return 4; // 3 boxes per row on medium screens
    return 6; // 2 boxes per row on small screens
  };

  return (
    <Box m={isSmallMobile ? "10px" : "20px"}>
      {/* HEADER */}
      <Box
        display="flex"
        flexDirection={isSmallMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSmallMobile ? "flex-start" : "center"}
        gap={isSmallMobile ? "10px" : 0}>
        <Typography variant={isSmallMobile ? "h5" : "h4"}>
          Hi {Cookies.get("username") || "unknown"}, Welcome Back
        </Typography>
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
        gridTemplateColumns={`repeat(${isNonMobile ? 12 : isMediumScreen ? 8 : 4}, 1fr)`}
        gridAutoRows="140px"
        gap="20px"
        mt="20px">
        {/* Render StatBox dynamically */}
        {statBoxes.map((box, index) => (
          <Box
            key={index}
            onClick={() => navigate(box.link)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease",
              // margin: "30px",
              "&:hover": {
                transform: "scale(1.02)",
                // boxShadow: `0 4px 2px 0 ${colors.primary[500]}`,
              },
            }}
            gridColumn={`span ${getStatBoxGridSpan()}`}
            gridRow="span 1"
            backgroundColor={colors.primary[400]}>
            <StatBox
              title={box.title}
              subtitle={box.value}
              progress="0.75"
              increase="+14%"
              icon={box.icon}
            />
          </Box>
        ))}

        {/* Charts Section */}
        {isNonMobile ? (
          // Desktop layout
          <>
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              sx={{
                minHeight: "300px",
                overflow: "hidden",
              }}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}>
                    Sales #not work today
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}>
                    Done deal: {dashboardData.target} sales
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
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              sx={{
                minHeight: "300px",
              }}>
              <BarChart
                target={target}
                doneDeals={doneDeals}
                isDashboard={true}
              />
            </Box>
          </>
        ) : (
          // Mobile/tablet layout - stack charts vertically
          <>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              sx={{
                minHeight: "300px",
              }}>
              <Box
                mt="25px"
                p="0 20px"
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}>
                    Sales Overview
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}>
                    Target: {dashboardData.target}
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
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              sx={{
                minHeight: "300px",
              }}>
              <BarChart
                target={target}
                doneDeals={doneDeals}
                isDashboard={true}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
