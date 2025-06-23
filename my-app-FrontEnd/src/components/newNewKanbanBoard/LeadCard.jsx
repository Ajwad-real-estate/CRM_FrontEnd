import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import TagIcon from "@mui/icons-material/Label";
import { tokens } from "../../helpers/redux/theme";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

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
      }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {lead.title}
        </Typography>
        {/* <Typography variant="subtitle2" color="text.secondary">
                {lead.company || 'Company not provided'}
            </Typography> */}

        <Typography variant="subtitle1" color="text.secondary">
          Budget:{" "}
          {typeof lead.amount === "number"
            ? `$${lead.amount.toFixed(2)}`
            : " Not provided"}
        </Typography>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <PhoneIcon sx={{ marginRight: 0.5 }} />
                    <Typography variant="body2">
                        <a href={`tel:${lead.phoneNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {lead.phoneNumber || 'Phone number not provided'}
                        </a>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <EmailIcon sx={{ marginRight: 0.5 }} />
                    <Typography variant="body2">
                        <a href={`mailto:${lead.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {lead.email || 'Email not provided'}
                        </a>
                    </Typography>
                </Box> */}
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Project:{" "}
          {typeof lead.amount === "number"
            ? `$${lead.amount.toFixed(2)}`
            : " Not provided"}
        </Typography>
        <Box sx={{ marginTop: 1, marginBottom: -2.5 }}>
          {/* Tags Section */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Allow wrapping to the next line if space is insufficient
              alignItems: "center", // Vertically align items
              gap: 0.5, // Space between tags and icons
            }}>
            <Box
              sx={{
                mb: "10px",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                gap: "10px",
              }}>
              {lead.tags && lead.tags.length > 0 ? (
                lead.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    icon={<TagIcon />}
                    sx={{
                      // marginRight: 0.5,
                      pl: "5px",
                      pr: "5px",
                    }}
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}>
                  No tags
                </Typography>
              )}
            </Box>

            {/* WhatsApp and Phone Icons Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1, // Push icons to the end of the row if on the same line
                gap: 1, // Space between icons
                marginTop: lead.tags && lead.tags.length > 0 ? 0 : 1, // Add margin-top if there are no tags
                marginBottom: lead.tags && lead.tags.length > 1 ? -5 : 0, // Add margin-top if there are no tags
              }}>
              {/* Phone Icon */}
              <IconButton
                sx={{
                  backgroundColor: colors.grey[900],
                  color: colors.grey[100],
                  "&:hover": { backgroundColor: colors.grey[800] },
                  border: "1px solid ",
                  borderColor: colors.grey[800],
                }}
                href={`tel:${lead.phoneNumber}`} // Phone link
              >
                <PhoneIcon />
              </IconButton>

              {/* WhatsApp Icon */}
              <IconButton
                sx={{
                  backgroundColor: "#25D366",
                  color: "white",
                  "&:hover": { backgroundColor: "#1DA851" },
                }}
                href={`https://wa.me/${lead.phoneNumber}`} // WhatsApp API link
                target="_blank"
                rel="noopener noreferrer">
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Bottom-right icons */}
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
