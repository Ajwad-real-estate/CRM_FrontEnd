import { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
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
} from "../../components/todolist/tasks/taskQueries";
import formatTaskDates from "../../components/todolist/utils/date-visualization";
import ProgressCircle from "../../components/ProgressCircle";
import EditDialogue from "./EditDialogue";
import AddTaskForm from "../../components/todolist/tasks/addTaskForm";
// import AddToDo from "../../components/todolist/tasks/addTaskForm";
// import addTaskForm from "../../components/todolist/tasks/addTaskForm";

const Calendar = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [activeTab, setActiveTab] = useState(0);
  const { isPending, data, isError } = useTasks();
  const { deleteTaskById } = useDeleteTask(); // Add delete function

  // Process tasks and actions data
  const { formattedTasks, formattedActions } = useMemo(() => {
    if (!data || isPending) {
      return { formattedTasks: [], formattedActions: [] };
    }

    const tasks = data.allTasks.map((task) => formatTaskDates(task));
    const actions = data.allActions.map((action) => formatTaskDates(action));

    const formatEvents = (items, type) =>
      items.map((item, i) => ({
        id: item?.id || `${type}-${i}`,
        title: item?.title || item?.ClientName || "Action",
        status: item?.status || "pending",
        priority_level: item?.priority_level || 1,
        date: item?.date?.split(" ")[0] || new Date().toISOString(),
        time: item?.time || "",
        detail: item?.detail || "No Description",
        // start:
        //   type === "action"
        //     ? null
        //     : item?.created_at?.split(" ")[0] ||
        //       item?.date ||
        //       new Date().toISOString(),
        end: item?.date?.split(" ")[0] || new Date().toISOString(),
        allDay: item?.allDay || false,
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

  // Event color handling
  const eventContent = (eventInfo) => {
    const isAction = eventInfo.event.extendedProps.type === "action";
    return (
      <div
        style={{
          backgroundColor: isAction
            ? colors.blueAccent[500]
            : colors.greenAccent[500],
          borderColor: isAction
            ? colors.blueAccent[700]
            : colors.greenAccent[700],
        }}>
        {eventInfo.event.title}
      </div>
    );
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
                      // color: colors.greenAccent[100],
                      // "&.Mui-checked": {
                      //   color: colors.greenAccent[300],
                      // },
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
                  // secondary={
                  //   <Typography variant="body2">
                  //     {formatDate(event.start, {
                  //       year: "numeric",
                  //       month: "short",
                  //       day: "numeric",
                  //     })}
                  //   </Typography>
                  // }
                />
                {/* {event.type !== "action" && <EditDialogue todo={event} />} */}
                {event.type !== "action" && <AddTaskForm
                     todo={selectedEvent}
                     statuses={statuses}
                     onClose={() => setSelectedEvent(null)}
         
                // todo={event} 
                />}
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

//   const handleDateClick = (selected) => {
//     const title = prompt("Please enter a new title for your event");
//     const calendarApi = selected.view.calendar;
//     console.log(title);
//     calendarApi.unselect();
//     if (title) {
//       calendarApi.addEvent({
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.startStr,
//         end: selected.endStr,
//         allDay: selected.allDay,
//       });
//     }
//   };

//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${selected.event.title}'`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };
