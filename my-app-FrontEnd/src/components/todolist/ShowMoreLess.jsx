import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../theme";

export default function ShowMoreLess({ text }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isExpanded, setIsExpanded] = useState(false); // Control toggle state
  const words = text.split(" "); // Split the text into words
  const MAX_WORDS = 10; // Maximum words to display when collapsed

  const toggleShowMore = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <Typography
        sx={{ width: "80%", alignSelf: "center", color: colors.grey[500] }}
        variant="p"
      >
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
          onClick={toggleShowMore}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
}
