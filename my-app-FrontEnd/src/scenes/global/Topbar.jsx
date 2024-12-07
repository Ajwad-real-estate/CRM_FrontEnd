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
  // title of page
  // const location = useLocation();

  // const getPageTitle = (pathname) => {
  //   switch (pathname) {
  //     case "/home":
  //       return "Home";
  //     case "/about":
  //       return "About Us";
  //     case "/contact":
  //       return "Contact Us";
  //     case "/NewKanbanBoard":
  //       return "NewKanbanBoard Us";
  //     default:
  //       return "Page Not Found";
  //   }
  // };
  // title and subtitle

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
    <Box display="flex" justifyContent="space-between" p={1} sx={{ background: 'black', width: '100%', zIndex: 1000 }}>
      <Box sx={{mt:2, ml:3}}>

      <Header title={title}  />
      </Box>
      {/* Search Bar */}
      <Box >
        <InputBase sx={{ mt: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* icons */}
      <Box display="flex">
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

  )
}

export default Topbar
