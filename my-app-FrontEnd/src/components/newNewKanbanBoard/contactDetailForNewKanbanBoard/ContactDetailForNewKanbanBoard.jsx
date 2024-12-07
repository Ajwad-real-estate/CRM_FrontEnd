import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Divider, TextField, Autocomplete, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Header from '../../Header';
const actions = [
 { value: 'follow_up', label: 'Follow Up' },
 { value: 'meeting', label: 'Meeting' },
 { value: 'cancellation', label: 'Cancellation' },
 // ... other actions
];
// Sample data for demonstration purposes
const contactData = [
 { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: 'Example Inc.' },
 { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', company: 'Sample LLC' },
 { id: '3', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567', company: 'Tech Solutions' },
 { id: '4', name: 'Bob Brown', email: 'bob@example.com', phone: '444-987-6543', company: 'Innovatech' },
 { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', phone: '333-456-7890', company: 'Creative Works' },
 { id: '6', name: 'Diana Evans', email: 'diana@example.com', phone: '222-654-3210', company: 'Enterprise Corp' },
 { id: '7', name: 'Eve Foster', email: 'eve@example.com', phone: '111-123-4567', company: 'Global Ventures' },
 { id: '8', name: 'Frank Green', email: 'frank@example.com', phone: '999-987-6543', company: 'NextGen Solutions' },
 { id: '9', name: 'Grace Harris', email: 'grace@example.com', phone: '888-456-7890', company: 'Future Innovations' },
 { id: '10', name: 'Henry Irving', email: 'henry@example.com', phone: '777-654-3210', company: 'Tech Pioneers' },
 // Add more contacts as needed
];

const ContactDetailForNewKanbanBoard = () => {
 const { ContactDetail } = useParams(); // Get the contact ID from the URL
 const navigate = useNavigate(); // Hook to navigate back

 // Find the contact in the sample data
 const contact = contactData.find(c => c.id === ContactDetail);

 // Handle case when contact is not found
 if (!contact) {
  return (
   <Typography variant="h6" color="error">Contact not found</Typography>
  );
 }

 const [editableContact, setEditableContact] = useState({
  ...contact,
  notes: 'Initial note for the contact',
  contactInfo: {
   contactName: 'John Doe',
   title: 'Manager',
   mobile: '123-456-7890',
   address: '123 Main St, Anytown, USA',
   website: 'http://example.com',
   source: 'Referral',
   referredBy: 'Jane Smith',
   daysToAssign: '5',
   daysToClose: '10'
  },
  expectedRevenue: '10000',
  probability: '75'
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setEditableContact((prev) => ({ ...prev, [name]: value }));
 };

 const handleSave = () => {
  // Handle saving logic here, such as sending data to a backend or updating state
  console.log('Saved contact:', editableContact);
  navigate(-1); // Navigate back after saving
 };
 // Action Select

 // const handleChangeOnAction = (event) => {
 //  setSelectedCountry(event.target.value);
 // };
 // const [selectedAction, setSelectedAction] = useState('');
 const [selectedAction, setSelectedAction] = useState(editableContact.action || '');

 const handleActionChange = (event) => {
  setSelectedAction(event.target.value);
  // handleChange({ ...editableContact, action: event.target.value }); // Update contact object with selected action

  // Implement action logic here
  if (event.target.value === 'follow_up') {
   console.log('Follow Up action triggered');
   // Perform follow-up logic (e.g., send email, create task)
  } else if (event.target.value === 'meeting') {
   console.log('Meeting action triggered');
   // Schedule a meeting
  } else if (event.target.value === 'cancellation') {
   console.log('Cancellation action triggered');
   // Handle cancellation logic
  }
  // ... handle other actions
 };




 return (
 
   <Box m="20px">
    <Header title="Contact Detail" subtitle="View and manage contact information" />
    <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
     <Card sx={{ width: '100%', boxShadow: 3 }}>
      <CardContent>
       <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{editableContact.name}</Typography>
       <Divider sx={{ mb: 2 }} />
       <Box display="flex" flexDirection="column" gap={1}>
        <TextField
         label="Company"
         name="company"
         variant="outlined"
         value={editableContact.contactInfo.companyName}
         onChange={handleChange}
         sx={{ marginBottom: 2, width: '45%' }}
        />
        <TextField
         label="Email"
         name="email"
         variant="outlined"
         value={editableContact.email}
         onChange={handleChange}
         sx={{ marginBottom: 2, width: '45%' }}
        />
        <TextField
         label="Phone"
         name="phone"
         variant="outlined"
         value={editableContact.phone}
         onChange={handleChange}
         sx={{ marginBottom: 2, width: '45%' }}
        />
        <TextField
         label="Expected Revenue"
         name="expectedRevenue"
         variant="outlined"
         value={editableContact.expectedRevenue}
         onChange={handleChange}
         sx={{ marginBottom: 2, width: '45%' }}
        />
        <TextField
         label="Probability"
         name="probability"
         variant="outlined"
         value={editableContact.probability}
         onChange={handleChange}
         sx={{ marginBottom: 2, width: '45%' }}
        />
        <Divider sx={{ my: 2 }} />

        <FormControl sx={{ width: '45%' }}>
         <InputLabel id="action-label">Action</InputLabel>
         <Select
          labelId="action-label"
          id="action"
          value={selectedAction}
          label="Action"
          onChange={handleActionChange}

         >
          {actions.map((action) => (
           <MenuItem key={action.value} value={action.value}>
            {action.label}
           </MenuItem>
          ))}
         </Select>
        </FormControl>
       
       </Box>
       <Divider sx={{ my: 2 }} />

       <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>Contact Information:</Typography>
       <Typography>Contact Name: {editableContact.contactInfo.contactName}</Typography>
       <Typography>Title: {editableContact.contactInfo.title}</Typography>
       <Typography>Mobile: {editableContact.contactInfo.mobile}</Typography>
       <Typography>Address: {editableContact.contactInfo.address}</Typography>
       <Typography>Website: {editableContact.contactInfo.website}</Typography>
       <Typography>Source: {editableContact.contactInfo.source}</Typography>
       <Typography>Referred By: {editableContact.contactInfo.referredBy}</Typography>
       <Typography>Days to Assign: {editableContact.contactInfo.daysToAssign}</Typography>
       <Typography>Days to Close: {editableContact.contactInfo.daysToClose}</Typography>

       <Divider sx={{ my: 2 }} />
       <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>Notes:</Typography>
       <TextField
        label="Add a note"
        name="notes"
        variant="outlined"
        multiline
        rows={4}
        value={editableContact.notes}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
       />
       <Box display="flex" justifyContent="space-between" sx={{ marginTop: 3 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
       </Box>
      </CardContent>
     </Card>
    </Box >
   </Box>




  // </Box >
 );
};

export default ContactDetailForNewKanbanBoard;
