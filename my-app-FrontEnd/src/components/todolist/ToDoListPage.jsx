import PageDesign from "../../ui/PageDesign";

import { Outlet } from "react-router-dom";

const ToDoListPage = () => {
  return (
    <PageDesign title="To-Do List" subtitle="Manage Your tasks effectively">
      <Outlet />
    </PageDesign>
  );
};

export default ToDoListPage;
