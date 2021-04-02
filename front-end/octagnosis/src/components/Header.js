import React, { useEffect, useState } from "react";
import styled, { withTheme } from "styled-components/macro";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { withRouter } from 'react-router';

import {
  Grid,
  Hidden,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  TextField,
  Typography,
  Button,
  AppBar,
  IconButton
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import NotificationsDropdown from "./NotificationsDropdown";
import MessagesDropdown from "./MessagesDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import UserDropdown from "./UserDropdown";
import { sidebarRoutes as routes } from "../routes/index";
import { Autocomplete } from "@material-ui/lab";




const Header = () => {


  return (
    <React.Fragment>

      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            News
        </Typography>
          <Button color="inherit">Login</Button> */}
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6" >
                test
              </Typography>
            </Grid>
            <Grid item xs>


            </Grid>
            <Grid item xs />
            <Grid item>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
