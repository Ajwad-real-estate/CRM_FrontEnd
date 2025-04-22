import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import TagIcon from "@mui/icons-material/Label";
import { tokens } from "../../theme";

const LeadCard = ({ lead }) => {
  const theme = useTheme(); // Access the theme using useTheme hook
  const colors = tokens(theme.palette.mode); // Get colors based on the current theme
  //rgb(29 41 54) original
  //rgb(28 39 47) i make  #1c272f
  return (
    <Card
      sx={{
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: 10,
        background: colors.columns[100],
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {lead.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {lead.company || "Company not provided"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <PhoneIcon sx={{ marginRight: 0.5 }} />
          <Typography variant="body2">
            <a
              href={`tel:${lead.phoneNumber}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {lead.phoneNumber || "Phone number not provided"}
            </a>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          <EmailIcon sx={{ marginRight: 0.5 }} />
          <Typography variant="body2">
            <a
              href={`mailto:${lead.email}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {lead.email || "Email not provided"}
            </a>
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Amount:{" "}
          {typeof lead.amount === "number"
            ? `$${lead.amount.toFixed(2)}`
            : "Amount not provided"}
        </Typography>
        <Box sx={{ marginTop: 1 }}>
          {lead.tags && lead.tags.length > 0 ? (
            lead.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                icon={<TagIcon />}
                sx={{ marginRight: 0.5 }}
              />
            ))
          ) : (
            <span>No tags</span>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

LeadCard.propTypes = {
  lead: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Allow string or number
    company: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default LeadCard;
