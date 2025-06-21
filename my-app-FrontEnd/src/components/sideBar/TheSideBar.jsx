import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Cookies from "js-cookie";
import useLogout from "./Logout";
import { isDesktop } from "../../hooks/useDeviceDetect";
import { sidebarItems } from "../../data/sidebarConfig";
import { iconComponents } from "../../utils/icons";
import "./style.css";
import { minutesInHour } from "date-fns/constants";

const MemoizedItem = React.memo(
  ({ title, to, icon, selected, colors, setSelected }) => {
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
  }
);

const UserProfileSection = React.memo(({ isCollapsed, colors, name, role }) => {
  if (isCollapsed) return <div style={{ minHeight: "50px" }}></div>;

  return (
    <Box
      mt="-25px"
      textAlign="center"
      sx={{
        overflow: "hidden",
        transition: "all 0.5s ease",
        maxHeight: "200px",
        opacity: 1,
        marginBottom: "25px",
      }}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "10px 0 0 0" }}>
        {name}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[500]}>
        {role}
      </Typography>
    </Box>
  );
});

const TheSideBar = () => {
  const theme = useTheme();
  const colors = useMemo(
    () => tokens(theme.palette.mode),
    [theme.palette.mode]
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [userData, setUserData] = useState(() => ({
    name: Cookies.get("username"),
    role: Cookies.get("role"),
  }));

  const logout = useLogout();

  useEffect(() => {
    setIsCollapsed(!isDesktop);
  }, [isDesktop]);

  const navigate = useNavigate();

  const handleSubMenuClick = useCallback(
    (subMenuId, to) => {
      setActiveSubMenu((prev) => (prev === subMenuId ? null : subMenuId));
      // console.log("Submenu clicked:", subMenuId);
      setActiveSubMenu(true);
      if (activeSubMenu === subMenuId) {
        setActiveSubMenu(null);
      } else {
        setActiveSubMenu(subMenuId);
      }
      console.log("to" + to);
      navigate(to);
    },
    [navigate, activeSubMenu]
  );
  return (
    // <Box
    //   sx={{
    //     background: `${colors.primary[400]} !important`,
    //     "& .ps-sidebar-root": {
    //       border: `0px !important`,
    //       height: `100% !important`,
    //       // width: `270px`,
    //     },
    //     "& .MuiBox-root": {
    //       background: `${colors.primary[400]} !important`,
    //       margin: `${colors.primary[400]} !important`,
    //     },
    //     "& .ps-sidebar-container": {
    //       background: `${colors.primary[400]} !important`,
    //       overflow: `hidden auto !important`,
    //       position: `relative !important`,
    //     },
    //     "& .ps-icon-wrapper": {
    //       backgroundColor: "transparent !important",
    //     },
    //     "& .ps-menu-button": {
    //       padding: "5px 30px 5px 15px !important",
    //       "&:hover": {
    //         backgroundColor: colors.primary[400] + " !important",
    //       },
    //     },
    //     "& .ps-menu-button:hover": {
    //       color: "#868dfb !important",
    //       background: `${colors.primary[400]} !important`,
    //     },
    //     "& .ps-menu-button.active": {
    //       color: "#6870fa !important",
    //     },
    //   }}>
    <Box
      sx={{
        "--primary-400": colors.primary[400],
        "--hover-color": "#868dfb",
        "--active-color": "#6870fa",
        // position: "relative",
        // width: isCollapsed ? "80px" : "270px", // Adjust widths as needed
        transition: "width 0.3s ease",
        // overflow: "hidden",
        // height: "100vh",
        // background: colors.primary[400],
      }}
      className="sidebar-container">
      <Sidebar
        collapsed={isCollapsed}
        style={{
          // position: "absolute",
          // width: "270px", // Should match your expanded width
          transition: "transform 0.3s ease",
          // transform: isCollapsed ? "translateX(-190px)" : "translateX(0)",
          // height: "100%",
        }}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              transition: "transform 0.3s ease",

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
          <UserProfileSection
            isCollapsed={isCollapsed}
            colors={colors}
            name={userData.name}
            role={userData.role}
          />
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {sidebarItems.map((item) => {
              if (item.type === "item") {
                return (
                  <MemoizedItem
                    key={item.title}
                    title={item.title}
                    to={item.to}
                    colors={colors}
                    icon={iconComponents[item.icon]}
                    selected={selected}
                    setSelected={setSelected}
                  />
                );
              } else if (item.type === "submenu") {
                return (
                  <SubMenu
                    key={item.key}
                    label={item.label}
                    icon={iconComponents[item.icon]} // And here
                    open={activeSubMenu === item.key}
                    onClick={() => handleSubMenuClick(item.key, item.to)}>
                    {item.items.map((subItem) => (
                      <MemoizedItem
                        key={subItem.title}
                        colors={colors}
                        title={subItem.title}
                        to={subItem.to}
                        icon={iconComponents[subItem.icon]} // And here
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                  </SubMenu>
                );
              }
              return null;
            })}
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
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default TheSideBar;
