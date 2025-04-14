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
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import AjwadWhite from "../../assets/logoWihte.png"
import AjwadBlack from "../../assets/logoBlack.png"


const Topbar = () => {
  const location = useLocation();
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
    "/": { title: "Dashboard", subtitle: "Manage global settings and changes" },
    "/home": { title: "Home", subtitle: "Welcome to the homepage" },
    "/about": { title: "About Us", subtitle: "Learn more about our company" },
    "/todolist": { title: "To-Do List", subtitle: "View and manage your tasks" },
    "/contact": { title: "Contact Us", subtitle: "Get in touch with our team" },
    "/projects": { title: "Projects", subtitle: "Explore our real estate projects" },
    "/calendar": { title: "Calendar", subtitle: "Interactive calendar view" },
    "/faq": { title: "FAQs", subtitle: "Frequently asked questions" },
    "/team": { title: "Team", subtitle: "Manage your team members" },
    "/contacts": { title: "Contacts", subtitle: "View all saved contacts" },
    "/clients": { title: "Clients", subtitle: "List of client contacts" },
    "/done_deal": { title: "Closed Deals", subtitle: "Clients who completed a deal" },
    "/CreateAccForm": { title: "Create Account", subtitle: "Add a new user" },
    "/archieved": { title: "Archived", subtitle: "Archived clients list" },
    "/lost": { title: "Lost Clients", subtitle: "Clients who didn’t close deals" },
    "/NewKanbanBoard": {
      title: "Task Board",
      subtitle: "Manage tasks visually with Kanban",
    },
    "/NewNewKanbanBoard": {
      title: "Task Board",
      subtitle: "Enhanced Kanban management",
    },
    "/getContacts": {
      title: "Add Contacts",
      subtitle: "Enter new client contact details",
    },
    "/assignContacts": {
      title: "Assign Contacts",
      subtitle: "Assign new contacts to team members",
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

  const navigate = useNavigate();

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
        height: "110px",
        left: 0,
        right: 0,
        boxShadow: 3,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
        borderBottom: "0.1px solid",
        borderColor: colors.NewNav[1000],
      }}
    >
      <img src={AjwadBlack} alt="Ajwad Black Logo" 
      style={{ width: "280px" }} 
      />

      <Box sx={{ mt: 2 }}>
        <Header title={title} subtitle={subtitle} />
      </Box>

      <FormControl variant="outlined" sx={{ width: "30%" }}>
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

      <Box display="flex" alignItems="center" sx={{ color: "#FCFCFC" }}>
        <IconButton onClick={handleToggle} sx={{ color: "#FCFCFC" }}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton sx={{ color: "#FCFCFC" }}>
          <Box
            sx={{
              backgroundColor: "red",
              height: "17px",
              width: "17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              position: "absolute",
              top: "2px",
              right: "2px",
              fontSize: "0.8rem",
            }}
          >
            1
          </Box>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "#FCFCFC" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "#FCFCFC" }}>
          <PersonOutlinedIcon
            onClick={() => {
              navigate("/profile");
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
