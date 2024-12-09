import { Box, getAppBarUtilityClass } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Height } from "@mui/icons-material";
import ActionBody from "./pageStructure/ActionBody";
const centering = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  Height: "48%",
  width: "31%",
  backgroundColor: "#333",
};
function ActionContent() {
  return (
    <>
      <Box
        sx={{
          padding: "22px 26px",
          width: "94%",
          marginInline: "auto",
          border: "0.5px solid #c0c0c0",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          height: "30%",
        }}
      >
        <Box sx={centering}>
          <PersonIcon />
        </Box>
        <Box sx={centering}>
          <HomeIcon />
        </Box>
        <Box sx={centering}>
          <PhoneEnabledIcon />
        </Box>
        <Box sx={centering}>
          <ReceiptLongIcon />
        </Box>
        <Box sx={centering}>
          <TagIcon />
        </Box>
      </Box>
      <ActionBody />
    </>
  );
}

export default ActionContent;
