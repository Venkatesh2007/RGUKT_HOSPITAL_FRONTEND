import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  CssBaseline,
  Typography,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Menu,
  MenuList,
  Modal,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Header = ({ headerContent }) => {
  const location = useLocation();
  const path = location.pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
  };

  const handleMenuItemClick = (link) => {
    if (link === "/logout") {
      handleOpen();
    } else {
      navigate(link);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <img
            src="https://www.rgukt.in/images/Logonew.png"
            alt="Logo"
            style={{
              background: "white",
              height: "50px",
              borderRadius: "50%",
              marginRight: "16px",
            }}
          />
          <Typography
            variant="h6"
            color="inherit"
            sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "25px" }}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            RGUKT HealthHub
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {headerContent.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                onClick={() => handleMenuItemClick(item.link)}
                sx={{
                  fontWeight: "bold",
                  position: "relative",
                  margin: "10px",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: path === item.link ? "3px" : "0",
                    backgroundColor: "currentColor",
                    bottom: 0,
                    left: 0,
                    transition: "height 0.3s",
                  },
                }}
              >
                {item.title === "Login" ? (
                  <i className="mr-2 fas fa-sign-in-alt"></i>
                ) : null}
                {item.title}{" "}
                {item.title === "Logout" ? (
                  <i className="ml-2 fas fa-sign-out-alt"></i>
                ) : null}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, marginLeft: "auto" }}>
            <IconButton
              color="inherit"
              size="large"
              edge="end"
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuList>
                {headerContent.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleMenuItemClick(item.link)}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px", marginLeft: "55px" }}
            >
              Do you want to Logout?
            </Typography>
            <div className="flex justify-around">
              <Button onClick={handleClose} variant="contained" color="error">
                No
              </Button>
              <Button onClick={logout} variant="contained" color="success">
                Yes
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Header;
