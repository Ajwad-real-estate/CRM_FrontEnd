import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setMode } from "./helpers/redux/themeSlice";
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
import { themeSettings, tokens } from "./helpers/redux/theme";
import Topbar from "./components/topBar/Topbar";
import Sidebar from "./components/sideBar/TheSideBar";
import Dashboard from "./pages/dashboard/index";
import Team from "./scenes/team";
import CreateAccForm from "./scenes/form";
import Calendar from "./pages/calendar";
import Contacts from "./pages/clients";

import FAQ from "./pages/faq";
import InventoryPage from "./components/inventory/InventoryPage";
import ProjectDetails from "./components/inventory/ProjectDetails";
import ToDoListPage from "./components/todolist/MainPage";
import ItemsList from "./components/todolist/MainPageLayout";
import { Toaster } from "react-hot-toast";

import SignIn from "./pages/signIn/SignIn";
import NewNewKanbanBoard from "./components/newNewKanbanBoard/NewKanbanBoard";
import GetContacts from "./components/getContacts/GetContacts";
import { Box } from "@mui/material";
import NetworkStatus from "./helpers/NetworkStatus";
import Sales from "./scenes/team/sales";
import Profile from "./components/myProfile/Profile";
import ClientDetails from "./pages/clients/ClientDetails";
import AssignContacts from "./pages/manageTeam/assignContacts/AssignContacts";
import AddToDo from "./components/todolist/tasks/AddToDo";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const theme = createTheme(themeSettings(mode));
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      dispatch(setMode(savedMode));
    }
  }, [dispatch]);

  const [isSidebar, setIsSidebar] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const queryClients = new QueryClient();
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
            {<Topbar setIsSidebar={setIsSidebar} />}

            <Box sx={{ display: "flex", minHeight: "91%" }}>
              {<Sidebar isSidebar={isSidebar} />}
              <Box sx={{ width: "100%" }}>
                <Routes>
                  <Route path="/signin" element={<SignIn />} />
                </Routes>

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/CreateAccForm" element={<CreateAccForm />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/clients" element={<Contacts />} />
                  <Route
                    path="/KanbanBoard"
                    element={<NewNewKanbanBoard state="all" />} // Pass "all" as the initial state
                  />
                  <Route
                    path="/KanbanBoard/new"
                    element={<NewNewKanbanBoard state="new" />}
                  />
                  <Route
                    path="/KanbanBoard/qualified"
                    element={<NewNewKanbanBoard state="qualified" />}
                  />
                  <Route
                    path="/KanbanBoard/reserved"
                    element={<NewNewKanbanBoard state="reserved" />}
                  />
                  <Route
                    path="/KanbanBoard/done_deal"
                    element={<NewNewKanbanBoard state="done_deal" />}
                  />
                  <Route
                    path="/KanbanBoard/archieved"
                    element={<NewNewKanbanBoard state="archieved" />}
                  />
                  <Route
                    path="/KanbanBoard/lost"
                    element={<NewNewKanbanBoard state="lost" />}
                  />
                  <Route path="/projects" element={<InventoryPage />} />
                  <Route
                    path="/projects/:projectName"
                    element={<ProjectDetails />}
                  />
                  <Route path="/todolist" element={<ToDoListPage />}>
                    <Route path="addtask" element={<AddToDo />} />
                    <Route index element={<ItemsList />} />
                  </Route>
                  <Route path="/calendar" element={<Calendar />}>
                    <Route path="addtask" element={<AddToDo />} />
                    <Route index element={<ItemsList />} />
                  </Route>
                  <Route path="/sales/:id" element={<Sales />} />
                  <Route path="/profile" element={<Profile />} />
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
              margin: "0px 100px",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
