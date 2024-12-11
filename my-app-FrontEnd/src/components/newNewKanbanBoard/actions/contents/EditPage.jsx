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

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  width: 80%;
`;
function EditPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("example.email");
  const [amount, setAmount] = useState(0);
  const [tags, setTags] = useState("");
  const textfieldStyling = {
    width: "100%",
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "colum",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Form>
        <FormRow label="Title" editSize>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Company" editSize>
          <TextField
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Phone Number" editSize>
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Email" editSize>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={textfieldStyling}
          />
        </FormRow>

        <FormRow label="Amount" editSize>
          <OutlinedInput
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="outlined-adornment-amount"
            endAdornment={<InputAdornment position="end">LE</InputAdornment>}
            sx={textfieldStyling}
          />
        </FormRow>
        <FormRow label="Tags" editSize>
          <TextField
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
