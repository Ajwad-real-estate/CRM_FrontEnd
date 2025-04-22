import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* Basic Terms */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Basic Terms
          </Typography>
        </AccordionSummary >
        <AccordionDetails sx={{display: "flex"}}>
          <Typography sx={{ width:"33%" }}>
            <strong>Apartment</strong>: شقة <br />
            <strong>Villa</strong>: فيلا <br />
            <strong>Studio</strong>: ستوديو <br />
            <strong>Garden</strong>: حديقة <br />
            <strong>Living Room</strong>: غرفة معيشة <br />
            <strong>Balcony</strong>: شرفة <br />
            <strong>Kitchen</strong>: مطبخ <br />
          </Typography>
          <Typography sx={{ width: "30%" }}>
            <strong>Down Payment</strong>: مقدم <br />
            <strong>Installments</strong>: أقساط <br />
            <strong>Fully Finished</strong>: تشطيب كامل <br />
            <strong>Sea View</strong>: مطل على البحر <br />
            <strong>Maintenance Fees</strong>: رسوم الصيانة <br />
            <strong>Standalone Villa</strong>: فيلا منفصلة <br />
            <strong>Twin House</strong>: توين هاوس <br />
          </Typography>
          <Typography>
            
            <strong>Prime Location</strong>: موقع مميز <br />
            <strong>Gated Community</strong>: كمبوند مغلق <br />
            <strong>High ROI</strong>: عائد استثماري مرتفع <br />
            <strong>Flexible Payment Options</strong>: خيارات دفع مرنة <br />
            <strong>Lagoon View</strong>: مطل على البحيرة <br />
            <strong>Clubhouse</strong>: نادي اجتماعي <br />
            <strong>Exclusive Offer</strong>: عرض حصري <br />
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Intermediate Terms */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Intermediate Terms
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Down Payment</strong>: مقدم <br />
            <strong>Installments</strong>: أقساط <br />
            <strong>Fully Finished</strong>: تشطيب كامل <br />
            <strong>Sea View</strong>: مطل على البحر <br />
            <strong>Maintenance Fees</strong>: رسوم الصيانة <br />
            <strong>Standalone Villa</strong>: فيلا منفصلة <br />
            <strong>Twin House</strong>: توين هاوس <br />
          </Typography>
          <Typography>
            <strong>Prime Location</strong>: موقع مميز <br />
            <strong>Gated Community</strong>: كمبوند مغلق <br />
            <strong>High ROI</strong>: عائد استثماري مرتفع <br />
            <strong>Flexible Payment Options</strong>: خيارات دفع مرنة <br />
            <strong>Lagoon View</strong>: مطل على البحيرة <br />
            <strong>Clubhouse</strong>: نادي اجتماعي <br />
            <strong>Exclusive Offer</strong>: عرض حصري <br />
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Advanced Terms */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Advanced Terms
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>Prime Location</strong>: موقع مميز <br />
            <strong>Gated Community</strong>: كمبوند مغلق <br />
            <strong>High ROI</strong>: عائد استثماري مرتفع <br />
            <strong>Flexible Payment Options</strong>: خيارات دفع مرنة <br />
            <strong>Lagoon View</strong>: مطل على البحيرة <br />
            <strong>Clubhouse</strong>: نادي اجتماعي <br />
            <strong>Exclusive Offer</strong>: عرض حصري <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
