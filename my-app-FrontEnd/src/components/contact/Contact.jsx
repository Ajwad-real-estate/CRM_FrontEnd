// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   IconButton,
//   Popover,
//   Typography,
//   MenuItem,
//   Divider,
//   ListItemText,
//   Grid,
//   Chip,
// } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import GroupWorkIcon from "@mui/icons-material/GroupWork";
// import pipelineData from "../../data/sampleData";
// import "./ContactPage.css";

// const ContactPage = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [selectedTag, setSelectedTag] = useState("");

//   const allLeads = pipelineData.flatMap((stage) => stage.leads);
//   const companies = [
//     ...new Set(allLeads.map((lead) => lead.company).filter(Boolean)),
//   ];
//   const tags = [...new Set(allLeads.flatMap((lead) => lead.tags))];

//   const filteredLeads = allLeads.filter(
//     (lead) =>
//       (!searchTerm ||
//         lead.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (!selectedCompany || lead.company === selectedCompany) &&
//       (!selectedTag || lead.tags.includes(selectedTag))
//   );

//   const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
//   const handleFilterClose = () => setAnchorEl(null);

//   return (
//     <Box className="contact-page">
//       <Typography variant="h4">Contacts</Typography>

//       {/* Search bar with filter icon */}
//       <Box display="flex" alignItems="center" mt={2} mb={3}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <IconButton onClick={handleFilterClick}>
//           <FilterListIcon />
//         </IconButton>
//       </Box>

//       {/* Popover for filter options */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleFilterClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <Box p={2} width={300}>
//           <Box display="flex" justifyContent="space-between" mb={2}>
//             <Typography variant="subtitle1">Filters</Typography>
//             <Typography variant="subtitle1">Group By</Typography>
//             <Typography variant="subtitle1">Favorites</Typography>
//           </Box>
//           <Divider />

//           {/* Filters Section */}
//           <Box mt={2}>
//             <Typography variant="body2" color="textSecondary">
//               Filters
//             </Typography>
//             {[
//               "Individuals",
//               "Companies",
//               "Employees",
//               "Customer Invoices",
//               "Vendor Bills",
//               "Archived",
//             ].map((filter) => (
//               <MenuItem key={filter}>
//                 <ListItemText primary={filter} />
//               </MenuItem>
//             ))}
//           </Box>
//           <Divider />

//           {/* Group By Section */}
//           <Box mt={2}>
//             <Typography variant="body2" color="textSecondary">
//               Group By
//             </Typography>
//             {["Salesperson", "Company", "Country", "Add Custom Group"].map(
//               (group) => (
//                 <MenuItem key={group}>
//                   <GroupWorkIcon fontSize="small" />
//                   <ListItemText primary={group} />
//                 </MenuItem>
//               )
//             )}
//           </Box>
//           <Divider />

//           {/* Favorites Section */}
//           <Box mt={2}>
//             <Typography variant="body2" color="textSecondary">
//               Favorites
//             </Typography>
//             <MenuItem>
//               <StarBorderIcon fontSize="small" />
//               <ListItemText primary="Save current search" />
//             </MenuItem>
//           </Box>
//         </Box>
//       </Popover>

//       {/* Contact Cards Grid */}
//       <Grid container spacing={3}>
//         {filteredLeads.map((lead) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={lead.id}>
//             <Box className="contact-card">
//               <Typography variant="h6">{lead.title}</Typography>
//               {lead.company && (
//                 <Typography variant="subtitle1" color="textSecondary">
//                   {lead.company}
//                 </Typography>
//               )}
//               <Typography variant="body2" color="textSecondary">
//                 Value: {lead.value}
//               </Typography>
//               <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
//                 {lead.tags.map((tag) => (
//                   <Chip key={tag} label={tag} color="primary" size="small" />
//                 ))}
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default ContactPage;
