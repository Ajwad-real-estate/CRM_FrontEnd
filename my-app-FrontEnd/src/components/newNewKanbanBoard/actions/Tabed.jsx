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
      <Tab icon={<RemoveRedEyeIcon />} aria-label="preview" />
      <Tab icon={<EditNoteIcon />} aria-label="notes" />
      <Tab icon={<ArrowForwardIcon />} aria-label="forward" />
      <Tab icon={<AddIcon />} aria-label="action" />
      <Tab icon={<ChatIcon />} aria-label="contact" />
    </Tabs>
  );
}
