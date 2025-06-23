import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { tokens } from "../../../helpers/redux/theme";
import { useTheme } from "@emotion/react";
import ProgressCircle from "../../ProgressCircle";

function formatDate(isoDateString) {
  const date = new Date(isoDateString); // Parse the ISO string to a Date object

  // Format the date as "Month Day, Year" (e.g., "December 19, 2024")
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Format the time as "Hour:Minute AM/PM" (e.g., "9:41 AM")
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} at ${formattedTime}`;
}

// Example usage:
const isoDate = "2024-12-19T09:41:18.150Z";
console.log(formatDate(isoDate)); // Output: "December 19, 2024 at 9:41 AM"

const LeadPreview = ({ data, isPending, isError }) => {
  const [rows, setRows] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    if (!isPending && data) {
      // Populate the rows with the fetched data
      setRows([
        { label: "Name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Age", value: data.age },
        { label: "Street", value: data.street },
        { label: "Budget", value: `${data.budget} $` },
        { label: "Joined at", value: formatDate(data.created_at) },
        { label: "Phone Numbers", value: data.phone_numbers },
      ]);
    }
  }, [data, isPending]); // Dependency array ensures this effect runs when data or isPending changes

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "30px",
      }}>
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
        }}>
        {rows.map((row, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{
              backgroundColor:
                index % 2 === 0 ? colors.blueAccent[900] : "inherit", // Alternating grey shades
              padding: "10px",
              width: "100%",
            }}>
            <Grid container alignItems="center" sx={{ width: "100%" }}>
              <Grid item xs={4}>
                <Typography variant="body1" color="textSecondary">
                  {row.label}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">{row.value}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {isPending && <ProgressCircle rotate />}
    </Box>
  );
};

export default LeadPreview;
