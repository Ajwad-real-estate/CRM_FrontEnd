// src/components/KanbanBoard.jsx
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PipelineColumn from "./PipelineColumn";
import LeadCard from "./LeadCard";
const initialData = {
  columns: {
    new: { id: "new", title: "New", leadIds: ["1", "2"] },
    qualified: { id: "qualified", title: "Qualified", leadIds: ["3", "4"] },
    reservation: { id: "reservation", title: "reservation", leadIds: ["5"] },
    done_deal: { id: "done_deal", title: "done_deal", leadIds: ["6"] },
  },

  leads: {
    1: { id: "1", title: "Distributor Contract", amount: "19,800 LE" },
    2: { id: "2", title: "Global Solutions", amount: "3,800 LE" },
    3: { id: "3", title: "Quote for 600 Chairs", amount: "22,500 LE" },
    4: { id: "4", title: "5 VP Chairs", amount: "5,600 LE" },
    5: { id: "5", title: "Info about services", amount: "25,000 LE" },
    6: { id: "6", title: "Need 20 Desks", amount: "60,000 LE" },
  },
};

const KanbanBoard = () => {
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

    if (!destination) return; // Do nothing if the item is dropped outside

    // Do nothing if the lead is dropped in the same column at the same index
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    // Moving within the same column
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
      // Moving to a different column
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

  return (
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
                <PipelineColumn title={column.title}>
                  {column.leadIds.map((leadId, index) => (
                    <Draggable key={leadId} draggableId={leadId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginBottom: "8px",
                          }}
                        >
                          <LeadCard lead={data.leads[leadId]} />
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
  );
};

export default KanbanBoard;
