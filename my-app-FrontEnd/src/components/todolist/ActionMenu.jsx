import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

export const ActionMenu = ({
  onEdit,
  onDelete,
  onComplete,
  onCancel,
  isCompleted,
  disabled,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const menuItems = [
    {
      icon: <EditIcon fontSize="small" />,
      text: "Edit",
      onClick: () => {
        handleClose();
        onEdit();
      },
    },
    {
      icon: isCompleted ? (
        <BlockIcon fontSize="small" />
      ) : (
        <CheckCircleIcon fontSize="small" />
      ),
      text: isCompleted ? "Cancel" : "Complete",
      onClick: () => {
        handleClose();
        isCompleted ? onCancel() : onComplete();
      },
    },
  ];

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabled}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this action? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Delete
                    </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
