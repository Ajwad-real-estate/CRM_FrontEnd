import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../helpers/redux/theme";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
import LineChart from "../../components/dashboard Charts/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/dashboard Charts/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/dashboard Charts/ProgressCircle";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { isDesktop, isTablet, isMobile } from "../../hooks/useDeviceDetect";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
// const userName = Cookies.get("userName");
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
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
  // Responsive grid configuration
  const gridConfig = useMemo(() => {
    if (isDesktop)
      return {
        columns: 12,
        statBoxSpan: 3, // 4 items per row (12/3)
        chartLayout: "horizontal",
      };
    if (isTablet)
      return {
        columns: 8,
        statBoxSpan: 4, // 2 items per row (8/4)
        chartLayout: "vertical",
      };
    return {
      columns: 4,
      statBoxSpan: 4,
      chartLayout: "vertical",
    };
  }, [isDesktop, isTablet]);
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
  console.log("target", isDesktop);
  // Determine grid column spans based on screen size
  const getStatBoxGridSpan = () => {
    if (isDesktop) return 3; // 4 boxes per row on large screens
    if (isTablet) return 4; // 3 boxes per row on medium screens
    return 6; // 2 boxes per row on small screens
  };
  return (
    <Box m={!isDesktop ? "10px" : "20px"}>
      {/* HEADER */}
      <Box
        display={!isDesktop ? "none !important" : "flex"}
        flexDirection={!isDesktop ? "column" : "row"}
        justifyContent="flex-end"
        gap={!isDesktop ? "10px" : 0}>
        {isDesktop && (
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
        )}
      </Box>

      {/* STAT BOXES GRID */}
      <Box
        mt={"30px"}
        display="grid"
        gridTemplateColumns={`repeat(${gridConfig.columns}, 1fr)`}
        gridAutoRows="minmax(140px, auto)"
        gap="20px"
        mb="20px">
        {statBoxes.map((box, index) => (
          <Box
            key={index}
            onClick={() => navigate(box.link)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            gridColumn={`span ${gridConfig.statBoxSpan}`}
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
      </Box>

      {/* CHARTS SECTION */}
      <Box
        height="380px"
        display="grid"
        gridTemplateColumns={`repeat(${gridConfig.columns}, 1fr)`}
        gridAutoRows="minmax(300px, auto)"
        gap="20px">
        {/* LINE CHART */}
        <Box
          height="350px"
          gridColumn={`span ${gridConfig.chartLayout === "horizontal" ? 8 : gridConfig.columns}`}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Sales Overview
            </Typography>
            <IconButton>
              <DownloadOutlinedIcon sx={{ color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height="250px">
            {/* <LineChart isDashboard={true} /> */}
            <LineChart
              isDashboard={true}
              data={[
                {
                  id: "sales",
                  color: tokens("dark").greenAccent[500],
                  data: [
                    { x: "Jan", y: 100 },
                    { x: "Feb", y: 150 },
                    // ... more data points
                  ],
                },
              ]}
            />
          </Box>
        </Box>

        {/* BAR CHART */}
        <Box
          height="350px"
          gridColumn={`span ${gridConfig.chartLayout === "horizontal" ? 4 : gridConfig.columns}`}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p={3}>
          <Box mb={2}>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Target Progress
            </Typography>
          </Box>
          <Box height="250px">
            <BarChart
              target={dashboardData.target || 0}
              doneDeals={dashboardData.doneClientsCount || 0}
              isDashboard={true}
            />
          </Box>
        </Box>
      </Box>

      {/* Mobile download button */}
      {!isDesktop && (
        <Box mt={3}>
          <Button
            fullWidth
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
      )}
    </Box>
  );
};

export default Dashboard;
