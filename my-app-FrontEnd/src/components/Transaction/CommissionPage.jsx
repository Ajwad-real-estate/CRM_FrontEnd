// pages/CommissionPage.js
import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import AgentCard from './AgentCard';
import Agents from './Agents';

const CommissionPage = () => (
    <div>
        <h1>Finance Agent Commission Payment</h1>
        <TransactionForm />
        <Agents/>
        {/* <AgentCard /> */}
        <TransactionList />
    </div>
);

export default CommissionPage;
