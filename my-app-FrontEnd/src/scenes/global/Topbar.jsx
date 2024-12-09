import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../../themeSlice';
import { themeSettings, tokens } from '../../theme';
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";

const Topbar = () => {
  const colorMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const theme = createTheme(themeSettings(colorMode));
  const handleToggle = () => {
    dispatch(toggleMode());
  };
  const colors = tokens(theme.palette.mode);

  // Object to map page paths to titles and subtitles
  const pageInfo = {
    "/home": { title: "Home", subtitle: "Welcome to the Home Page" },
    "/about": { title: "About Us", subtitle: "Learn more about us" },
    "/contact": { title: "Contact Us", subtitle: "Get in touch with us" },
    "/NewKanbanBoard": {
      title: "Contacts Board", subtitle: "Manage your tasks effectively"
    },
  };

  // Function to get page info
  const getPageInfo = (pathname) => {
    return pageInfo[pathname] || { title: "Page Not Found", subtitle: "Subtitle Not Found" };
  };

  const { title, subtitle } = getPageInfo(location.pathname);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={1}
      sx={{
        background: colors.primary[400],
        width: '80%',
        zIndex: 1000,
        // position: 'fixed',  // Fixed positioning to stay on top
        top: 0,            // Stay at the top
        left: 0,           // Ensure it spans across the full width
        right: 0,          // Ensure it spans across the full width
        boxShadow: 3,      // Add shadow for a subtle 3D effect
        paddingLeft: 3,    // Align left padding
        paddingRight: 3,   // Align right padding
        paddingTop: 2,     // Ensure the icons inside the topbar have proper spacing
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Header title={title} />
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <InputBase sx={{ flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleToggle}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
