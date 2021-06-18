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
const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

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

const AdminMemberList = (props) => {
  
  const dispatch = useDispatch();
  const members = useSelector(state => state.dataReducer);
  const { data } = members;
  useEffect(() => {
    dispatch(getMemberList());
  }, []);

  
  if(!data || !data.memberList) return null;
  return (
    <React.Fragment>
      <Helmet title="회원 목록" />

      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            회원목록
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Typography>회원 관리</Typography>
            <Link component={NavLink} exact to="/admin/members">
              회원 목록
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              회원 추가
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper>
            {/* <Toolbar>
              <ToolbarTitle>
              <Typography variant="h6" id="tableTitle">
                회원
              </Typography>
              </ToolbarTitle>
            </Toolbar> */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">이름</TableCell>
                  <TableCell align="center">아이디</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center">휴대전화</TableCell>
                  <TableCell align="center">가입일</TableCell>
                  <TableCell align="center">기능</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.memberList.map((member, index) => (

                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{member.name}</StyledTableCell>
                    <StyledTableCell align="center">{member.id}</StyledTableCell>
                    <StyledTableCell align="center">{member.email}</StyledTableCell>
                    <StyledTableCell align="center">{member.phone}</StyledTableCell>
                    <StyledTableCell align="center">{member.cdate}</StyledTableCell>
                    <StyledTableCell align="center">
                      <DropDownMenu idx={member.idx}/>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                

              </TableBody>

            </Table>
          </Paper>

        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AdminMemberList;
