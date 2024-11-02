// components/TransactionList.js
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([
        { _id: '1', agentId: { name: 'Agent A' }, amount: 100, status: 'Completed' },
        { _id: '2', agentId: { name: 'Agent B' }, amount: 200, status: 'Pending' },
        { _id: '3', agentId: { name: 'Agent C' }, amount: 150, status: 'Failed' }
    ]);


    return (
        
        <div>



            <div className="container">
                <div className="project-cards">
                    {/* {Object.keys(projectsData).map((projectName) => (
                        <Link key={projectName} to={`/projects/${projectName}`} className="project-card">
                            <ProjectCard projectName={projectName} />
                        </Link>
                    ))} */}
                </div>
            




            <h2>Commission Transactions</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>
                        {transaction.agentId.name} - ${transaction.amount} - {transaction.status}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default TransactionList;
