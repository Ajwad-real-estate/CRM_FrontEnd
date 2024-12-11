import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { setMode } from "./themeSlice";
import "./index.css";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { themeSettings } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/TheSideBar";
import Dashboard from "./scenes/dashboard/index";
import Team from "./scenes/team";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import KanbanBoard from "./components/KanbanBoard";
import NewKanbanBoard from "./components/newKanbanBoard/NewKanbanBoard";
import RequestCommissionPage from "./components/TransactionForSalesAgent/RequestCommissionPage";
// import NewKanbanBoard from './components/NewKanbanBoard';

import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import New from "./scenes/new";

import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import InventoryPage from "./components/inventory/InventoryPage";
import ProjectDetails from "./components/inventory/ProjectDetails";
import CommissionPage from "./components/TransactionForFinace/CommissionPage";
// import RequestCommissionPage from './components/TransactionForSalesAgent/RequestCommissionPage';
import ToDoListPage from "./components/todolist/ToDoListPage";
import ContactPage from "./components/contact/Contact";
import ContactDetailForNewKanbanBoard from "./components/newKanbanBoard/contactDetailForNewKanbanBoard/ContactDetailForNewKanbanBoard";
import SalesProcessPage from "./components/salesProcessPage/SalesProcessPage";
import AddToDo from "./components/todolist/AddToDo";
import ItemsList from "./components/todolist/ItemsList";
import { Toaster } from "react-hot-toast";

import SignIn from "./components/SignIn";
import SignUp from "./components/signUp/signUp";
import NewNewKanbanBoard from "./components/newNewKanbanBoard/NewKanbanBoard";
import GetContacts from "./components/getContacts/GetContacts";
import { Box } from "@mui/material";
// import DashboardLayoutNavigationNested from "./scenes/global/DashboardLayout";
// import DashboardLayoutBasic from "./scenes/global/DashboardLayoutBasic";


function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    // Load mode from local storage on app initialization
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      dispatch(setMode(savedMode));
    }
  }, [dispatch]);

  const theme = createTheme(themeSettings(mode));
  const [isSidebar, setIsSidebar] = useState(true);

  // Use useMediaQuery to check if the screen width is less than 600px
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Get the current location
  const location = useLocation();

  // Check if the current route is "/signup" or "/signin"
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className="app"
        style={{ fontSize: isSmallScreen ? "10px" : "inherit" }}
      >

        <main
          className="content"
          style={{ maxWidth: "100%", overflowX: "hidden" }}
        >

          {/* Only render Topbar if not on the auth pages */}
          {!isAuthPage && <Topbar setIsSidebar={setIsSidebar} />}
          <Box sx={{ display: 'flex',minHeight:'91%' }}>

            {/* Only render Sidebar if not on the auth pages */}
            {!isAuthPage && <Sidebar isSidebar={isSidebar} />}
            <Box sx={{width:'100%'}}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/new" element={<New />} />
              <Route path="/KanbanBoard" element={<KanbanBoard />} />
              <Route path="/NewKanbanBoard" element={<NewKanbanBoard />} />
              <Route path="/NewNewKanbanBoard" element={<NewNewKanbanBoard />} />
              <Route
                path="/NewKanbanBoard/:ContactDetail"
                element={<ContactDetailForNewKanbanBoard />}
              />
              <Route path="/projects" element={<InventoryPage />} />
              <Route path="/projects/:projectName" element={<ProjectDetails />} />
              <Route path="/commission" element={<CommissionPage />} />
              <Route path="/todolist" element={<ToDoListPage />}>
                <Route path="addtask" element={<AddToDo />} />
                <Route index element={<ItemsList />} />
              </Route>
              <Route
                path="/RequestCommissionPage"
                element={<RequestCommissionPage />}
              />
              <Route path="/Contact" element={<ContactPage />} />
              <Route path="/SalesProcess" element={<SalesProcessPage />} />
              <Route path="/GetContacts" element={<GetContacts />} />
            </Routes>
            </Box></Box>
        </main>
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3350,
          },
          error: {
            duration: 5870,
          },
          style: {
            fontSize: "17px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
