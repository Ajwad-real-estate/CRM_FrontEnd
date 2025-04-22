// components/TransactionForm.js
import { useState } from "react";

const TransactionForm = () => {
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = { agentId, amount, description };
    console.log("Transaction Data:", transactionData);
    alert("Transaction recorded successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Agent ID:
        <input
          type="text"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Record Transaction</button>
    </form>
  );
};

export default TransactionForm;
