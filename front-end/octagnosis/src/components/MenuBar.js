import { Breadcrumbs, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { AddIcon } from "@material-ui/data-grid";
import { DriveEtaTwoTone } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { sidebarRoutes as routes} from "../routes";

const MenuBar = ({ match }) => {

  const useStyles = makeStyles({
    menu: {
      padding: '10px',
    }
  });
  const classes = useStyles();

  const menuInfo = useCallback(() => {
    let menu = {};
    routes.forEach(route => {
      const { children, id, group } = route;
      if(children && Object.keys(menu).length === 0){
        children.some(child => {
          if(match.path === child.path){
            menu = { group: group, parent: id, child: child.name }
          }
        })
      }
    });
    return menu;
  })

  const [menu, setMenu] = useState({});

  useEffect(() => {
    setMenu(menuInfo());
  }, [match])
 
  return (
    <Grid item>
      <Typography variant="h3" gutterBottom display="inline">
        {menu.child}
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>{menu.group}</Typography>
        <Typography>{menu.parent}</Typography>
        <Typography>{menu.child}</Typography>
      </Breadcrumbs>
    </Grid> 
  )
}

export default MenuBar;