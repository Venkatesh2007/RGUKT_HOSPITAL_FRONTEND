import React, { useState } from "react";
import { Modal, Button, Box, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../utils/mainUrl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

const ChangePasswordComponent = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords not matched!");
      return;
    }

    if (oldPassword === newPassword) {
      toast.warning("Old password is same as new password!");
      return;
    }

    const url = `${mainUrl}/profile/${user}/change-password`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const { message } = await response.json();
      toast.success(message);
      handleClose();
    } else {
      const { message } = await response.json();
      toast.success(message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="flex flex-col gap-4">
            <TextField
              label="Old Password"
              type="password"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Change Password
      </Button>
    </div>
  );
};

export default ChangePasswordComponent;
