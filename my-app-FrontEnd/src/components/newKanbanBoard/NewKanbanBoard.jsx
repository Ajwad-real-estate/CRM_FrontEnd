import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PipelineColumn from './PipelineColumn';
import LeadCard from './LeadCard';
import LeadModal from './LeadModal';
import { pipelineData } from '../../data/sampleData';

import { Box, Typography, useTheme, useMediaQuery, Button, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

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
                company: lead.company || '',
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
    const [searchQuery, setSearchQuery] = useState('');
    const [isListView, setIsListView] = useState(false); // State for view mode

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

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

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
        const title = prompt('Enter lead title:');
        const value = prompt('Enter lead value:');
        const company = prompt('Enter company name:');
        const tags = prompt('Enter tags (comma separated):').split(',');

        if (title && value) {
            const newLeadId = (Object.keys(data.leads).length + 1).toString();
            const newLead = {
                id: parseInt(newLeadId, 10),
                title,
                value,
                company,
                tags: tags.map(tag => tag.trim()),
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
            alert('Please fill out all fields.');
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
    const colors = tokens(theme.palette.mode);

    // Filter leads based on search query
    const filteredLeads = Object.values(data.leads).filter(lead =>
        lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Box m="20px">
                <Header title="Contacts" subtitle="Manage your tasks effectively" />
                <Box
                    m="40px 0 0 0"
                    height="100%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        fontSize: isNonMobile ? '14px' : '8px',
                        backgroundColor: colors.primary[400],
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%', justifyContent: 'space-between' }}> */}

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between'}}>
                            <TextField
                                variant="outlined"
                                label="Search Leads"
                                fullWidth
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ mr: 2, padding: '10px 0px' , width: '50%', display: 'flex'}}
                            />
                            <Button
                                variant="contained"
                                onClick={() => setIsListView(!isListView)}
                                sx={{ ml: 2, padding: '10px 0px', width: '25%', display: 'flex' }}
                                
                                >
                                {isListView ? 'Switch to Kanban View' : 'Switch to List View'}
                            </Button>
                                {/* </Box> */}
                        </Box>
                    {isListView ? (
                        // Render List View
                        <Box>
                            {filteredLeads.map((lead) => (
                                <Box key={lead.id} sx={{ mb: 2 }}>
                                    <LeadCard
                                        lead={lead}
                                        onDoubleClick={() => handleDoubleClick(lead)}
                                    />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        // Render Kanban View
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div style={{ display: 'flex', overflowX: 'auto' }}>
                                {Object.values(data.columns).map((column) => (
                                    <Droppable key={column.id} droppableId={column.id}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{ margin: '0 8px', minWidth: 250 }}
                                            >
                                                <PipelineColumn title={column.title} onAdd={() => addNewLead(column.id)}>
                                                    {filteredLeads.filter(lead => column.leadIds.includes(lead.id.toString())).map((leadId, index) => (
                                                        <Draggable key={leadId.id} draggableId={leadId.id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                        marginBottom: '8px',
                                                                    }}
                                                                    onDoubleClick={() => handleDoubleClick(leadId)}
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

