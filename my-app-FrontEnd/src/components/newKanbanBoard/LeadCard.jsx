import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import TagIcon from '@mui/icons-material/Label';

const LeadCard = ({ lead }) => (
    <Card sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{lead.title}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
                {lead.company || 'Company not provided'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                <PhoneIcon sx={{ marginRight: 0.5 }} />
                <Typography variant="body2">
                    <a href={`tel:${lead.phoneNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {lead.phoneNumber || 'Phone number not provided'}
                    </a>
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                <EmailIcon sx={{ marginRight: 0.5 }} />
                <Typography variant="body2">
                    <a href={`mailto:${lead.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {lead.email || 'Email not provided'}
                    </a>
                </Typography>
            </Box>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                Amount: {typeof lead.amount === 'number' ? `$${lead.amount.toFixed(2)}` : 'Amount not provided'}
            </Typography>
            <Box sx={{ marginTop: 1 }}>
                {lead.tags && lead.tags.length > 0 ? (
                    lead.tags.map((tag, index) => (
                        <Chip key={index} label={tag} icon={<TagIcon />} sx={{ marginRight: 0.5 }} />
                    ))
                ) : (
                    <span>No tags</span>
                )}
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <Button variant="outlined" color="secondary" sx={{ marginRight: 1 }}>Edit</Button>
                <Button variant="outlined" color="secondary">Delete</Button>
            </Box>
        </CardContent>
    </Card>
);

LeadCard.propTypes = {
    lead: PropTypes.shape({
        title: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Allow string or number
        company: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
};

export default LeadCard;
