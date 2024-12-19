import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PipelineColumn from "./PipelineColumn";
import LeadCard from "./LeadCard";
import LeadModal from "./LeadModal";
import { pipelineData } from "../../data/sampleData";

import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import Action from "./actions/Action";
import { LeadOptionsProvider } from "./actions/LeadContext";
import ClientData from "./ClientData";
import Cookies from 'js-cookie';
import ProgressCircle from "../ProgressCircle";


// const transformData = (clients) => {
//  const columns = {}; // To store the different status columns
//  const leads = {};   // To store the lead details

//  // Iterate over the clients to populate leads and columns
//  clients.forEach((client) => {
//   // Check if the column for this client's status exists; if not, create it
//   if (!columns[client.status]) {
//    columns[client.status] = {
//     id: client.status,
//     title: client.status.charAt(0).toUpperCase() + client.status.slice(1), // Capitalize the status for title
//     leadIds: [], // To store the ids of the leads under this status
//    };
//   }
//   // console.log(client)

//   // Create the lead object
//   leads[client.id] = {
//    id: client.id, // Unique identifier for the lead
//    title: client.name || "Untitled Lead", // Use the client's name or "Untitled Lead"
//    amount: client.budget || "No Value", // Show the budget or "No Value" if undefined
//    company: client.city_id || "", // You can map this to a company or location (here, using city_id)
//    phoneNumber: client.phone_numbers[0] || "", // Use the first phone number or empty string if none
//    email: client.email || "", // Use the email or empty string if none
//    tags: [client.channel || ""] // Use the channel as a tag (e.g., Facebook, Instagram)
//   };

//   // Push the lead id to the respective column's leadIds
//   columns[client.status].leadIds.push(client.id);
//  });
//  console.log("columns")
//  console.log(columns)
//  console.log("leads")
//  console.log(leads)
//  return { columns, leads };
// };


function transformData(clients) {
  const columns = {};  // Initialize columns as an empty object
  const leads = {};    // Initialize leads as an empty object

  clients.forEach((client) => {
    // Check if the column for this client's status exists; if not, create it
    if (!columns[client.status]) {
      columns[client.status] = {
        id: client.status,
        title: client.status.charAt(0).toUpperCase() + client.status.slice(1), // Capitalize the status for title
        leadIds: [], // To store the ids of the leads under this status
      };
    }

    // Create the lead object
    leads[client.id] = {
      id: client.id, // Unique identifier for the lead
      title: client.name || "Untitled Lead", // Use the client's name or "Untitled Lead"
      amount: client.budget || "No Value", // Show the budget or "No Value" if undefined
      company: client.city_id || "", // You can map this to a company or location (here, using city_id)
      phoneNumber: client.phone_numbers[0] || "", // Use the first phone number or empty string if none
      email: client.email || "", // Use the email or empty string if none
      tags: [client.channel || ""] // Use the channel as a tag (e.g., Facebook, Instagram)
    };

    // Push the lead id to the respective column's leadIds
    columns[client.status].leadIds.push(client.id);
  });
  // Sorting the columns based on your desired order
  const columnOrder = ['new', 'qualified', 'reserved', 'done_deal'];  // Define the desired order
  const orderedColumns = {};

  columnOrder.forEach(status => {
    if (columns[status]) {
      orderedColumns[status] = columns[status];
    }
  });
  console.log("orderedColumns", orderedColumns);
  console.log("leads", leads);

  return { columns: orderedColumns, leads };
}
//  console.log("columns", columns);
//  console.log("leads", leads);

//  return { columns, leads };
// }




