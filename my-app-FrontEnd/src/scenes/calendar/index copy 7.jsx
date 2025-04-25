import { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import CloseIcon from "@mui/icons-material/Close";
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
import { useQueries, useQuery } from "@tanstack/react-query";
import { getClient } from "../../components/newNewKanbanBoard/actions/apiKanbanStuff";

const Calendar = () => {
  const [formData, setFormData] = useState({
    comment: "",
    date: "",
    time: "",
    status_id: "",
    location: "",
    name: "",
    email: "",
    age: "",
    phone_numbers: "",
    nat_id: "",
    street: "",
    city_id: "",
    channel_id: "",
    type_id: "",
    budget: "",
    action_id: "",
    project_id: "",
    unit_id: "",
  });
  const theme = useTheme();
  const colors = useMemo(
    () => tokens(theme.palette.mode),
    [theme.palette.mode]
  );
  const [openActionForm, setOpenActionForm] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { isPending, data, isError } = useTasks();
  const { deleteTaskById } = useDeleteTask();

  const tasks = data?.allTasks?.map((task) => formatTaskDates(task)) || [];
  const actions =
    data?.allActions?.map((action) => formatTaskDates(action)) || [];

  const { data: clientData } = useClient(actions?.[0]?.client_id || null);

  const clientIds = useMemo(
    () => [
      ...new Set(actions.map((action) => action.client_id).filter(Boolean)),
    ],
    [actions]
  );
  // Replace multiple client queries with single batched query
  // const { data: allClients } = useQuery({
  //   queryKey: ["all-clients"],
  //   queryFn: () => getAllClients(), // Create this API function
  //   select: (data) => new Map(data.map((client) => [client.id, client])),
  // });

  // // Replace clientsMap with:
  // const clientsMap = allClients || new Map();

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

  useEffect(() => {
    if (selectedAction && clientData) {
      // Find the matched action type using the selected action's type_id
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
        name: clientData.name || "",
        email: clientData.email || "",
        phone_numbers: clientData.phone_numbers?.[0] || "",
        status_id: clientData.status_id || "",
        action_type: matchedOption?.value || "",
        ...(clientData.additionalFields || {}), // Include any other client fields you need
      });
    }
  }, [selectedAction, clientData]);
  const handleOpenActionForm = (action) => {
    setSelectedAction(action);
    setOpenActionForm(true);
  };

  const { formattedTasks, formattedActions } = useMemo(() => {
    if (!data || isPending) {
      return { formattedTasks: [], formattedActions: [] };
    }
    setSelectedEvent(tasks);

    const formatEvents = (items, type) =>
      items.map((item) => ({
        id: item?.id,
        client_id: item.client_id,
        // title: item?.title || clientData?.name || "Action",
        title: item?.title || clientsMap.get(item.client_id)?.name || "Action",
        status: item?.status || "pending",
        priority_level: item?.priority_level || 1,
        date: item?.date?.split(" ")[0] || new Date().toISOString(),
        time: item?.time || "",
        detail: item?.detail || "No Description",
        status_id: item?.status_id || "",
        // comment: item?.comment || "",
        // location: item?.location || "",
        // action_id: item?.action_id || "",
        // project_id: item?.project_id || "",
        // unit_id: item?.unit_id || "",
        type_id: item?.type_id || "",
        end: item?.date?.split(" ")[0] || new Date().toISOString(),
        // allDay: item?.allDay || false,
        type: type,
      }));
    return {
      formattedTasks: formatEvents(tasks, "task"),
      formattedActions: formatEvents(actions, "action"),
    };
  }, [data, isPending]);
  const activeEvents = useMemo(() => {
    switch (activeTab) {
      case 0: // All
        return [...formattedTasks, ...formattedActions];
      case 1: // Tasks
        return formattedTasks;
      case 2: // Actions
        return formattedActions;
      default:
        return [];
    }
  }, [activeTab, formattedTasks, formattedActions]);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const eventContent = ({ event }) => {
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

  // Dialog handlers
  const handleOpenDialog = (task = null) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}>
        <ProgressCircle rotate />
      </Box>
    );
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

          <List>
            {activeEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor:
                    event.type === "action"
                      ? colors.blueAccent[500]
                      : colors.greenAccent[600],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}>
                {/* Add Checkbox for tasks */}
                {event.type !== "action" && (
                  <Checkbox
                    onChange={() => deleteTaskById(event.id)}
                    sx={{
                      marginRight: 1,
                    }}
                  />
                )}
                <ListItemText
                  primary={
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
                  }
                />
                {event.type !== "action" ? (
                  <IconButton
                    onClick={() => handleOpenDialog(event)}
                    sx={{ color: colors.grey[100] }}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => handleOpenActionForm(event)}
                    sx={{ color: colors.grey[100] }}>
                    <EditIcon />
                  </IconButton>
                )}
                <ActionForm
                  open={openActionForm}
                  onClose={() => setOpenActionForm(false)}
                  todo={formData}
                />
                {/* Add the dialog component */}
                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  fullWidth
                  sx={{
                    "& .MuiBackdrop-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.3)", // Lighter or transparent
                    },
                  }}
                  maxWidth="md">
                  <Box sx={{ p: 4, position: "relative" }}>
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseDialog}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                      }}>
                      <CloseIcon />
                    </IconButton>
                    <AddTaskForm
                      todo={selectedTask}
                      onClose={handleCloseDialog}
                    />
                  </Box>
                </Dialog>
              </ListItem>
            ))}
          </List>
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
            editable={true}
            selectable={true}
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
