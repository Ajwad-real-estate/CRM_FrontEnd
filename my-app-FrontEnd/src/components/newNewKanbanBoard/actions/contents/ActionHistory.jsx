import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../helpers/redux/theme";
import { useClientActions } from "../useGetClientActions";
import ProgressCircle from "../../../ProgressCircle";

const typeOptions = ["Follow Up", "Meeting", "Follow Up after meeting"];
const statusOptions = [
  "New",
  "Qualified",
  "Reserved",
  "Done deal",
  "Archieved",
  "Lost",
  "Cancel",
];

function formatDat(dateString) {
  return new Date(dateString).toLocaleDateString();
}
function formatTim(timeString) {
  const [hours, minutes, seconds] = timeString
    .split(":")
    .map((num) => parseInt(num));
  const date = new Date(0, 0, 0, hours, minutes, seconds);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export default function ActionHistory({ lead }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isPending, isError, error } = useClientActions(lead.id);

  return (
    <Box
      sx={{
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: `${isPending ? "center" : "flex-start"}`,
        alignItems: `${isPending ? "center" : ""}`,
        height: "100%",
        marginTop: "30px",
        padding: "3px",
      }}>
      {!isError && data && !isPending && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: `1px solid ${colors.primary[200]}`,
              padding: "10px",
              borderRadius: "8px 8px 0 0",
              width: "100%",
            }}>
            <Typography variant="subtitle1" sx={{ flex: 2, textAlign: "left" }}>
              Comment
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, textAlign: "center" }}>
              Date
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, textAlign: "center" }}>
              Time
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, textAlign: "center" }}>
              Action
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, textAlign: "center" }}>
              Status
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, textAlign: "center" }}>
              Completed
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, textAlign: "center" }}>
              Answered
            </Typography>
          </Box>

          {data.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:
                  index % 2 === 0 ? colors.blueAccent[900] : "inherit",
                padding: "10px 15px",
              }}>
              <Typography
                variant="body2"
                sx={{ flex: 2, textAlign: "left", wordBreak: "break-word" }}>
                {row.comment}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                {row.date ? formatDat(row.date) : "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                {row.time ? formatTim(row.time) : "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                {typeOptions[row.type_id - 1]}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                {statusOptions[row.status_id - 1]}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                {row.completed ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "center" }}>
                {row.answered ? "Yes" : "No"}
              </Typography>
            </Box>
          ))}
        </>
      )}
      {isPending && <ProgressCircle rotate />}

      {isError && (
        <Typography
          sx={{ color: "#ff0808", fontSize: "1.4rem", textAlign: "center" }}>
          {error.message}
        </Typography>
      )}
      {!isError && !isPending && !data?.length && data?.message && (
        <Typography sx={{ textAlign: "center", fontSize: "1.4rem" }}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
