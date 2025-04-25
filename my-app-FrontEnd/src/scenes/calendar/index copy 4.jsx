import { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import CloseIcon from "@mui/icons-material/Close";
import { styled as sty } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Tabs,
  Tab,
  Checkbox,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  useDeleteTask,
  useTasks,
  useTaskStatuses,
} from "../../components/todolist/tasks/taskQueries";
import formatTaskDates from "../../components/todolist/utils/date-visualization";
import ProgressCircle from "../../components/ProgressCircle";
import AddTaskForm from "../../components/todolist/tasks/addTaskForm";
import { useClient } from "../../components/newNewKanbanBoard/actions/useKanban";
import ActionForm from "../../components/todolist/actions/addActionForm";
import { actionOptions } from "../../data/clientOptions";
import { useQueries } from "@tanstack/react-query";
import { getClient } from "../../components/newNewKanbanBoard/actions/apiKanbanStuff";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openActionForm, setOpenActionForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(0);

  // Data hooks
  const { isPending, data, isError } = useTasks();
  const { deleteTaskById } = useDeleteTask();
  const { data: statuses = [] } = useTaskStatuses();

  // Process tasks and actions
  const tasks = data?.allTasks?.map((task) => formatTaskDates(task)) || [];
  const actions =
    data?.allActions?.map((action) => formatTaskDates(action)) || [];

  // Client data handling
  const clientIds = useMemo(
    () => [
      ...new Set(actions.map((action) => action.client_id).filter(Boolean)),
    ],
    [actions]
  );

  const clientQueries = useQueries({
    queries: clientIds.map((clientId) => ({
      queryKey: ["client", clientId],
      queryFn: () => getClient(clientId),
      staleTime: Infinity,
    })),
  });

  const clientsMap = useMemo(() => {
    const map = new Map();
    clientQueries.forEach((query) => {
      if (query.data) map.set(query.data.id, query.data);
    });
    return map;
  }, [clientQueries]);

  // Event formatting
  const { formattedTasks, formattedActions } = useMemo(() => {
    if (!data || isPending) return { formattedTasks: [], formattedActions: [] };

    const formatEvents = (items, type) =>
      items.map((item) => ({
        id: item?.id,
        client_id: item.client_id,
        title: item?.title || clientsMap.get(item.client_id)?.name || "Action",
        status: item?.status || "pending",
        priority_level: item?.priority_level || 1,
        date: item?.date?.split(" ")[0] || new Date().toISOString(),
        time: item?.time || "",
        detail: item?.detail || "No Description",
        status_id: item?.status_id || "",
        comment: item?.comment || "",
        location: item?.location || "",
        action_id: item?.action_id || "",
        project_id: item?.project_id || "",
        unit_id: item?.unit_id || "",
        type_id: item?.type_id || "",
        end: item?.date?.split(" ")[0] || new Date().toISOString(),
        allDay: item?.allDay || false,
        type: type,
      }));

    return {
      formattedTasks: formatEvents(tasks, "task"),
      formattedActions: formatEvents(actions, "action"),
    };
  }, [data, isPending, tasks, actions, clientsMap]);

  // Combined events
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

  // Event content component
  const EventContent = ({ event }) => {
    const isAction = event.extendedProps.type === "action";
    const client = isAction
      ? clientsMap.get(event.extendedProps.client_id)
      : null;

    return (
      <div
        style={{
          backgroundColor: isAction
            ? colors.blueAccent[500]
            : colors.greenAccent[500],
          padding: "2px 5px",
          borderRadius: "3px",
          color: colors.grey[100],
        }}>
        {isAction ? (
          client ? (
            client.name
          ) : (
            //<CircularProgress size={12} color="inherit" />
            <></>
          )
        ) : (
          event.title
        )}
      </div>
    );
  };

  // Form data handling
  useEffect(() => {
    if (selectedAction) {
      const client = clientsMap.get(selectedAction.client_id);
      const matchedOption = actionOptions.find(
        (opt) => opt.id === selectedAction.type_id
      );

      setFormData({
        id: selectedAction.id,
        client_id: selectedAction.client_id,
        date: selectedAction.date || "",
        time: selectedAction.time || "",
        type_id: selectedAction.type_id || "",
        comment: selectedAction.comment || "",
        location: selectedAction.location || "",
        name: client?.name || "",
        email: client?.email || "",
        phone_numbers: client?.phone_numbers?.[0] || "",
        status_id: client?.status_id || "",
        action_type: matchedOption?.value || "",
        ...(client?.additionalFields || {}),
      });
    }
  }, [selectedAction, clientsMap]);

  // Loading and error states
  if (isPending)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}></Box>
    );

  if (isError)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          color: colors.redAccent[600],
        }}>
        <Typography variant="h3">Error loading calendar data!</Typography>
      </Box>
    );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" gap="15px">
        {/* Sidebar */}
        <Box
          flex="1 1 20%"
          bgcolor={colors.primary[400]}
          p="15px"
          borderRadius="4px">
          <Typography variant="h5" mb={2}>
            Events
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, newVal) => setActiveTab(newVal)}
            sx={{ mb: 2 }}>
            <Tab label="All" />
            <Tab label="Tasks" />
            <Tab label="Actions" />
          </Tabs>

          <List>
            {activeEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  bgcolor:
                    event.type === "action"
                      ? colors.blueAccent[500]
                      : colors.greenAccent[600],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}>
                {event.type === "task" && (
                  <Checkbox
                    onChange={() => deleteTaskById(event.id)}
                    sx={{ mr: 1 }}
                  />
                )}

                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      {event.type === "action" && <Box sx={{ mr: 1 }}></Box>}
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ color: "#0a031e" }}>
                        {event.title}
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ ml: 1 }}>
                          ({event.type})
                        </Typography>
                      </Typography>
                    </Box>
                  }
                />

                <IconButton
                  onClick={() =>
                    event.type === "action"
                      ? setOpenActionForm(true)
                      : setOpenDialog(true)
                  }
                  sx={{ color: colors.grey[100] }}>
                  <EditIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Calendar */}
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
            editable={true}
            selectable={true}
            events={activeEvents}
            eventContent={(eventInfo) => (
              <EventContent event={eventInfo.event} />
            )}
          />
        </Box>
      </Box>

      {/* Dialogs */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md">
        <Box sx={{ p: 4, position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <AddTaskForm
            todo={selectedTask}
            onClose={() => setOpenDialog(false)}
          />
        </Box>
      </Dialog>

      <ActionForm
        open={openActionForm}
        onClose={() => setOpenActionForm(false)}
        todo={formData}
        clientData={clientsMap.get(selectedAction?.client_id)}
      />
    </Box>
  );
};

export default Calendar;
