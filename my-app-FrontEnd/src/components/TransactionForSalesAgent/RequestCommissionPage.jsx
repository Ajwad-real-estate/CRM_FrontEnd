import { useState } from 'react';
import commissionRequests from '../../data/commissionRequests';
import pipelineData from '../../data/sampleData';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import './RequestCommissionPage.css';

const RequestCommissionPage = () => {
  const [requests, setRequests] = useState(commissionRequests);
  const [newRequest, setNewRequest] = useState({
    agentName: 'Ahmed Elsisy -0-',
    date: new Date().toISOString().slice(0, 10),  // Auto-set today's date
    amount: '',
    notes: '',
  });

  const wonLeads = pipelineData.find((stage) => stage.id === 'won')?.leads || [];
  const [selectedLead, setSelectedLead] = useState('');

  const totalWonValue = wonLeads.reduce((sum, lead) => {
    const numericValue = parseFloat(lead.value.replace(' LE', '').replace(',', ''));
    return sum + (isNaN(numericValue) ? 0 : numericValue);
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleLeadChange = (event) => {
    setSelectedLead(event.target.value);
  };

  const handleSubmit = () => {
    const requestWithId = { ...newRequest, id: (requests.length + 1).toString(), status: "Pending" };
    setRequests([...requests, requestWithId]);
    setNewRequest({
      agentName: 'Ahmed Elsisy -1-',
      date: new Date().toISOString().slice(0, 10),  // Reset to today's date
      amount: '',
      notes: '',
    });
  };

  return (
    <Box className="request-commission-page">
      <Typography variant="h4">Request Commission</Typography>

      <Box className="ratio-box">
        <Typography variant="h6">Won Leads Summary</Typography>
        <Typography>Total Won Leads: {wonLeads.length}</Typography>
        <Typography>Total Won Value: {totalWonValue.toLocaleString()} LE</Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1">Select Lead:</Typography>
        <Select
          value={selectedLead}
          onChange={handleLeadChange}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>Select Lead</MenuItem>
          {wonLeads.map((lead) => (
            <MenuItem key={lead.id} value={lead.id}>
              {lead.title} - {lead.value}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box component="form" className="request-form">
        {/* <TextField
          label="Agent Name"
          name="agentName"
          value={newRequest.agentName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        /> */}
        <Box
          label="Agent Name"
          name="agentName"
          value={newRequest.agentName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <p>Sales Manager : Ahmed Elsisy</p>
        </Box>

        <TextField
          label="Commission Amount"
          name="amount"
          type="number"
          value={newRequest.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notes"
          name="notes"
          value={newRequest.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!newRequest.amount || !selectedLead || !newRequest.notes}
        >Submit Request
        </Button>
      </Box>

      <Box className="requests-list" mt={4}>
        <Typography variant="h5">Submitted Requests</Typography>
        {requests.map((request) => (
          <Box key={request.id} className="request-item">
            <Typography><strong>Agent:</strong> {request.agentName}</Typography>
            <Typography><strong>Date:</strong> {request.date}</Typography>
            <Typography><strong>Amount:</strong> {request.amount} LE</Typography>
            <Typography><strong>Status:</strong> {request.status}</Typography>
            <Typography><strong>Notes:</strong> {request.notes}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RequestCommissionPage;
