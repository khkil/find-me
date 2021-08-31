import React, { useCallback, useEffect, useState } from "react";
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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
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
import { getInspectionList } from "../../../redux/actions/inspectionActions";
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
const InpectionList = ({ payYn }) => {
  const { response } = useSelector(state => state.inspectionReducer);
  useEffect(() => {
    
  }, []);

  if(!response) return null;
  return (
    <div>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
        >
          {response.data.map(({ inspectionName }) => 
            <Tab label={inspectionName} />  
          )}
          
        </Tabs>
    </div>
  )
}
const AdminQuestionListPage = ({ match }) => {

  const dispatch = useDispatch();

  const [inspection, setInspection] = useState(1);
  const [result, setResult] = useState(1);
  const payYn = match.path.includes("free") ? "N" : "Y";

  const changeResult = (event, value) => {
    setResult(value);
  };

  useEffect(() => {
    const params = {
      payYn: payYn
    }
    dispatch(getInspectionList(params));
  }, []);


  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      <Grid justify="space-between" container spacing={10}>
        <MenuBar match={match} />
        {/* <Grid item>
          <Button variant="contained" color="primary">
            <AddIcon />
            New Order
          </Button>
        </Grid> */}
      </Grid>
      <Divider my={6} />
      <InpectionList payYn={payYn} />
      <Divider my={1} />
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <Paper>
            <Tabs
              value={result}
              onChange={changeResult}
              indicatorColor="primary"
              textColor="primary"
              orientation="vertical"
              variant="scrollable"
              scrollButtons="auto"
            >
            <Tab
              label={"Node "}
            />
          </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            asdad
          </Paper>
        </Grid>
      </Grid>

     
    </React.Fragment>
  );
}

export default AdminQuestionListPage;
