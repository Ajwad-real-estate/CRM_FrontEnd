import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddPhoneNumber from "./AddPhoneNumber";
import { useClient } from "./useKanban";
import ProgressCircle from "../../ProgressCircle";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { useUpdateClient } from "./useUpdateClient";
// import ClientData from "../ClientData";

const typeOptions = ["Warm", "Cold"];
const statusOptions = [
  "New",
  "Qualified",
  "Reserved",
  "Archive",
  "Done Deal",
  "Lost",
];

function capitalize(word) {
  if (!word) return ""; // Handle empty input
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function EditClient({ lead }) {
  const { data, isLoading, isSHIT, badError } = useClient(lead.id);
  console.log(data);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Initialize state with defaults or use `data` values once available
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [budget, setBudget] = useState("");
  const [street, setStreet] = useState("");
  const [channel, setChannel] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  // Update state when data becomes available
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setAge(data.age || 1);
      setEmail(data.email || "");
      setType(capitalize(data.type) || "");
      setStatus(capitalize(data.status) || "");
      setBudget(data.budget || "");
      setStreet(data.street || "");
      setChannel(data.channel || "");
      setNumbersList(data.phone_numbers || []);
    }
  }, [data]);

  // Handle loading and error states
  const { isPending, isError, error, editClient } = useUpdateClient();
  const handleAdd = () => {
    if (newPhoneNumber.trim() !== "") {
      setNumbersList([...numbersList, newPhoneNumber.trim()]);
      setNewPhoneNumber("");
    }
  };

  // Handle removing an item
  const handleRemove = (index) => {
    setNumbersList(numbersList.filter((_, i) => i !== index));
  };

  // Restrict input to numbers only
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNewPhoneNumber(value);
    }
  };
  console.log(data.id);
  const handleEdit = () => {
    const clientData = {
      name,
      age,
      email,
      type,
      budget,
      street,
      phone_numbers: numbersList,
    };
    editClient({ clientID: data.id, ClientData });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: ` ${isPending || isError ? "center" : "space-around"}`,
        alignItems: `${isPending || isError ? "center" : ""}`,
      }}
    >
      {data && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Name
              </Typography>
              <TextField
                variant="outlined"
                sx={{ width: "100%" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Age
              </Typography>
              <TextField
                variant="outlined"
                sx={{ width: "40%" }}
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "65%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Email
              </Typography>
              <TextField
                variant="outlined"
                sx={{ width: "100%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Street
              </Typography>
              <TextField
                variant="outlined"
                sx={{ width: "100%" }}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Channel
              </Typography>
              <TextField
                variant="outlined"
                sx={{ width: "100%" }}
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Status
              </Typography>
              <FormControl fullWidth sx={{ width: "100%" }}>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusOptions.map((option, i) => (
                    <MenuItem value={option} key={i}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Type
              </Typography>
              <FormControl fullWidth sx={{ width: "55%" }}>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  {typeOptions.map((option, i) => (
                    <MenuItem value={option} key={i}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "50%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Budget
              </Typography>
              <TextField
                variant="outlined"
                type="number"
                sx={{ width: "100%" }}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Box>
          </Box>
          <AddPhoneNumber
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleChange={handleChange}
            numbersList={numbersList}
            setNumbersList={setNumbersList}
            newPhoneNumber={newPhoneNumber}
            setNewPhoneNumber={setNewPhoneNumber}
          />
        </>
      )}
      {isPending && <ProgressCircle rotate />}
      {isError && (
        <Typography sx={{ color: colors.redAccent[600] }}>
          Failed Getting Client Data
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{
          width: "48%",
          bgcolor: colors.blueAccent[700],
          fontSize: "1.3rem",
          alignSelf: "center",
        }}
        onClick={handleEdit}
      >
        {!isLoading ? "Submit Changes" : "Editing..."}
      </Button>
    </Box>
  );
}

export default EditClient;
