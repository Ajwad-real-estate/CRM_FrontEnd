import { useSelector } from 'react-redux';
import { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { themeSettings } from './theme';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/TheSideBar';
import Dashboard from './scenes/dashboard/index';
import Team from "./scenes/team";
import Form from "./scenes/form";
import Calendar from './scenes/calendar';
import KanbanBoard from './components/KanbanBoard';
import NewKanbanBoard from './components/newKanbanBoard/NewKanbanBoard';
// import NewKanbanBoard from './components/NewKanbanBoard';

import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import New from "./scenes/new";

import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import InventoryPage from './components/inventory/InventoryPage';
import ProjectDetails from './components/inventory/ProjectDetails';
import CommissionPage from './components/Transaction/CommissionPage';


function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = createTheme(themeSettings(mode));
  const [isSidebar, setIsSidebar] = useState(true);

  // Use useMediaQuery to check if the screen width is less than 600px
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app' style={{ fontSize: isSmallScreen ? '10px' : 'inherit' }}>
        <Sidebar isSidebar={isSidebar} />
        <main className='content' style={{ maxWidth: '100%', overflowX: 'hidden' }}>
          <Topbar setIsSidebar={setIsSidebar} />
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
            <Route path="/projects" element={<InventoryPage />} />
            <Route path="/projects/:projectName" element={<ProjectDetails />} />
            <Route path="/commission" element={<CommissionPage />} />

          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
