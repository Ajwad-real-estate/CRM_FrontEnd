// components/Transaction/Agents.jsx
import React, { useState } from 'react';
import AgentCard from './AgentCard';
import TransactionList from './TransactionList';

const Agents = ({ agents }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent); // Set the selected agent to fetch transactions
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Agents</h1>
      </div>
      <div className="project-cards">
        {agents.map((agent) => (
          <div key={agent.id} onClick={() => handleAgentClick(agent)}>
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>
      {selectedAgent && (
        <div className="transactions">
          <h2>Transactions for {selectedAgent.name}</h2>
          <TransactionList agentId={selectedAgent.id} />
        </div>
      )}
    </div>
  );
};

export default Agents;
