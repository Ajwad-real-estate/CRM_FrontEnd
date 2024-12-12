import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  useTheme,
} from "@mui/material";
import styled from "styled-components";
import FormRow from "../../../../ui/FormRow";
import { useState } from "react";
import { tokens } from "../../../../theme";
function parseValue(value) {
  if (!value) return 0; // Return 0 for empty or undefined input
  const cleanedValue = value.replace(/[^\d.]/g, ""); // Remove non-numeric characters except '.'
  return parseFloat(cleanedValue) || 0; // Convert to number, or default to 0
}

function formatTags(tags) {
  if (!Array.isArray(tags)) return ""; // Handle cases where tags is not an array
  return tags
    .map(
      (tag) => `#${tag.charAt(0).toUpperCase()}${tag.slice(1).toLowerCase()}`
    )
    .join(" "); // Format each tag and join with a space
}

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 80%;
`;

function EditPage({ lead, onUpdate }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [title, setTitle] = useState(lead.title);
  const [company, setCompany] = useState(lead.company || "");
  const [phoneNumber, setPhoneNumber] = useState(Number(lead.phoneNumber));
  const [email, setEmail] = useState(lead.email);
  const [amount, setAmount] = useState(parseValue(lead.amount));
  const [tags, setTags] = useState(formatTags(lead.tags));
  const textfieldStyling = {
    width: "100%",
  };

  // Validation Handlers
  const handleInputChange = (setter, label) => (e) => {
    const value = e.target.value;

    // Apply validations based on the label
    if (label === "Phone Number") {
      // Allow only numeric input for Phone Number
      if (/^\d*$/.test(value)) setter(value);
    } else if (label === "Email") {
      // Allow valid email input
      setter(value);
    } else if (label === "Amount") {
      // Allow only numeric input for Amount
      if (/^\d*\.?\d*$/.test(value)) setter(value);
    } else {
      // Default case for other fields
      setter(value);
    }
  };
  const handleSubmit = () => {
    const updatedLead = {
      ...lead,
      title,
      company,
      phoneNumber,
      email,
      amount: `${amount} LE`,
      tags: tags.split(" ").map((tag) => tag.replace("#", "")), // Convert back to array
    };

    onUpdate(updatedLead); // Call parent function to update the data
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Form>
        <FormRow label="Title" editSize>
          <TextField
            value={title}
            onChange={handleInputChange(setTitle, "Title")}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Company" editSize>
          <TextField
            value={company}
            onChange={handleInputChange(setCompany, "Company")}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Phone Number" editSize>
          <TextField
            value={phoneNumber}
            onChange={handleInputChange(setPhoneNumber, "Phone Number")}
            sx={textfieldStyling}
            inputProps={{ maxLength: 15 }}
          />
        </FormRow>
        <FormRow label="Email" editSize>
          <TextField
            value={email}
            onChange={handleInputChange(setEmail, "Email")}
            sx={textfieldStyling}
            type="email"
          />
        </FormRow>
        <FormRow label="Amount" editSize>
          <OutlinedInput
            value={amount}
            onChange={handleInputChange(setAmount, "Amount")}
            id="outlined-adornment-amount"
            endAdornment={<InputAdornment position="end">LE</InputAdornment>}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Tags" editSize>
          <TextField
            value={tags}
            onChange={handleInputChange(setTags, "Tags")}
            sx={textfieldStyling}
          />
        </FormRow>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "transparent",
              transition: "all 0.2s ease-in-out",
              fontSize: "1.3rem",
              color: colors.grey[200],
              border: `3px solid ${colors.blueAccent[700]}`,
              fontWeight: "500",
              "&:hover": {
                backgroundColor: colors.blueAccent[700],
                border: "none",
              },
              "&:active": {
                transform: "scale(0.93)",
              },
            }}
          >
            Submit Changes
          </Button>
        </Box>
      </Form>
    </Box>
  );
}

export default EditPage;
