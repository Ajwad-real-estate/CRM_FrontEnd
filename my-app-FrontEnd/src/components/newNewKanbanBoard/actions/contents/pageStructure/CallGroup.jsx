import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import { Box, Typography, useTheme } from "@mui/material";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { tokens } from "../../../../../helpers/redux/theme";

function CallGroup({ setCall, callCase }) {
  const handleChange = (value) => {
    setCall(value);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        height: "100%",
        gap: "10px",
      }}>
      {/* First Radio Group */}
      <Box
        onClick={() => handleChange(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: "8px",
          width: "50%",
          height: "50%",
          borderRadius: "8px",
          padding: "8px",
          cursor: "pointer",
          background:
            callCase === true ? colors.blueAccent[800] : "transparent",
          border: callCase === true ? "none" : `1px solid ${colors.grey[400]}`,
        }}>
        <Radio
          checked={callCase === true}
          onChange={() => handleChange(true)}
          value={true}
          name="radio-buttons"
          sx={{ display: "none" }}
        />
        <PhoneCallbackIcon
          sx={{
            color:
              callCase === true ? colors.greenAccent[500] : colors.grey[700],
          }}
        />
        <Typography
          variant="p"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: colors.primary[200],
          }}>
          Answer
        </Typography>
      </Box>

      {/* Second Radio Group */}
      <Box
        onClick={() => handleChange(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "50%",
          height: "50%",
          borderRadius: "8px",
          padding: "8px",
          cursor: "pointer",
          background:
            callCase === false ? colors.blueAccent[800] : "transparent",
          border: callCase === false ? "none" : `1px solid ${colors.grey[400]}`,
        }}>
        <Radio
          checked={callCase === false}
          onChange={() => handleChange(false)}
          value={false}
          name="radio-buttons"
          sx={{ display: "none" }}
        />
        <CallEndIcon
          sx={{
            color:
              callCase === false ? colors.redAccent[500] : colors.grey[700],
          }}
        />
        <Typography
          variant="p"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: colors.primary[200],
          }}>
          no answer
        </Typography>
      </Box>
    </Box>
  );
}

export default CallGroup;
