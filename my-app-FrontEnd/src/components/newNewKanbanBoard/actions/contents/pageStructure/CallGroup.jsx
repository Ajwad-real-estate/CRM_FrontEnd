import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import { Box, Typography, useTheme } from "@mui/material";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { tokens } from "../../../../../theme";

function CallGroup() {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (value) => {
    setSelectedValue(value);
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
      }}
    >
      {/* First Radio Group */}
      <Box
        onClick={() => handleChange("a")}
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
            selectedValue === "a" ? colors.blueAccent[800] : "transparent",
          border:
            selectedValue === "a" ? "none" : `1px solid ${colors.grey[400]}`,
        }}
      >
        <Radio
          checked={selectedValue === "a"}
          onChange={() => handleChange("a")}
          value="a"
          name="radio-buttons"
          sx={{ display: "none" }}
        />
        <PhoneCallbackIcon
          sx={{
            color:
              selectedValue === "a"
                ? colors.greenAccent[500]
                : colors.grey[700],
          }}
        />
        <Typography
          variant="p"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: colors.primary[200],
          }}
        >
          Answer
        </Typography>
      </Box>

      {/* Second Radio Group */}
      <Box
        onClick={() => handleChange("b")}
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
            selectedValue === "b" ? colors.blueAccent[800] : "transparent",
          border:
            selectedValue === "b" ? "none" : `1px solid ${colors.grey[400]}`,
        }}
      >
        <Radio
          checked={selectedValue === "b"}
          onChange={() => handleChange("b")}
          value="b"
          name="radio-buttons"
          sx={{ display: "none" }}
        />
        <CallEndIcon
          sx={{
            color:
              selectedValue === "b" ? colors.redAccent[500] : colors.grey[700],
          }}
        />
        <Typography
          variant="p"
          sx={{
            fontSize: "1.1rem",
            fontWeight: "500",
            color: colors.primary[200],
          }}
        >
          no answer
        </Typography>
      </Box>
    </Box>
  );
}

export default CallGroup;
