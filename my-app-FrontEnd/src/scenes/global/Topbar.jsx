import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../../themeSlice";
import { themeSettings, tokens } from "../../theme";
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

  function editTitlePageInfo(path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    const firstPart = `/${normalizedPath.split("/")[1]}`;

    return firstPart;
  }
  const pageInfo = {
    "/": { title: "Dashboard", subtitle: "Handle Global Changes" },
    "/home": { title: "Home", subtitle: "Welcome to the Home Page" },
    "/about": { title: "About Us", subtitle: "Learn more about us" },
    "/todolist": { title: "Todolist", subtitle: "View and Handle Tasks" },
    "/contact": { title: "Contact Us", subtitle: "Get in touch with us" },
    "/projects": { title: "Projects", subtitle: "Real estate Projects" },
    "/calendar": { title: "Calendar", subtitle: "See Tasks Schedule" },
    "/faq": { title: "FAQs", subtitle: "Know about us" },
    "/team": { title: "Team", subtitle: "Organize Your Team" },
    "/contacts": { title: "Contacts", subtitle: "Interested to Contact" },
    "/done_deal": { title: "Done deal", subtitle: "Clients done the Deal" },
    "/CreateAccForm": { title: "Create account", subtitle: "add New user" },

    "/archieved": { title: "Archieved", subtitle: "Archieved Clients" },
    "/lost": { title: "Lost", subtitle: "Losted Clients" },

    "/NewKanbanBoard": {
      title: "Contacts Board",
      subtitle: "Manage your tasks effectively",
    },
    "/NewNewKanbanBoard": {
      title: "Contacts Board",
      subtitle: "Manage your tasks effectively",
    },
  };

  // Function to get page info
  const getPageInfo = (pathname) => {
    return (
      pageInfo[pathname] || {
        title: "Page Not Found",
        subtitle: "Subtitle Not Found",
      }
    );
  };

  const { title, subtitle } = getPageInfo(editTitlePageInfo(location.pathname));

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      sx={{
        background: colors.NewNav[900],
        width: "100%",
        zIndex: 1000,
        // position: 'fixed',  // Fixed positioning to stay on top
        height: "110px", // Stay at the top
        left: 0, // Ensure it spans across the full width
        right: 0, // Ensure it spans across the full width
        boxShadow: 3, // Add shadow for a subtle 3D effect
        paddingLeft: 3, // Align left padding
        paddingRight: 3, // Align right padding
        paddingTop: 2, // Ensure the icons inside the topbar have proper spacing
      }}
    >
      <img src="/CRM.png" alt="Logo" style={{ width: "140px" }} />
      <Box sx={{ mt: 2 }}>
        <Header title={title} subtitle={subtitle} />
      </Box>

      {/* Search Bar */}
      <FormControl variant="outlined">
        <OutlinedInput
          sx={{ height: "50px", borderRadius: "25px", fontSize: "1.25rem" }}
          placeholder="Search"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Icons */}
      <Box display="flex" alignItems="center" sx={{ color: "#FCFCFC" }}>
        <IconButton onClick={handleToggle} sx={{ color: "#FCFCFC" }}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton sx={{ color: "#FCFCFC" }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "#FCFCFC" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "#FCFCFC" }}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
