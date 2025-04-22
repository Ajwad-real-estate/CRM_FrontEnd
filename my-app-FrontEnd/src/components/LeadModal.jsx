// src/components/LeadModal.jsx
import React from 'react';

const LeadModal = ({ lead, onClose }) => {
    if (!lead) return null; // Return null if no lead is passed

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>{lead.title}</h2>
                <p><strong>Value:</strong> {lead.amount}</p>
                <p><strong>Company:</strong> {lead.company || 'N/A'}</p>
                <p><strong>Tags:</strong> {lead.tags.join(', ') || 'N/A'}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        background: 'black',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default LeadModal;
