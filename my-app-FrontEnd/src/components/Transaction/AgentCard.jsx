import React from 'react';
import './InventoryPage.css';

const AgentCard = ({ agent, onClick }) => {
  return (
    <div className="project-card" onClick={() => onClick(agent.id)}>
      <h3>{agent.name}</h3>
    </div>
  );
};

export default AgentCard;
