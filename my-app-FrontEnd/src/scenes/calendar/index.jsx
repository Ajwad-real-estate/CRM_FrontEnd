import { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Typography, useTheme, Tabs, Tab } from "@mui/material";
import { tokens } from "../../theme";
import {
  useTasks,
  useUpdateTask,
} from "../../components/todolist/tasks/taskQueries";
import formatTaskDates from "../../components/todolist/utils/date-visualization";
import { useActionClients } from "../../components/newNewKanbanBoard/actions/useKanban";
import Loading from "../../utils/loading";
import ItemsList from "../../components/todolist/MainPageLayout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useUpdateAction } from "../../components/todolist/actions/actionQueries";

const Calendar = () => {
  const theme = useTheme();
  const colors = useMemo(
    () => tokens(theme.palette.mode),
    [theme.palette.mode]
  );
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const {
    isPending: tasksPending,
    data: tasksData,
    isError,
  } = useTasks({
    staleTime: 60 * 1000, // 1 minute cache
  });

  const actionClientIds = useMemo(() => {
    if (!tasksData?.allActions) return [];
    return [
      // ...new Set(tasksData.allActions.map((a) => a.client_id).filter(Boolean)),
      ...new Set(
        tasksData.allActions
          .map((a) => a.client_id)
          .filter((id) => id !== null && id !== undefined)
      ),
    ];
  }, [tasksData]);

  const {
    data: clientsMap,
    isError: clientsError,
    isLoading: clientsLoading,
  } = useActionClients(actionClientIds);

  const [tasks, actions] = useMemo(() => {
    if (!tasksData) return [[], []];
    return [
      tasksData.allTasks?.map(formatTaskDates) || [],
      tasksData.allActions?.map(formatTaskDates) || [],
    ];
  }, [tasksData]);

  useEffect(() => {
    if (tasks) {
      setSelectedEvent(tasks);
    }
  }, [tasks]);

  const { formattedTasks, formattedActions } = useMemo(() => {
    if (!tasksData || tasksPending) {
      return { formattedTasks: [], formattedActions: [] };
    }
    const formatTask = (task) => ({
      id: task?.id,
      title: task?.title || "Task",
      date: task?.date?.split(" ")[0] || new Date().toISOString(),
      time: task?.time || "",
      end: task?.date?.split(" ")[0] || new Date().toISOString(),
      type: "task",
      // client_id: task.client_id,
      // status: task?.status || "pending",
      // priority_level: task?.priority_level || 1,
      // detail: task?.detail || "No Description",
      // status_id: task?.status_id || "",
      // type_id: task?.type_id || "",
    });

    // Formatting function for actions
    const formatAction = (action) => ({
      id: action?.id,
      title:
        action?.title || clientsMap?.get(action.client_id)?.name || "Action",
      date: action?.date?.split(" ")[0] || new Date().toISOString(),
      time: action?.time || "",
      end: action?.date?.split(" ")[0] || new Date().toISOString(),
      type: "action",
      // client_id: action.client_id,
      // status: action?.status || "pending",
      // priority_level: action?.priority_level || 1,
      // detail: action?.detail || "No Description",
      // status_id: action?.status_id || "",
      // type_id: action?.type_id || "",
    });

    return {
      formattedTasks: tasks.map(formatTask),
      formattedActions: actions.map(formatAction),
    };
  }, [tasksData, tasksPending, tasks, actions, clientsMap]);

  console.log("selectedAction==", selectedAction);

  const activeEvents = useMemo(() => {
    switch (activeTab) {
      case 0:
        return [...formattedTasks, ...formattedActions];
      case 1:
        return formattedTasks;
      case 2:
        return formattedActions;
      default:
        return [];
    }
  }, [activeTab, formattedTasks, formattedActions]);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const eventContent = useMemo(
    () =>
      ({ event }) => {
        const isAction = event.extendedProps.type === "action";
        const color = isAction
          ? colors.blueAccent[500]
          : colors.greenAccent[500];

        return (
          <div style={{ backgroundColor: color /* ... */ }}>{event.title}</div>
        );
      },
    [colors]
  );

  if (tasksPending || clientsLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          color: colors.redAccent[600],
        }}>
        <Typography variant="h3">
          Error occurred when fetching Calendar data!
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px">
          <Typography variant="h5" mb={2}>
            Events
          </Typography>

          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="All" />
            <Tab label="Tasks" />
            <Tab label="Actions" />
          </Tabs>
          <ItemsList optionValue={activeTab} />
        </Box>
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            selectMirror={true}
            dayMaxEvents={false}
            events={activeEvents}
            eventContent={eventContent}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
