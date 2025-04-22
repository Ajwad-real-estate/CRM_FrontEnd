import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, } from 'react-pro-sidebar';
import userImage from '../../assets/user.png';
// import '../../scss/styles.scss';
import './Topbar.css'
// import 'react-pro-sidebar/dist/css/styles.css';
// @import '~react-pro-sidebar/dist/scss/styles.scss';

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import KanbanBoard from "../../components/KanbanBoard";
import NewKanbanBoard from "../../components/newKanbanBoard/NewKanbanBoard";


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
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  )
}

const TheSideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null); // Track active submenu

  const navigate = useNavigate();

  const handleSubMenuClick = (submenuKey, to) => {
    if (activeSubMenu === submenuKey) {
      setActiveSubMenu(null); // Collapse if already active
    } else {
      setActiveSubMenu(submenuKey); // Open the clicked submenu
    }
    navigate(to); // Navigate to the page
  };

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
      }}
    >









      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
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
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ahmed Elsisy
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Role : Sales Manager
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            {/* <Typography
       variant="h6"
       color={colors.grey[300]}
       sx={{ m: "15px 0 5px 20px" }}
      >
       Pages To finace Deparment
      </Typography>
      <Item
       title="commission"
       to="/commission"
       icon={<ReceiptOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages To Sales Agent
            </Typography>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            ></Item>
            <Item
              title="NewKanbanBoard"
              to="/NewNewKanbanBoard"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* SubMenu 1 */}
            <SubMenu
              label="Other"
              icon={<PeopleOutlinedIcon />}
              // style={{ color: "#fff" }}
              open={activeSubMenu === "other"} // Open conditionally
              onClick={() => handleSubMenuClick("other", "/other")} // Toggle active and navigate
            >
              <MenuItem
                title="Done Deal"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/done_deal")}
              >
                Done Deal
              </MenuItem>
              <MenuItem
                title="archieved"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/archieved")}
              >
                archieved
              </MenuItem>
              <MenuItem
                title="Lost"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/lost")}
              >
                Lost
              </MenuItem>
            </SubMenu>

            {/* SubMenu 2 (Example for another submenu) */}
            <SubMenu
              label="Another Menu"
              icon={<PeopleOutlinedIcon />}
              // style={{ color: "#fff" }}
              open={activeSubMenu === "another"} // Open conditionally
              onClick={() => handleSubMenuClick("another", "/another")} // Toggle active and navigate
            >
              <MenuItem
                title="Option 1"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/option1")}
              >
                Option 1
              </MenuItem>
              <MenuItem
                title="Option 2"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/option2")}
              >
                Option 2
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Kanban Board"
              icon={<PeopleOutlinedIcon />}
              // style={{ color: "#fff" }}
              onClick={() => handleSubMenuClick("/NewNewKanbanBoard")} // Navigate when SubMenu is clicked
            >
              <MenuItem
                title="Done Deal"
                to="/done_deal"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/done_deal")} // Navigate to specific page
              >
                Done Deal
              </MenuItem>
              <MenuItem
                title="archieved"
                to="/archieved"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/archieved")} // Navigate to specific page
              >
                archieved
              </MenuItem>
              <MenuItem
                title="Lost"
                to="/lost"
                icon={<ContactsOutlinedIcon />}
                onClick={() => navigate("/lost")} // Navigate to specific page
              >
                Lost
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Other"

              icon={<PeopleOutlinedIcon />}
              style={{ color: colors.grey[100] }}
            >
              <Item
                title="Done Deal"
                to="/done_deal"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="archieved"
                to="/archieved"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="lost"
                to="/lost"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Inventory"
              to="/projects"
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
            <Item
              title="Contact"
              to="/contact"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />













            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages To sales Manager
            </Typography>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            ></Item>
            <Item
              title="Contact"
              to="/contact"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
       title="NewKanbanBoard"
       to="/NewKanbanBoard"
       icon={<ContactsOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      /> */}
            <Item
              title="Inventory"
              to="/projects"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
       title="commission"
       to="/commission"
       icon={<ReceiptOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      /> */}
            <Item
              title="To-Do List"
              to="/todolist"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
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
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />























            {/* <Typography
       variant="h6"
       color={colors.grey[300]}
       sx={{ m: "15px 0 5px 20px" }}
      >
       Data
      </Typography>
     
      <Item
       title="Contacts Information"
       to="/contacts"
       icon={<ContactsOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />
      <Item
       title="Invoices Balances"
       to="/invoices"
       icon={<ReceiptOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />

      <Typography
       variant="h6"
       color={colors.grey[300]}
       sx={{ m: "15px 0 5px 20px" }}
      >
       Pages
      </Typography>
      <Item
       title="Profile Form"
       to="/form"
       icon={<PersonOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />
      <Item
       title="Calendar"
       to="/calendar"
       icon={<CalendarTodayOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />
      <Item
       title="FAQ Page"
       to="/faq"
       icon={<HelpOutlineOutlinedIcon />}
       selected={selected}
       setSelected={setSelected}
      />

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




    </Box >
  );
};

export default TheSideBar;
