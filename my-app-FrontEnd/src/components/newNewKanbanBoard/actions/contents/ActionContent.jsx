import { Box, Typography, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ActionBody from "./pageStructure/ActionBody";
import BusinessIcon from "@mui/icons-material/Business";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { tokens } from "../../../../theme";

function ActionContent({ lead, data, onClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const centering = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "8px",
    color: colors.greenAccent[300],
    padding: "10px",
    border: `0.5px solid ${colors.greenAccent[200]}`,
    borderRadius: "8px",
    flex: "1 1 calc(33.33% - 20px)", // Adjust for 3 items per row with spacing
    boxSizing: "border-box", // Ensure padding is included in width
  };
  console.log(lead);

  return (
    <>
      <Box
        sx={{
          padding: "22px 26px",
          width: "94%",
          marginInline: "auto",
          border: `0.5px solid ${colors.primary[300]}`,
          borderRadius: "5px",
          display: "flex",
          flexWrap: "wrap", // Enable wrapping
          justifyContent: "space-between", // Adjust alignment between rows
          gap: "20px", // Space between items
        }}
      >
        <Box sx={centering}>
          <TextSnippetIcon />
          <Typography variant="p">{lead.title}</Typography>
        </Box>
        <Box sx={centering}>
          <PersonIcon />
          <Typography variant="p">{lead.email}</Typography>
        </Box>
        <Box sx={centering}>
          <BusinessIcon />
          <Typography variant="p">{lead.company}</Typography>
        </Box>
        <Box sx={centering}>
          <PhoneEnabledIcon />
          <Typography variant="p">{lead.phoneNumber}</Typography>
        </Box>
        <Box sx={centering}>
          <ReceiptLongIcon />
          <Typography variant="p">{lead.amount}</Typography>
        </Box>
        {/* <Box sx={centering}>
          <TagIcon />

          {lead.phone_numbers.map((cur, i) => (
            <Typography key={i} variant="p" sx={{ display: "inline" }}>
              {cur}
            </Typography>
          ))}
        </Box> */}
        {/* {lead.tags.map((cur, i) => (
            <Typography key={i} variant="p" sx={{ display: "inline" }}>
              {cur}
            </Typography>
          ))} */}
      </Box>

      <ActionBody lead={lead} onShut={onClose} />
    </>
  );
}

export default ActionContent;
