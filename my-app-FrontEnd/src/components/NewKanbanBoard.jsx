// src/components/NewKanbanBoard.jsx
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PipelineColumn from "./PipelineColumn";
import LeadCard from "./LeadCard";
import LeadModal from "./LeadModal";
import { pipelineData } from "../data/sampleData";

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

  const handleDoubleClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
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

  // Function to add a new lead
  const addNewLead = (columnId) => {
    const title = prompt("Enter lead title:");
    const value = prompt("Enter lead value:");
    const company = prompt("Enter company name:");
    const tags = prompt("Enter tags (comma separated):").split(",");

    if (title && value) {
      const newLeadId = (Object.keys(data.leads).length + 1).toString();
      const newLead = {
        id: newLeadId,
        title,
        value,
        company,
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

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {Object.values(data.columns).map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ margin: "0 8px", minWidth: 250 }}
                >
                  <PipelineColumn
                    title={column.title}
                    onAdd={() => addNewLead(column.id)}
                  >
                    {column.leadIds.map((leadId, index) => (
                      <Draggable
                        key={leadId}
                        draggableId={leadId}
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
                            }}
                            onDoubleClick={() =>
                              handleDoubleClick(data.leads[leadId])
                            }
                          >
                            <LeadCard
                              lead={data.leads[leadId]}
                              // onAdd={() => addNewLead(column.id)} // Pass columnId to addNewLead
                            />
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
      {isModalOpen && (
        <LeadModal lead={selectedLead} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default NewKanbanBoard;
