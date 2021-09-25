import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { makeStyles } from '@mui/styles';
import { useAuth } from "../utils/AuthContext";

const useStyles = makeStyles({
  root: {
    background: "#046582",
    underline: "none"
  },
});

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout } = useAuth();
  const classes =useStyles();

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };
  

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar  className={classes.root}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            align="center"
          >
            You can do it
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" align="center">
              -- ysn-knkl--
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>

        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: "space-evenly", overflowX: "auto" }}
        >
          <Grid
            container
            maxWidth="lg"
            spacing={2}
            justifyContent="space-around"
          >        
            <Grid item>
              <Link to="/">General</Link>
            </Grid>
            <Grid item>
              <Link to="/technology">Technology</Link>
            </Grid>
            <Grid item>
              <Link to="/camping">Camping</Link>
            </Grid>
            <Grid item>
              <Link to="/sports">Sports</Link>
            </Grid>
            <Grid item>
              <Link to="/theanother">The Another</Link>
            </Grid>
          </Grid>

          {/* <Link
            color="inherit"
            variant="button"
            underline="none"
            to="/"
            sx={{ flexShrink: 0 }}
          >
            General
          </Link>

          <Link
            color="inherit"
            variant="button"
            underline="none"
            to="/technology"
            sx={{ flexShrink: 0 }}
          >
            Technology
          </Link>
          <Link
            color="inherit"
            variant="button"
            underline="none"
            to="/camping"
            sx={{ flexShrink: 0 }}
          >
            Camping
          </Link>
          <Link
            color="inherit"
            variant="button"
            underline="none"
            to="/sports"
            sx={{ flexShrink: 0 }}
          >
            Sports
          </Link>

          <Link
            color="inherit"
            variant="button"
            underline="none"
            to="/theanother"
            sx={{ flexShrink: 0 }}
          >
            The Another
          </Link> */}
        </Toolbar>
      </AppBar>

      {currentUser ? (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "start",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/addItem">New Card</Link>
          </MenuItem>
          <MenuItem onClick={(handleMenuClose, handleLogout)}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login">Login</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/signup">Register</Link>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}
