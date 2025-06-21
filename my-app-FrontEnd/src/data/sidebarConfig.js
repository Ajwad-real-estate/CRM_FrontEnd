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
    key: "KanbanBoard",
    to: "KanbanBoard",
    items: [
      {
        title: "Done Deal",
        to: "KanbanBoard/done_deal",
        icon: "ContactsOutlinedIcon",
      },
      {
        title: "archieved",
        to: "KanbanBoard/archieved",
        icon: "ContactsOutlinedIcon",
      },
      {
        title: "Lost",
        to: "KanbanBoard/lost",
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
