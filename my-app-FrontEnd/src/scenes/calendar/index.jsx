import { useState, useEffect } from "react";
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
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";

// Helper Function to Combine Date and Time
const combineDateTime = (date, time) => {
  if (!date || !time || typeof time !== "string") return null;

  try {
    const [hourMinute, period] = time.split(" ");
    if (!hourMinute || !period) return null;

    let [hours, minutes] = hourMinute.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;

    if (period.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (period.toLowerCase() === "am" && hours === 12) hours = 0;

    return `${date}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  } catch (error) {
    console.error("Error combining date and time:", error);
    return null;
  }
};

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tasks = useSelector((state) => state.todolist.todos);

  const [currentEvents, setCurrentEvents] = useState([]);

  // Format Redux Todos for Calendar and List
  useEffect(() => {
    const formattedTasks = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      start: combineDateTime(task.startDate, task.startTime),
      end: combineDateTime(task.endDate, task.endTime),
    }));

    setCurrentEvents(formattedTasks);
  }, [tasks]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      setCurrentEvents([...currentEvents, newEvent]);
      calendarApi.addEvent(newEvent);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      setCurrentEvents(
        currentEvents.filter((event) => event.id !== selected.event.id)
      );
    }
  };

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />
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
            {currentEvents.map((event) => (
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
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
