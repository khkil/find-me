import { Breadcrumbs, Typography } from "@material-ui/core";
import { DriveEtaTwoTone } from "@material-ui/icons";
import React, { useCallback } from "react";
import { Grid } from "react-feather";
import { Link, NavLink, useHistory } from "react-router-dom";
import { sidebarRoutes as routes} from "../routes";

const MenuBar = ({ match }) => {
  const menu = useCallback(() => {
    let obj = {};
 
  })
  return (
    <div>
      <Typography variant="h3" gutterBottom display="inline">
        회원 상세{JSON.stringify(menu)}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>회원 관리</Typography>
      
        <Typography>회원 상세</Typography>
      </Breadcrumbs>
    </div>
  )
}

export default MenuBar;