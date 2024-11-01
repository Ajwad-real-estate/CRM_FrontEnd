// src/components/LeadCard.jsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LeadCard = ({ lead, onAdd }) => (
    <Card sx={{ padding: 1, marginBottom: 2 }}>
        <CardContent>
            <Typography variant="subtitle1">{lead.title}</Typography>
            <Typography variant="body2" color="text.secondary">
                <h4>{lead.title}</h4>
                <p>{lead.amount}</p>

                {lead.amount}
                <button
                    onClick={onAdd}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    +
                </button>
            </Typography>
        </CardContent>
    </Card>
);

export default LeadCard;
