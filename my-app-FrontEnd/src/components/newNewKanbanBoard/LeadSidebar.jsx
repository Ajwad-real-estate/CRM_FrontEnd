import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LeadSidebar = ({ lead, onClose }) => {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track if sidebar is open
  // const [isTimerStarted, setIsTimerStarted] = useState(false);

  useEffect(() => {
    handleOpenSidebar();
  }, []);
  // Open the sidebar
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true); // Open the sidebar
  };

  // Close the sidebar
  const handleCloseSidebar = useCallback(() => {
    onClose(); // Close the sidebar when called externally
    setIsSidebarOpen(false); // Track that the sidebar is closed
  }, [onClose]); // add any dependencies used inside

  useEffect(() => {
    if (isSidebarOpen) {
      // Focus the sidebar when it's opened
      sidebarRef.current && sidebarRef.current.focus();
    }

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        console.log("sideBar");
        console.log(isSidebarOpen);
        if (isSidebarOpen) {
          handleCloseSidebar();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen, handleCloseSidebar]);
  return (
    <Box
      ref={sidebarRef}
      tabIndex={-1} // Allow the element to be focusable
      width="400px"
      height="100%"
      bgcolor="black"
      boxShadow={3}
      position="absolute"
      right={0}
      top={0}
      display="flex"
      flexDirection="column"
      p={3}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleCloseSidebar}
        style={{ alignSelf: "flex-end" }}
      >
        <CloseIcon />
      </IconButton>
      {/* Lead Details */}
      <Typography variant="h6" gutterBottom>
        {lead.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Company: {lead.company || "N/A"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Amount: {lead.value}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: {lead.phoneNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {lead.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tags: {lead.tags.join(", ")}
      </Typography>
    </Box>
  );
};

export default LeadSidebar;
