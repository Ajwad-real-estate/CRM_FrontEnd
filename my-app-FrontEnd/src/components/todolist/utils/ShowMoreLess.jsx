import { Button } from "bootstrap";
import { useState } from "react";
import { tokens } from "../../../theme";
import { Typography, useTheme } from "@mui/material";

export default function ShowMoreLess({ text }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isExpanded, setIsExpanded] = useState(false); // Control toggle state

  const words = text ? text.split(" ") : []; // Split text into words or fallback to an empty array
  const MAX_WORDS = 10; // Maximum words to display when collapsed

  const toggleShowMore = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <Typography
        sx={{ width: "80%", alignSelf: "center", color: colors.grey[500] }}
        variant="p">
        {
          isExpanded
            ? text // Show full text
            : words.slice(0, MAX_WORDS).join(" ") +
              (words.length > MAX_WORDS ? "..." : "") // Show truncated text
        }
      </Typography>
      {words.length > MAX_WORDS && (
        <Button
          sx={{ color: colors.greenAccent[500] }}
          onClick={toggleShowMore}>
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
}
