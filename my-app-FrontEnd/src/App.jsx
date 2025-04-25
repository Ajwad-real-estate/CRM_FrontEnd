import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { setMode } from "./themeSlice";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { themeSettings, tokens } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/TheSideBar";
import Dashboard from "./scenes/dashboard/index";
import Team from "./scenes/team";
import CreateAccForm from "./scenes/form";
import Calendar from "./scenes/calendar";
import KanbanBoard from "./components/KanbanBoard";
import NewKanbanBoard from "./components/newKanbanBoard/NewKanbanBoard";
import RequestCommissionPage from "./components/TransactionForSalesAgent/RequestCommissionPage";
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
import ToDoListPage from "./components/todolist/MainPage";
import ContactDetailForNewKanbanBoard from "./components/newKanbanBoard/contactDetailForNewKanbanBoard/ContactDetailForNewKanbanBoard";
import SalesProcessPage from "./components/salesProcessPage/SalesProcessPage";
// import AddToDo from "./components/todolist/tasks/addTaskForm";
import ItemsList from "./components/todolist/MainPageLayout";
import { Toaster } from "react-hot-toast";

import SignIn from "./components/SignIn";
import SignUp from "./components/signUp/signUp";
import NewNewKanbanBoard from "./components/newNewKanbanBoard/NewKanbanBoard";
import GetContacts from "./components/getContacts/GetContacts";
import { Box } from "@mui/material";
import NetworkStatus from "./NetworkStatus";
import Cookies from "js-cookie"; // Import js-cookie
import { useNavigate } from "react-router-dom"; // For navigation
import Sales from "./scenes/team/sales";
import Profile from "./components/myProfile/Profile";
import ClientDetails from "./scenes/contacts/ClientDetails";
import AssignContacts from "./components/assignContacts/AssignContacts";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const theme = createTheme(themeSettings(mode));
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    // Load mode from local storage on app initialization
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      dispatch(setMode(savedMode));
    }

    // Check for access token in cookies
    // const accessToken = Cookies.get("accessToken");
    // if (!accessToken) {
    //   // Redirect to the sign-in page if no token is found
    //   navigate("/signin");
    // }
  }, [dispatch]);

  const [isSidebar, setIsSidebar] = useState(true);

  // Use useMediaQuery to check if the screen width is less than 600px
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const queryClients = new QueryClient();
  // Get the current location
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClients}>
      <ReactQueryDevtools initialIsOpen={false} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="app"
          style={{ fontSize: isSmallScreen ? "10px" : "inherit" }}>
          <main
            className="content"
            style={{ maxWidth: "100%", overflowX: "hidden" }}>
            {/* Only render Topbar if not on the auth pages */}
            {<Topbar setIsSidebar={setIsSidebar} />}

            <Box sx={{ display: "flex", minHeight: "91%" }}>
              {/* Only render Sidebar if not on the auth pages */}
              {<Sidebar isSidebar={isSidebar} />}
              {/* {!isAuthPage && <Sidebar isSidebar={isSidebar} />} */}
              <Box sx={{ width: "100%" }}>
                <Routes>
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>

                <Routes>
                  {/* <Route path="getClientsData" element={<ClientData />} /> */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/CreateAccForm" element={<CreateAccForm />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/clients" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/new" element={<New />} />
                  <Route path="/KanbanBoard" element={<KanbanBoard />} />
                  <Route path="/NewKanbanBoard" element={<NewKanbanBoard />} />
                  <Route
                    path="/NewNewKanbanBoard"
                    element={<NewNewKanbanBoard state="all" />} // Pass "all" as the initial state
                  />
                  <Route
                    path="/NewNewKanbanBoard/new"
                    element={<NewNewKanbanBoard state="new" />}
                  />
                  <Route
                    path="/NewNewKanbanBoard/qualified"
                    element={<NewNewKanbanBoard state="qualified" />}
                  />
                  <Route
                    path="/NewNewKanbanBoard/reserved"
                    element={<NewNewKanbanBoard state="reserved" />}
                  />
                  <Route
                    path="/NewNewKanbanBoard/done_deal"
                    element={<NewNewKanbanBoard state="done_deal" />}
                  />
                  <Route
                    path="/NewNewKanbanBoard/archieved"
                    element={<NewNewKanbanBoard state="archieved" />}
                  />
                  <Route
                    path="/NewNewKanbanBoard/lost"
                    element={<NewNewKanbanBoard state="lost" />}
                  />
                  <Route
                    path="/NewKanbanBoard/:ContactDetail"
                    element={<ContactDetailForNewKanbanBoard />}
                  />
                  <Route path="/projects" element={<InventoryPage />} />
                  <Route
                    path="/projects/:projectName"
                    element={<ProjectDetails />}
                  />
                  <Route path="/commission" element={<CommissionPage />} />
                  <Route path="/todolist" element={<ToDoListPage />}>
                    {/* <Route path="addtask" element={<AddToDo />} /> */}
                    <Route index element={<ItemsList />} />
                  </Route>
                  <Route
                    path="/RequestCommissionPage"
                    element={<RequestCommissionPage />}
                  />
                  <Route path="/sales/:id" element={<Sales />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* <Route path="/Contact" element={<ContactPage />} /> */}
                  <Route path="/SalesProcess" element={<SalesProcessPage />} />
                  <Route path="/GetContacts" element={<GetContacts />} />
                  <Route path="/AssignContacts" element={<AssignContacts />} />
                  <Route path="/clients/:id" element={<ClientDetails />} />
                </Routes>
              </Box>
            </Box>
          </main>
        </div>
        <NetworkStatus />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3350,
            },
            error: {
              duration: 5870,
            },
            style: {
              background: colors.primary[400],
              fontSize: "17px",
              maxWidth: "500px",
              padding: "16px 24px",
              // top: '100px',
              margin: "0px 100px",
              // backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
