import PageDesign from "../../ui/PageDesign";

import { Outlet } from "react-router-dom";
import { ToDoListProvider } from "./Contexts/TempContext";

const ToDoListPage = () => {
  return (
    <ToDoListProvider>
      <PageDesign title="To-Do List" subtitle="Manage Your tasks effectively">
        <Outlet />
      </PageDesign>
    </ToDoListProvider>
  );
};

export default ToDoListPage;
