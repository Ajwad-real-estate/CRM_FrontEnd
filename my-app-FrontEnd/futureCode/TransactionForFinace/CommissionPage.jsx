import  { useState } from 'react';
import agentsData from '../../data/agentsData';
import transactionsData from '../../data/transactionsData';
import AgentCard from './AgentCard';
import TransactionList from './TransactionList';

const CommissionPage = () => {
    const [selectedAgentId, setSelectedAgentId] = useState(null);

    const handleAgentClick = (agentId) => {
        setSelectedAgentId(agentId);
    };

    const filteredTransactions = transactionsData.filter(
        transaction => transaction.agentId === selectedAgentId
    );

    return (
        <div>
            <h1>Finance Agent Commission Payment</h1>
            <div className="project-cards">
                {agentsData.map(agent => (
                    <AgentCard key={agent.id} agent={agent} onClick={handleAgentClick} />
                ))}
            </div>
            {selectedAgentId && <TransactionList transactions={filteredTransactions} />}
        </div>
    );
};

export default CommissionPage;
