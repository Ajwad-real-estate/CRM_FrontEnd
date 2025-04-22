import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChatIcon from "@mui/icons-material/Chat";
import { useLeadOpt } from "./LeadContext";

export default function Tabed() {
  const { handleTabChange, TabValue } = useLeadOpt();

  return (
    <Tabs
      value={TabValue}
      onChange={handleTabChange}
      aria-label="icon tabs example"
    >
      <Tab
        icon={<RemoveRedEyeIcon />}
        aria-label="preview"
        sx={{
          "&.Mui-selected .MuiTab-iconWrapper": {
            color: "#868dfb", // Color for selected tab icon
          },
          "& .MuiTab-iconWrapper": {
            color: "inherit", // Default color for non-selected icons
          },
        }}
      />
      <Tab
        icon={<EditNoteIcon />}
        aria-label="notes"
        sx={{
          "&.Mui-selected .MuiTab-iconWrapper": {
            color: "#868dfb",
          },
          "& .MuiTab-iconWrapper": {
            color: "inherit",
          },
        }}
      />
      <Tab
        icon={<ArrowForwardIcon />}
        aria-label="forward"
        sx={{
          "&.Mui-selected .MuiTab-iconWrapper": {
            color: "#868dfb",
          },
          "& .MuiTab-iconWrapper": {
            color: "inherit",
          },
        }}
      />
      <Tab
        icon={<AddIcon />}
        aria-label="action"
        sx={{
          "&.Mui-selected .MuiTab-iconWrapper": {
            color: "#868dfb",
          },
          "& .MuiTab-iconWrapper": {
            color: "inherit",
          },
        }}
      />
      <Tab
        icon={<ChatIcon />}
        aria-label="contact"
        sx={{
          "&.Mui-selected .MuiTab-iconWrapper": {
            color: "#868dfb",
          },
          "& .MuiTab-iconWrapper": {
            color: "inherit",
          },
        }}
      />
    </Tabs>
  );
}
