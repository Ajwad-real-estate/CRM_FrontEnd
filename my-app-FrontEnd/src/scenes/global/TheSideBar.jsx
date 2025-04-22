import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./Topbar.css";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Cookies from "js-cookie";
import useLogout from "../../components/Logout";
import { isDesktop } from "../../hooks/useDeviceDetect";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Link to={to} className="no-underline">
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}>
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const TheSideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Track active submenu
  const logout = useLogout();
  useEffect(() => {
    if (!isDesktop) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, []);

  const navigate = useNavigate();

  const handleSubMenuClick = (submenuKey, to) => {
    if (activeSubMenu === submenuKey) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(submenuKey);
    }
    navigate(to);
  };
  const accName = Cookies.get("username");
  const accRole = Cookies.get("role");

  return (
    <Box
      sx={{
        background: `${colors.primary[400]} !important`,
        "& .ps-sidebar-root": {
          border: `0px !important`,
          height: `100% !important`,
          // width: `270px`,
        },
        "& .MuiBox-root": {
          background: `${colors.primary[400]} !important`,
          margin: `${colors.primary[400]} !important`,
        },
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
          overflow: `hidden auto !important`,
          position: `relative !important`,
        },
        "& .ps-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button": {
          padding: "5px 30px 5px 15px !important",
          "&:hover": {
            // color: colors.grey[100] + " !important",
            backgroundColor: colors.primary[400] + " !important",
          },
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button.active": {
          color: "#6870fa !important",
        },
      }}>
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  CRM
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}>
                  {accName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {accRole}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Pages To Sales Agent
            </Typography>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}></Item>
            <SubMenu
              label="Kanban Board"
              icon={<PeopleOutlinedIcon />}
              open={activeSubMenu === "NewNewKanbanBoard"} // Open conditionally
              onClick={() =>
                handleSubMenuClick("NewNewKanbanBoard", "/NewNewKanbanBoard")
              }>
              <MenuItem
                title="Done Deal"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("NewNewKanbanBoard/done_deal")}>
                Done Deal
              </MenuItem>
              <MenuItem
                title="archieved"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("NewNewKanbanBoard/archieved")}>
                archieved
              </MenuItem>
              <MenuItem
                title="Lost"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("NewNewKanbanBoard/lost")}>
                Lost
              </MenuItem>
            </SubMenu>
            <Item
              title="Inventory"
              // to="/projects"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="To-Do List
"
              to="/todolist"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Nested SubMenu for Sales Agent Pages */}

            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Contact"
              to="/contact"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Contacts Information"
              to="/clients"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
              label="Manage Team"
              icon={<PeopleOutlinedIcon />}
              // style={{ color: "#fff" }}
              open={activeSubMenu === "team"} // Open conditionally
              onClick={() => handleSubMenuClick("team", "/team")} // Toggle active and navigate
            >
              <Item
                title="New Sales Account"
                to="/CreateAccForm"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Input New Clients"
                to="/getContacts"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="assign Clients"
                to="/assignContacts"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            {/* <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Box sx={{ display: "flex" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={logout}
                sx={{
                  fontWeight: "bold",
                  width: "80%",
                  m: "auto",
                  ml: "3%",
                  mt: "8%",
                  color: "#ff4c4c",
                  borderColor: "#ff4c4c",
                  "&:hover": { backgroundColor: "#ff4c4c", color: "#fff" },
                }}>
                Logout
              </Button>
            </Box>

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              finance
            </Typography>

            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Request Commission"
              to="/requestCommission"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/*
      <Typography
       variant="h6"
       color={colors.grey[300]}
       sx={{ m: "15px 0 5px 20px" }}
      >
       Pages
      </Typography>
      <Typography
       variant="h6"
       color={colors.grey[300]}
       sx={{ m: "15px 0 5px 20px" }}
      >
       Charts
      </Typography>
      <Item
       title="Bar Chart"
       to="/bar"
       icon={<BarChartOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />
      <Item
       title="Pie Chart"
       to="/pie"
       icon={<PieChartOutlineOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />
      <Item
       title="Line Chart"
       to="/line"
       icon={<TimelineOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />
      <Item
       title="Geography Chart"
       to="/geography"
       icon={<MapOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default TheSideBar;
