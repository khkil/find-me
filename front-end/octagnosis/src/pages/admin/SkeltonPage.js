import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { green, orange } from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import DropDownMenu from "../../../components/common/DropDownMenu"
import { useDispatch, useSelector } from "react-redux";
import { getMemberList } from "../../../redux/actions/memberActions";
import MenuBar from "../../../components/MenuBar";
const Divider = styled(MuiDivider)(spacing);


const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${(props) => props.paid && green[500]};
  background: ${(props) => props.sent && orange[700]};
  color: ${(props) =>
    (props.paid || props.sent) && props.theme.palette.common.white};
`;

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const SkeletonPage = ({ match }) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      {/* <MenuBar match={match}/> */}

      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match}/>
        <Grid item>
          <Button variant="contained" color="primary">
            <AddIcon />
            New Order
          </Button>
        </Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
       
          </Paper>

        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SkeletonPage;
