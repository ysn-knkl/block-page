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
import { makeStyles } from "@mui/styles";
import { useAuth } from "../utils/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "#046582",
    underline: "none",
  },
  btn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "50%",
    border: 0,
    color: "white",
    height: 50,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
});

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout } = useAuth();
  const classes = useStyles();
  const history = useHistory();

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

  const handleBtnClick = (value) => {
    history.push(value);
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="statik">
        <Toolbar className={classes.root}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            align="center"
          >
            Expand Your
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
          variant="regular"
          sx={{ justifyContent: "space-evenly", overflowX: "auto", background: 'linear-gradient(to right bottom, #046582, #658582)' }}
        >
          <Grid
            container
            maxWidth="lg"
            spacing={2}
            justifyContent="space-around"
          >
            <Grid item>
              <Button className={classes.btn} variant="secondary" onClick={()=> handleBtnClick("/")}>General</Button>
            </Grid>
            <Grid item>
              <Button className={classes.btn} variant="secondary" onClick={()=> handleBtnClick("camping")}>Camping</Button>
            </Grid>
            <Grid item>
              <Button className={classes.btn} variant="secondary" onClick={()=> handleBtnClick("/technology")}>Technology</Button>
            </Grid>
            <Grid item>
              <Button className={classes.btn} variant="secondary" onClick={()=> handleBtnClick("/sports")}>Sports</Button>
            </Grid>
            <Grid item>
              <Button className={classes.btn} variant="secondary" onClick={()=> handleBtnClick("/theanother")}>The Another</Button>
            </Grid>
           
          </Grid>
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
            vertical: "bottom",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/profile">Profile</Link>
          </MenuItem>
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
