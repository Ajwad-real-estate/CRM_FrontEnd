import { Card, CardContent, CardHeader, Checkbox, Input, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

const Loader = () => <div className="loader">Loading...</div>;
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const AssignContacts = () => {
 const [clients, setClients] = useState([]);
 const [agents, setAgents] = useState([]);
 const [selectedClients, setSelectedClients] = useState([]);
 const [loading, setLoading] = useState(false);
 const [submitting, setSubmitting] = useState(false);
 const isNonMobile = useMediaQuery("(min-width:600px)");
 const theme = useTheme();
 const colors = tokens(theme.palette.mode);

 useEffect(() => {
  fetchClients();
  fetchAgents();
 }, []);

 // Update agent quantities whenever selected clients change
 useEffect(() => {
  if (agents.length > 0) {
   const clientsPerAgent = Math.floor(selectedClients.length / agents.length);
   const remainder = selectedClients.length % agents.length;

   setAgents(prev => prev.map((agent, index) => ({
    ...agent,
    // Add one extra to the first 'remainder' agents if there's uneven distribution
    quantity: clientsPerAgent + (index < remainder ? 1 : 0)
   })));
  }
 }, [selectedClients.length]);

 const fetchClients = async () => {
  setLoading(true);
  try {
   const response = await fetch(apiUrl + '/api/clients?assigned=false', {
    headers: {
     Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
   });
   if (!response.ok) throw new Error('Failed to fetch clients');
   const data = await response.json();
   setClients(data);
  } catch (error) {
   console.error('Error fetching clients:', error);
  }
  setLoading(false);
 };

 const fetchAgents = async () => {
  setLoading(true);
  try {
   const response = await fetch(apiUrl + '/api/get-sales-agents-details', {
    headers: {
     Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
   });
   const data = await response.json();
   const formattedAgents = data.agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    quantity: 0,
   }));
   setAgents(formattedAgents);
  } catch (error) {
   console.error('Error fetching agents:', error);
  }
  setLoading(false);
 };

 const handleClientToggle = (clientId) => {
  setSelectedClients(prev =>
   prev.includes(clientId)
    ? prev.filter(id => id !== clientId)
    : [...prev, clientId]
  );
 };

 const handleQuantityChange = (agentId, value) => {
  setAgents(prev =>
   prev.map(agent =>
    agent.id === agentId ? { ...agent, quantity: parseInt(value) || 0 } : agent
   )
  );
 };

 const handleAssign = async () => {
  if (selectedClients.length === 0) return;

  const totalQuantity = agents.reduce((sum, agent) => sum + agent.quantity, 0);
  if (totalQuantity > selectedClients.length) {
   alert("Total assigned quantity cannot exceed the number of selected clients.");
   return;
  }

  setSubmitting(true);
  try {
   const payload = {
    agents: agents.map(({ id, quantity }) => ({ id, quantity })),
    clients: selectedClients
   };

   const response = await fetch(apiUrl + '/api/clients/assign', {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
    body: JSON.stringify(payload)
   });

   if (response.ok) {
    setSelectedClients([]);
    setAgents(prev => prev.map(agent => ({ ...agent, quantity: 0 })));
    await fetchClients();
   } else {
    console.error("Failed to assign clients");
   }
  } catch (error) {
   console.error('Error assigning clients:', error);
  }
  setSubmitting(false);
 };

 const handleSelectAllClients = () => {
  const allClientIds = clients.map(client => client.id);
  setSelectedClients(allClientIds);
 };


 const columns = [
  // { field: "id", headerName: "ID", flex: 0.5 },
  {
   field: "name",
   headerName: "Name",
   flex: 1,
   cellClassName: "name-column--cell",
  },
  // {
  //  field: "age",
  //  headerName: "Age",
  //  type: "number",
  //  headerAlign: "left",
  //  align: "left",
  // },
  {
   field: "phone_numbers",
   headerName: "Phone Numbers",
   flex: 1,
   renderCell: (params) => {
    return params.value ? params.value.join(", ") : "-";
   }
  },
  {
   field: "email",
   headerName: "Email",
   flex: 1,
  },
  // {
  //  field: "street",
  //  headerName: "Street",
  //  flex: 1,
  // },
  // {
  //  field: "budget",
  //  headerName: "Budget",
  //  flex: 1,
  //  type: "number",
  //  renderCell: (params) => {
  //   return params.value ? `$${params.value.toLocaleString()}` : "-";
  //  }
  // },
  // {
  //  field: "status",
  //  headerName: "Status",
  //  flex: 1,
  // },
  // {
  //  field: "type",
  //  headerName: "Type",
  //  flex: 1,
  // },
  // {
  //  field: "channel",
  //  headerName: "Channel",
  //  flex: 1,
  // }
 ];

 return (
  <div className="p-4 max-w-4xl mx-auto">
   <Card>
    <CardHeader title="Assign Contacts to Agents" />
    <CardContent>
     {loading ? (
      <div className="flex justify-center p-4">
       <Loader />
      </div>
     ) : (
      <>

       <div className="space-y-4">
        <div className="grid gap-4">
         <h3 className="text-lg font-medium">
          Select Clients ({selectedClients.length} selected)
         </h3>
         <div className="grid gap-2">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
           <Button
            variant="outlined"
            color="primary"
            onClick={handleSelectAllClients}
            disabled={clients.length === selectedClients.length}
           >
            Select All Clients
           </Button>
           <Box m="20px">
            <Box
             m="40px 0 0 0"
             height="75vh"
             sx={{
              "& .MuiDataGrid-root": {
               border: "none",
               fontSize: isNonMobile ? "14px" : "8px",
              },
              "& .MuiDataGrid-cell": {
               borderBottom: "none",
               cursor: "pointer",
              },
              "& .name-column--cell": {
               color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
               backgroundColor: colors.blueAccent[700],
               borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
               backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
               borderTop: "none",
               backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
               color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
               color: `${colors.grey[100]} !important`,
              },
             }}
            >
             <DataGrid
              checkboxSelection
              rows={clients}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              loading={loading}
              autoHeight
             // onRowClick={handleRowClick}
             />
            </Box>
           </Box>

           {clients.map((client) => (
            <div key={client.id} className="flex items-center space-x-2">
             <Checkbox
              checked={selectedClients.includes(client.id)}
              onChange={() => handleClientToggle(client.id)}
             />
             <Box sx={{ ml: '10px' }}>
              <label htmlFor={client.id} className="text-sm">
               {client.name || client.id}
              </label>
             </Box>
             <Box sx={{ ml: '10px' }}>
              <label htmlFor={client.id} className="text-sm">
               {client.phone_numbers?.[0] || client.email}
              </label>
             </Box>
            </div>
           ))}
          </Box>
         </div>
        </div>

        <div className="grid gap-4">
         <h3 className="text-lg font-medium">Assign to Agents</h3>
         <div className="grid gap-4">
          {agents.map((agent) => (
           <div key={agent.id} className="flex items-center space-x-4">
            <span className="flex-grow">{agent.name}</span>
            <Input
             type="number"
             min="0"
             value={agent.quantity}
             onChange={(e) => handleQuantityChange(agent.id, e.target.value)}
             className="w-24"
            />
           </div>
          ))}
         </div>
        </div>

        <Button
         variant="contained"
         color="primary"
         onClick={handleAssign}
         disabled={submitting || selectedClients.length === 0}
         className="w-full"
        >
         {submitting ? "Assigning..." : "Assign Clients"}
        </Button>
       </div>
      </>
     )}
    </CardContent>
   </Card>
  </div>
 );
};

export default AssignContacts;
