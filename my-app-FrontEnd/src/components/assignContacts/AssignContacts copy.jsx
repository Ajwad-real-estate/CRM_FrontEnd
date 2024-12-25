import { Card, CardContent, CardHeader, Checkbox, Input, Button, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Loader = () => <div className="loader">Loading...</div>; // Placeholder for a loading spinner
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const AssignContacts = () => {
 const [clients, setClients] = useState([]);
 const [agents, setAgents] = useState([]);
 const [selectedClients, setSelectedClients] = useState([]);
 const [loading, setLoading] = useState(false);
 const [submitting, setSubmitting] = useState(false);
 const [clientLen, setClientLen] = useState(false);


 useEffect(() => {
  fetchClients();
  fetchAgents();
 }, []);

 const fetchClients = async () => {
  setLoading(true);
  try {
   const response = await fetch(apiUrl + '/api/clients?assigned=false', {
    headers: {
     Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
    },
   });
   if (!response.ok) throw new Error('Failed to fetch clients');
   const data = await response.json();
   setClients(data);
   setClientLen(clients.length)
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
     Authorization: `Bearer ${Cookies.get('accessToken')}`, // Assuming token is stored in cookies
    },
   });
   const data = await response.json();
   console.log((data.agents))
   console.log((data.agents).length)
   const formattedAgents = data.agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    quantity: parseInt(clients.length / data.agents.length, 10),
   }));
   setAgents(formattedAgents);
   
  } catch (error) {
   console.error('Error fetching agents:', error);
  }
  setLoading(false);
 };







 const handleClientToggle = (clientId) => {
  setSelectedClients((prev) =>
   prev.includes(clientId)
    ? prev.filter((id) => id !== clientId)
    : [...prev, clientId]
  );
 };

 const handleQuantityChange = (agentId, value) => {
  setAgents((prev) =>
   prev.map((agent) =>
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

   const response = await fetch('/api/clients/assign', {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
   });

   if (response.ok) {
    // Reset form and refresh clients
    setSelectedClients([]);
    setAgents(agents.map((agent) => ({ ...agent, quantity: 0 })));
    await fetchClients();
   } else {
    console.error("Failed to assign clients");
   }
  } catch (error) {
   console.error('Error assigning clients:', error);
  }
  setSubmitting(false);
 };
 console.log(clients)
 console.log(clients.length)
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
        {/* Clients Section */}
        <div className="grid gap-4">
         <h3 className="text-lg font-medium">Select Clients</h3>
         <div className="grid gap-2">
          <Box sx={{ display: "flex" }}>

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

              <label htmlFor={client.id} className="text-sm" >
               {client.phone_numbers[0] || client.email}
              </label>
             </Box>
            </div>
           ))}
          </Box>
         </div>
        </div>

        {/* Agents Section */}
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
        {/* Submit Button */}
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
