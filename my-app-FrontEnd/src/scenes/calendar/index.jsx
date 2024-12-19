import { useState } from "react";
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
} from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import { useTasks } from "../../components/todolist/useTasks";
import formatTaskDates from "../../components/todolist/date-visualization";
import ProgressCircle from "../../components/ProgressCircle";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const tasks = useSelector((state) => state.todolist.todos);
  //  Task Date
  const { isPending, data, error, isError } = useTasks();
  let All_TASKS = [];
  let TODAY = [];
  if (!isPending) {
    All_TASKS = data.allTasks;
    TODAY = data.todayTasks;

    All_TASKS = All_TASKS.map((task) => formatTaskDates(task));
    TODAY = TODAY.map((task) => formatTaskDates(task));
    console.log(All_TASKS);
    console.log(TODAY);
  }
  const allTasks = [...TODAY, ...All_TASKS];

  //

  //const [currentEvents, setCurrentEvents] = useState([]);
  let formattedEvents = [];
  if (data) {
    formattedEvents = allTasks.map((task) => ({
      id: task.is, // Fallback to a unique generated ID if `id` is missing
      title: task?.title || "Untitled Task", // Fallback to a default title
      start:
        task?.created_at?.split(" ")[0] ||
        task?.date ||
        new Date().toISOString(), // Fallback to `date` or current date
      end: task?.date || new Date().toISOString(), // Fallback to the current date in ISO format
      allDay: task?.allDay || false, // Default to `false` if not specified
    }));
  }
  return (
    <>
      {formatTaskDates && !isPending && (
        <Box m="20px">
          <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box
              flex="1 1 20%"
              backgroundColor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
            >
              <Typography variant="h5">Events</Typography>
              <List>
                {formattedEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
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
                //select={handleDateClick}
                // eventClick={handleEventClick}
                // eventsSet={(events) => setCurrentEvents(events)}
                events={formattedEvents}
              />
            </Box>
          </Box>
        </Box>
      )}
      {isPending && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ProgressCircle rotate />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            color: colors.redAccent[600],
          }}
        >
          <Typography variant="h3">
            {" "}
            Error occurd when fetching Calender !
          </Typography>
        </Box>
      )}
    </>
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
