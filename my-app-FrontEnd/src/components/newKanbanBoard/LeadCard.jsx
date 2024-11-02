// src/components/LeadCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LeadCard = ({ lead }) => (
    <Card sx={{ padding: 1, marginBottom: 2 }}>
        <CardContent>
            <Typography variant="subtitle1">{lead.title}</Typography>
            <Typography variant="body2" color="text.secondary">
                <p>{lead.amount}</p>
                <p>{lead.company}</p>
                <p>{lead.tags}</p>
                {/* <p>{lead}</p> */}
            </Typography>
        </CardContent>
    </Card>
);

export default LeadCard;
