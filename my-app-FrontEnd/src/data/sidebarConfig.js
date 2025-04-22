// src/config/sidebarConfig.js
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export const sidebarItems = [
  {
    type: "item",
    title: "Dashboard",
    to: "/",
    icon: "HomeOutlinedIcon",
  },
  {
    type: "submenu",
    label: "Kanban Board",
    icon: "PeopleOutlinedIcon",
    key: "NewNewKanbanBoard",
    to: "NewNewKanbanBoard",
    items: [
      {
        title: "Done Deal",
        to: "NewNewKanbanBoard/done_deal",
        icon: "ContactsOutlinedIcon",
      },
      {
        title: "archieved",
        to: "NewNewKanbanBoard/archieved",
        icon: "ContactsOutlinedIcon",
      },
      {
        title: "Lost",
        to: "NewNewKanbanBoard/lost",
        icon: "ContactsOutlinedIcon",
      },
    ],
  },
  {
    type: "item",
    title: "Inventory",
    icon: "MapOutlinedIcon",
  },
  {
    type: "item",
    title: "To-Do List",
    to: "/todolist",
    icon: "ReceiptOutlinedIcon",
  },
  {
    type: "item",
    title: "Calendar",
    to: "/calendar",
    icon: "CalendarTodayOutlinedIcon",
  },
  {
    type: "item",
    title: "Contacts Information",
    to: "/clients",
    icon: "ContactsOutlinedIcon",
  },
  {
    type: "submenu",
    label: "Manage Team",
    icon: "PeopleOutlinedIcon",
    key: "team",
    to: "team",
    items: [
      {
        title: "New Sales Account",
        to: "/CreateAccForm",
        icon: "PersonOutlinedIcon",
      },
      {
        title: "Input New Clients",
        to: "/getContacts",
        icon: "PeopleOutlinedIcon",
      },
      {
        title: "assign Clients",
        to: "/assignContacts",
        icon: "PeopleOutlinedIcon",
      },
    ],
  },
  {
    type: "item",
    title: "FAQ Page",
    to: "/faq",
    icon: "HelpOutlineOutlinedIcon",
  },
];
