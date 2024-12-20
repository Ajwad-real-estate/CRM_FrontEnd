import { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Tabed from "./Tabed";
import { useLeadOpt } from "./LeadContext";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import ActionContent from "./contents/ActionContent";
import { tokens } from "../../../theme";
import EditPage from "./contents/EditPage";
import LeadPreview from "./LeadPreview";
const Action = ({ open, onClose, onOpen, lead, onUpdate }) => {
  const { TabValue } = useLeadOpt();
  // Drawer content
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const drawerContent = (
    <Box
      sx={{
        width: "45vw", // 44% of the viewport width
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "100vw",
        background: colors.primary[400],
      }}
      role="presentation"
    >
      <Box
        sx={{
          marginTop: "20px",
          width: "96%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onClose}
          sx={{ position: "absolute", top: "5px", right: "5px" }}
        >
          <CloseIcon sx={{ color: colors.primary[200] }} />
        </Button>
        <Box sx={{ width: "230px" }}>
          {/*Title-------------------------------------------------------------*/}
          {TabValue === 0 && (
            <Typography variant="h2"> Lead Preview</Typography>
          )}
          {TabValue === 1 && <Typography variant="h2"> Edit</Typography>}
          {TabValue === 2 && <Typography variant="h2"> Next</Typography>}
          {TabValue === 3 && <Typography variant="h2"> Add Action</Typography>}
          {TabValue === 4 && <Typography variant="h2"> Contact</Typography>}

          {/*Title----------------------------------------------------------------*/}
        </Box>
        <Tabed />
      </Box>
      {/* Content ----------------------------------------------------------------------------- */}
      <Box
        sx={{
          width: "97%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "10px",
        }}
      >
        {TabValue === 0 && lead && <LeadPreview lead={lead} open={open} />}
        {TabValue === 1 && lead && <EditPage lead={lead} onUpdate={onUpdate} />}
        {TabValue === 3 && lead && <ActionContent lead={lead} />}
      </Box>
      {/* Content ----------------------------------------------------------------------------- */}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      lead={lead}
    >
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default Action;
