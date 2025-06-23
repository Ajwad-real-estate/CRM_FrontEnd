import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../helpers/redux/theme";
import EditIcon from "@mui/icons-material/Edit";
import ActionForm from "./addActionForm";
import { useClient } from "../../newNewKanbanBoard/actions/useKanban";
import { actionOptions } from "../../../data/clientOptions";

const ActionItem = ({ todo }) => {
  console.log("todo============");
  console.log("todo", todo);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    comment: "",
    date: "",
    time: "",
    status_id: "",
    name: "",
    action_type: "",
  });

  const { data: clientData } = useClient(todo.client_id);
  const matchedOption = actionOptions.find((opt) => opt.id === todo.type_id);

  useEffect(() => {
    if (clientData && todo) {
      setFormData({
        date: todo.date ? new Date(todo.date).toISOString().split("T")[0] : "",
        time: todo.time || "",
        status_id: clientData?.status_id || "",
        name: clientData.name || "",
        action_type: matchedOption?.value || "",
      });
    }
  }, [clientData, todo]);

  return (
    <Box
      p="10px"
      mb="10px"
      borderRadius="4px"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderLeft: "10px solid red",
        alignItems: "center",
        justifyContent: "center",
        width: "98%",
        backgroundColor: colors.grey[900],
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%">
        <Typography
          variant="body1"
          sx={{
            color: colors.grey[100],
            flexGrow: 1,
            marginLeft: "10px",
          }}>
          {formData.name}
        </Typography>
        <Box sx={{ m: "auto", textAlign: "center", display: "flex" }}>
          {formData.action_type}
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="10px">
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "flex" },
            }}>
            <Typography sx={{ color: colors.grey[100], marginRight: "20px" }}>
              {new Date(formData.date).toLocaleDateString()}{" "}
              {formData.time.slice(0, 5)}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "14px",
              width: "14px",
              borderRadius: "50%",
              backgroundColor:
                formData.status_id === 1
                  ? "grey"
                  : formData.status_id === 2
                    ? "orange"
                    : "green",
              marginRight: "20px",
            }}
          />

          <EditIcon onClick={() => setOpen(true)} sx={{ cursor: "pointer" }} />
        </Box>
      </Box>
      <ActionForm open={open} onClose={() => setOpen(false)} todo={todo} />

      {/* <addAction open={open} onClose={() => setOpen(false)} todo={todo} /> */}
    </Box>
  );
};
ActionItem.propTypes = {
  todo: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    type_id: PropTypes.number,
    client_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActionItem;