const NewNewKanbanBoard = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  // const [errorTimeout, setErrorTimeout] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clients", {
          method: "GET", // Or 'GET' depending on your API requirement
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
          },
          // body: JSON.stringify({}), // Empty JSON body
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const dataFromApi = await response.json();
        console.log("dataFromApi")
        console.log(dataFromApi)
        setClients(dataFromApi);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };







    // // Timeout logic
    // const timeout = setTimeout(() => {
    //  setErrorTimeout(true);
    // }, 60000); // 1 Minute timeout

    fetchClients();

    // // Cleanup timeout to avoid memory leaks
    // return () => clearTimeout(timeout);
  }, []);



  const initialData = transformData(clients);
  console.log("initialData")
  console.log(initialData.columns)
  const [data, setData] = useState({ columns: {}, leads: {} });
  // Using useEffect to log when the state is updated
  // Transform and update data once clients are loaded
  useEffect(() => {
    if (clients.length > 0) {
      const initialData = transformData(clients); // Transform data when clients are available
      setData(initialData); // Set the transformed data into state
    }
  }, [clients]); // Only runs when clients are updated

  const [dataLeads, setDataLeads] = useState(initialData.leads);
  const [dataColumns, setDataColumns] = useState(initialData.columns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListView, setIsListView] = useState(false); // State for view mode
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Toggle Drawer
  if (data === null) {
    // Show a friendly message while loading or in case of an error
    return (
      <Box textAlign="center" mt="50px">
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProgressCircle size="80" rotate />
        </Box>
        <Typography variant="h4" color={colors.primary[100]}>
          Loading data...
        </Typography>
        {/* <Typography variant="subtitle1" color={colors.grey[400]}>
          Please check your network connection or IT Department and try again later.
        </Typography> */}
      </Box>
    );
  }


  //const navigate = useNavigate();

  const handleDoubleClick = (lead) => {
    // navigate(`/NewNewKanbanBoard/${lead.id}`); // Navigate to contact detail page
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };
  //Close Drawer
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedLead(null);
  };

  //
  //
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  // const onDragEnd = (result) => {
  //  const { source, destination, draggableId } = result;

  //  if (!destination) return;

  //  if (
  //   source.droppableId === destination.droppableId &&
  //   source.index === destination.index
  //  )
  //   return;

  //  const startColumn = data.columns[source.droppableId];
  //  const endColumn = data.columns[destination.droppableId];

  //  if (startColumn === endColumn) {
  //   const newLeadIds = Array.from(startColumn.leadIds);
  //   newLeadIds.splice(source.index, 1);
  //   newLeadIds.splice(destination.index, 0, draggableId);

  //   const newColumn = {
  //    ...startColumn,
  //    leadIds: newLeadIds,
  //   };

  //   setData({
  //    ...data,
  //    columns: {
  //     ...data.columns,
  //     [newColumn.id]: newColumn,
  //    },
  //   });
  //  } else {
  //   const startLeadIds = Array.from(startColumn.leadIds);
  //   startLeadIds.splice(source.index, 1);
  //   const newStart = {
  //    ...startColumn,
  //    leadIds: startLeadIds,
  //   };

  // const endLeadIds = Array.from(endColumn.leadIds);
  // endLeadIds.splice(destination.index, 0, draggableId);
  // const newEnd = {
  //  ...endColumn,
  //  leadIds: endLeadIds,
  // };

  //  setData({
  //   ...data,
  //   columns: {
  //    ...data.columns,
  //    [newStart.id]: newStart,
  //    [newEnd.id]: newEnd,
  //   },
  //  });
  // }
  //  };
  //amount
  // const addNewLead = (columnId) => {
  //  const title = prompt("Enter lead title:");
  //  const value = prompt("Enter lead value:");
  //  const company = prompt("Enter company name:");
  //  const phoneNumber = prompt("Enter PhoneNumber :");
  //  const email = prompt("Enter Email :");
  //  const tags = prompt("Enter tags (comma separated):").split(",");

  //  if (title && value) {
  //   const newLeadId = (Object.keys(data.leads).length + 1).toString();
  //   const newLead = {
  //    id: parseInt(newLeadId, 10),
  //    title,
  //    value,
  //    company,
  //    phoneNumber,
  //    email,
  //    tags: tags.map((tag) => tag.trim()),
  //   };

  //   const updatedColumns = { ...data.columns };
  //   updatedColumns[columnId].leadIds.push(newLeadId);

  //   setData({
  //    columns: updatedColumns,
  //    leads: {
  //     ...data.leads,
  //     [newLeadId]: newLead,
  //    },
  //   });
  //  } else {
  //   alert("Please fill out all fields.");
  //  }
  // };

  // const onSaveLead = (updatedLead) => {
  //  setData((prevData) => {
  //   const updatedLeads = {
  //    ...prevData.leads,
  //    [updatedLead.id]: updatedLead,
  //   };
  //   return { ...prevData, leads: updatedLeads };
  //  });
  // };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Get colors based on the current theme

  // Function to filter leads based on the search query
  const filteredLeads = Object.values(data.leads).filter((lead) =>
    lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to update a specific lead
  const updateLead = (updatedLead) => {
    setData((prevData) => {
      const { id } = updatedLead;

      // Check if the lead exists
      if (!prevData.leads[id]) {
        console.error(`Lead with id ${id} not found.`);
        return prevData; // Return previous data if the lead doesn't exist
      }

      // Update the specific lead by merging the existing lead with the updated data
      const updatedLeads = {
        ...prevData.leads,
        [id]: {
          ...prevData.leads[id], // Retain existing data
          ...updatedLead, // Merge updated data
        },
      };

      // Return the updated state with the new leads object
      return {
        ...prevData,
        leads: updatedLeads,
      };
    });
  };
  return (
    <>
      <Box m="20px">
        {/* <Header title="Contacts" subtitle="Manage your tasks effectively" /> */}
        <Box
          m="40px 0 0 0"
          height="100%"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            fontSize: isNonMobile ? "14px" : "8px",
            backgroundColor: colors.primary[400], // Use theme colors
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "space-between",
            }}
          >
            <TextField
              variant="outlined"
              label="Search Leads"
              fullWidth
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mr: 2, padding: "10px 0px", width: "50%", display: "flex" }} // Use theme colors
            />
            <Button
              variant="contained"
              onClick={() => setIsListView(!isListView)}
              sx={{
                ml: 2,
                padding: "10px 0px",
                width: "25%",
                display: "flex",
                background: colors.columns[900],
                border: "0.01px solid ",
                borderColor: colors.columns[100],
                color: colors.grey[100],
                pl: 0.5,
                pr: 0.5,
                boxShadow: 3,
                "&:hover": {
                  background: colors.columns[900],
                  boxShadow: 9, // Add shadow on hover
                },
              }}
            >
              {isListView ? "Switch to Kanban View" : "Switch to List View"}
            </Button>
          </Box>

          {isListView ? (
            // Render List View
            <Box>
              {filteredLeads.map((lead) => (
                <Box key={lead.id} sx={{ mb: 2 }}>
                  <LeadCard
                    lead={lead}
                    onDoubleClick={() => handleDoubleClick(lead)}
                  // sx={{ backgroundColor: colors.primary[500] }} // Use theme colors252
                  />
                </Box>
              ))}
            </Box>
          ) : (
            // Render Kanban View
            <DragDropContext
            // onDragEnd={onDragEnd}
            >
              <div style={{ display: "flex", overflowX: "auto" }}>
                {Object.values(data.columns).map((column) => (
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          margin: "0 8px",
                          minWidth: 250,
                          borderRadius: "8px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "flex-start",
                        }} // Use theme colors
                      >
                        <PipelineColumn
                          title={column.title}
                        // onAdd={() => addNewLead(column.id)}
                        >
                          {filteredLeads
                            .filter((lead) =>
                              column.leadIds.includes(lead.id.toString())
                            )
                            .map((leadId, index) => (
                              <Draggable
                                key={leadId.id}
                                draggableId={leadId.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      marginBottom: "8px",
                                      // backgroundColor: colors.primary[500], // Use theme colors
                                      borderRadius: "4px",
                                    }}
                                    onDoubleClick={() =>
                                      handleDoubleClick(leadId)
                                    }
                                  >
                                    <LeadCard lead={leadId} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </PipelineColumn>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          )}
          {isModalOpen && (
            <LeadModal
              lead={selectedLead}
              onClose={handleCloseModal}
            // onSave={onSaveLead}
            />
          )}
        </Box>
        <LeadOptionsProvider>
          <Action
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            lead={selectedLead}
            onUpdate={updateLead}
          />
        </LeadOptionsProvider>
      </Box>
    </>
  );
};

export default NewNewKanbanBoard;
