import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PipelineColumn from "./PipelineColumn";
import LeadCard from "./LeadCard";
import LeadModal from "./LeadModal";
import { pipelineData } from "../../data/sampleData";

import { Box, useTheme, useMediaQuery, Button, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const transformData = (pipelineData) => {
  const columns = {};
  const leads = {};
  let leadId = 1;

  pipelineData.forEach((pipeline) => {
    columns[pipeline.id] = {
      id: pipeline.id,
      title: pipeline.title,
      leadIds: [],
    };

    pipeline.leads.forEach((lead) => {
      leads[lead.id] = {
        id: lead.id.toString(),
        title: lead.title,
        amount: lead.value,
        company: lead.company || "",
        phoneNumber: lead.phoneNumber || "",
        email: lead.email || "",
        tags: lead.tags || [],
      };
      columns[pipeline.id].leadIds.push(lead.id.toString());
      leadId++;
    });
  });

  return { columns, leads };
};

const NewKanbanBoard = () => {
  const initialData = transformData(pipelineData);
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListView, setIsListView] = useState(false); // State for view mode
  const navigate = useNavigate();

  const handleDoubleClick = (lead) => {
    navigate(`/NewKanbanBoard/${lead.id}`); // Navigate to contact detail page
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newLeadIds = Array.from(startColumn.leadIds);
      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        leadIds: newLeadIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      const startLeadIds = Array.from(startColumn.leadIds);
      startLeadIds.splice(source.index, 1);
      const newStart = {
        ...startColumn,
        leadIds: startLeadIds,
      };

      const endLeadIds = Array.from(endColumn.leadIds);
      endLeadIds.splice(destination.index, 0, draggableId);
      const newEnd = {
        ...endColumn,
        leadIds: endLeadIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newEnd.id]: newEnd,
        },
      });
    }
  };

  const addNewLead = (columnId) => {
    const title = prompt("Enter lead title:");
    const value = prompt("Enter lead value:");
    const company = prompt("Enter company name:");
    const phoneNumber = prompt("Enter PhoneNumber :");
    const email = prompt("Enter Email :");
    const tags = prompt("Enter tags (comma separated):").split(",");

    if (title && value) {
      const newLeadId = (Object.keys(data.leads).length + 1).toString();
      const newLead = {
        id: parseInt(newLeadId, 10),
        title,
        value,
        company,
        phoneNumber,
        email,
        tags: tags.map((tag) => tag.trim()),
      };

      const updatedColumns = { ...data.columns };
      updatedColumns[columnId].leadIds.push(newLeadId);

      setData({
        columns: updatedColumns,
        leads: {
          ...data.leads,
          [newLeadId]: newLead,
        },
      });
    } else {
      alert("Please fill out all fields.");
    }
  };

  const onSaveLead = (updatedLead) => {
    setData((prevData) => {
      const updatedLeads = {
        ...prevData.leads,
        [updatedLead.id]: updatedLead,
      };
      return { ...prevData, leads: updatedLeads };
    });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Get colors based on the current theme

  // Filter leads based on search query
  const filteredLeads = Object.values(data.leads).filter(
    (lead) =>
      lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      <Box m="20px">
        <Box
          // m="40px 0 0 0"
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
              sx={{ ml: 2, padding: "10px 0px", width: "25%", display: "flex" }}
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
                    sx={{ backgroundColor: colors.primary[500] }} // Use theme colors
                  />
                </Box>
              ))}
            </Box>
          ) : (
            // Render Kanban View
            <DragDropContext onDragEnd={onDragEnd}>
              <div
                style={{ display: "flex", overflowX: "auto", width: "100%" }}
              >
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
                          width: "25%",
                        }} // Use theme colors
                      >
                        <PipelineColumn
                          title={column.title}
                          onAdd={() => addNewLead(column.id)}
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
                                      backgroundColor: colors.primary[500], // Use theme colors
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
              onSave={onSaveLead}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default NewKanbanBoard;
