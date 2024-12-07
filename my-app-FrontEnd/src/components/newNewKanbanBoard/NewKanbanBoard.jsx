import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PipelineColumn from './PipelineColumn';
import LeadCard from './LeadCard';
import LeadModal from './LeadModal';
import { pipelineData } from '../../data/sampleData';

import { Box, Typography, useMediaQuery, Button, TextField } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../Header';
import LeadSidebar from './LeadSidebar'; // Import the new LeadSidebar component

const transformData = (pipelineData) => {
  const columns = {};
  const leads = {};
  pipelineData.forEach((pipeline) => {
    columns[pipeline.id] = {
      id: pipeline.id,
      title: pipeline.title,
      leadIds: pipeline.leads.map((lead) => lead.id.toString()),
    };
    pipeline.leads.forEach((lead) => {
      leads[lead.id] = lead;
    });
  });
  return { columns, leads };
};

const NewNewKanbanBoard = () => {
  const initialData = transformData(pipelineData);
  const [data, setData] = useState(initialData);
  const [selectedLead, setSelectedLead] = useState(null); // Sidebar state

  const handleCardClick = (lead) => {
    setSelectedLead(lead); // Set the lead for the sidebar
  };

  const handleCloseSidebar = () => {
    setSelectedLead(null); // Close the sidebar
  };

  return (
    <Box display="flex" position="relative" height="100vh">
      {/* Main Kanban Board */}
      <Box flexGrow={1} overflow="hidden">
        <DragDropContext onDragEnd={() => { }}>
          <Box display="flex" overflowX="auto">
            {Object.values(data.columns).map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps} width="300px" mx={2}>
                    <PipelineColumn title={column.title}>
                      {column.leadIds.map((leadId, index) => (
                        <Draggable key={leadId} draggableId={leadId} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              mb={2}
                              onClick={() => handleCardClick(data.leads[leadId])} // Open sidebar on click
                            >
                              <LeadCard lead={data.leads[leadId]} />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </PipelineColumn>
                  </Box>
                )}
              </Droppable>
            ))}
          </Box>
        </DragDropContext>
      </Box>

      {/* Sidebar */}
      {selectedLead && (
        <LeadSidebar lead={selectedLead} onClose={handleCloseSidebar} />
      )}
    </Box>
  );
};

export default NewNewKanbanBoard;
