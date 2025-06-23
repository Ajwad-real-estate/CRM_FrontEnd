import PageDesign from "../../helpers/ui/PageDesign";

import { Outlet } from "react-router-dom";

const ToDoListPage = () => {
  return (
    <PageDesign>
      <Outlet />
    </PageDesign>
  );
};

export default ToDoListPage;
