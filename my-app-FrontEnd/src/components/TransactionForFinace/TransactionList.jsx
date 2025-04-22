const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            Amount: ${transaction.amount}, Status: {transaction.status}, Date:{" "}
            {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
