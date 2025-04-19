import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import { useUpdateClient } from "./useEditCient";
import { useQueryClient } from "@tanstack/react-query";
// import ClientData from "../ClientData";

function EditClient({ lead }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useClient(lead.id);
  const { isUpdating, updateClientData } = useUpdateClient(lead.id);
  console.log(data);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Initialize state with defaults or use `data` values once available
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [email, setEmail] = useState("");
  const [type, setType] = useState(0);
  const [status, setStatus] = useState(0);
  const [budget, setBudget] = useState("");
  const [street, setStreet] = useState("");
  const [channel, setChannel] = useState("");
  const [numbersList, setNumbersList] = useState([]);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nationalID, setNationalID] = useState("");

  const typeState = [
    "New",
    "Qualified",
    "Reserved",
    "Done Deal",
    "Archieved",
    "Lost",
  ];
  const StatusState = ["Follow Up", "Meeting", "Follow up after Meeting"];
  // Update state when data becomes available
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setAge(data.age || 1);
      setEmail(data.email || "");
      setType(data.type_id - 1 || 0);
      setStatus(data.status_id - 1 || 0);
      setBudget(data.budget || "");
      setStreet(data.street || "");
      setChannel(data.channel_id || "");
      setNumbersList(data.phone_numbers || []);
      setNationalID(data.nat_id || "");
    }
  }, [data]);

  // Handle loading and error states
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

  const handleEdit = () => {
    const clientData = {
      name,
      age,
      email,
      type,
      budget,
      street,
      nat_id: nationalID,
      type_id: type + 1,
      status_id: status + 1,
      channel_id: channel,
      phone_numbers: numbersList,
    };
    updateClientData({ clientData, clientId: data.id });
    queryClient.invalidateQueries({ queryKey: ["clientsList"] });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: ` ${isLoading || isError ? "center" : "space-around"}`,
        alignItems: `${isLoading || isError ? "center" : ""}`,
        gap: "20px",
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
                width: "65%",
                gap: "12px",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                National ID
              </Typography>
              <TextField
                variant="outlined"
                sx={{ width: "100%" }}
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
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
                  {StatusState.map((option, i) => (
                    <MenuItem value={i} key={i}>
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
                  {typeState.map((option, i) => (
                    <MenuItem value={i} key={i}>
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
      {isLoading && <ProgressCircle rotate />}
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
        disabled={isUpdating}
      >
        {!isUpdating ? (
          "Submit Changes"
        ) : (
          <>
            Editing
            <CircularProgress
              size={20}
              sx={{ color: "white", marginRight: "8px" }}
            />
          </>
        )}
      </Button>
    </Box>
  );
}

export default EditClient;
