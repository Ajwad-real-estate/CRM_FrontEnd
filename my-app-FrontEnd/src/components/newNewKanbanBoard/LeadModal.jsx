import { useState, useEffect } from "react";

const LeadModal = ({ lead, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [company, setCompany] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (lead) {
      setTitle(lead.title);
      setAmount(lead.amount);
      setCompany(lead.company || "");
      setTags(lead.tags.join(", ") || "");
    }
  }, [lead]);

  const handleSave = () => {
    const updatedLead = {
      ...lead,
      title,
      amount,
      company,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    onSave(updatedLead); // Call the onSave function with updated lead
    onClose();
  };

  if (!lead) return null; // Return null if no lead is passed

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h2>Edit Lead</h2>
        <p>
          <strong>Title:</strong>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </p>
        <p>
          <strong>Value:</strong>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </p>
        <p>
          <strong>Company:</strong>
          <input value={company} onChange={(e) => setCompany(e.target.value)} />
        </p>
        <p>
          <strong>Tags:</strong>
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </p>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "black",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export default LeadModal;
