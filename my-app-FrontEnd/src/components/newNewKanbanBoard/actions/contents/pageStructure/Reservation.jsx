import {
  Box,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { tokens } from "../../../../../theme";

const RowForm = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
  width: 100%;
`;
const PaymentOptions = ["Credit Card", "Debit Card", "Cash"];
const ProjectOptions = ["Wesal", "Noor", "Talaat Mostafa", "Hurgada"];

function Reservation() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [payment, setPayment] = useState("");
  const handleSelectPayment = (option) => {
    setPayment(option);
  };
  return (
    <Box sx={{ width: "100%", gridArea: "comment" }}>
      <Form>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>Payment Plans</Typography>
            <TextField
              id="outlined-select-currency-native"
              select
              value={payment}
              slotProps={{
                select: {
                  native: true,
                },
              }}
              sx={{ flex: 1, width: "100%" }}
            >
              {PaymentOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                  onClick={() => handleSelectPayment(option)}
                  sx={{
                    padding: "10px 20px", // Custom padding
                    transition: "all 0.3s ease",
                    background: colors.primary[800],

                    "&:hover": {
                      backgroundColor: colors.primary[700],
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Addons</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>Project</Typography>
            <TextField
              id="outlined-select-currency-native"
              select
              slotProps={{
                select: {
                  native: true,
                },
              }}
              sx={{ flex: 1, width: "100%" }}
            >
              {ProjectOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option}
                  onClick={() => handleSelectPayment(option)}
                  sx={{
                    padding: "10px 20px", // Custom padding
                    transition: "all 0.3s ease",
                    background: colors.primary[800],

                    "&:hover": {
                      backgroundColor: colors.primary[700],
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Unit No</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>Lead Name</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Lead Mobile</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>Category</Typography>
            <TextField
              id="outlined-select-currency-native"
              select
              placeholder="select Category"
              slotProps={{
                select: {
                  native: true,
                },
              }}
              sx={{ flex: 1, width: "100%" }}
            >
              <InputLabel id="demo-multiple-name-label">
                select Category
              </InputLabel>
              {PaymentOptions.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleSelectPayment(option)}
                  sx={{
                    padding: "10px 20px", // Custom padding
                    transition: "all 0.3s ease",
                    background: colors.primary[800],

                    "&:hover": {
                      backgroundColor: colors.primary[700],
                    },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Unit Cost</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>National ID</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Address</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>Email</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Reservation Cost</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
        <RowForm>
          <Box sx={{ width: "100%" }}>
            <Typography>Floor</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Space</Typography>
            <TextField sx={{ width: "100%" }}></TextField>
          </Box>
        </RowForm>
      </Form>
    </Box>
  );
}

export default Reservation;
