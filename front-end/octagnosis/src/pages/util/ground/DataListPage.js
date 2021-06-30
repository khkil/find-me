import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import { Button, Container, Menu, MenuItem, ListItemIcon, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../redux/actions/userActions';
import Loading from '../../../components/common/Loading';
import { useHistory } from 'react-router-dom';


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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const useStyles = makeStyles((theme) => ({
  root : {
    paddingTop: "100px"
  },
  table: {
    minWidth: 700,
  },
  paging: {
    '& > *': {
      marginTop: theme.spacing(2),
      justifyContent:"center",
      display:'flex'
    },
  },
}));

const Buttons = ({ userIdx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const userDetail = () => {
    const path = location.pathname;
    history.push(`${path}/${userIdx}`);
  }

  const history = useHistory();

  return (
    <>
      <IconButton
        aria-label="more"
        aria-haspopup="true"
        onClick={handleClick}
        style={{padding: "0px"}}
      >
        <MoreHorizIcon  />
      </IconButton>
      <Menu
        id="icon-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={userDetail}>상세정보</MenuItem>
        <MenuItem onClick={handleClose}>닫기</MenuItem>
      </Menu>
    </>
  )
}

const DataListPage = ({ history, location }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const { page } = queryString.parse(location.search);
  let searchParams = new URLSearchParams(location.search); 

  const [currentPage, setCurrentPage] = useState(1);

  const goPage = (event, page) => {
    searchParams.set("page", page);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    })
    setCurrentPage(page);
  };
  
  const { data, loading } = useSelector(state => state.userReducer);
  useEffect(() => {
    if(page){
      setCurrentPage(parseInt(page));
    }
    dispatch(getUserList(3, currentPage));
    console.log("useEffect")
  }, [page])


  console.log("render")
  if(loading) return <Loading/>;
  if(!data || !data.list) return null;

  const { list, pages, total, startRow, endRow } = data;
  let startNum = total - startRow + 1;
  
  return (
    <Container maxWidth="lg" className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">기관</TableCell>
              <TableCell align="center">학년</TableCell>
              <TableCell align="center">반</TableCell>
              <TableCell align="center">등록일</TableCell>
              <TableCell align="center">기능</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ userIdx, userName, userGrade, userEtc, cdate, group }) => (
              <StyledTableRow key={ userIdx }>
                <StyledTableCell component="th" scope="row">
                  {startNum--}
                </StyledTableCell>
                <StyledTableCell align="center">{userName}</StyledTableCell>
                <StyledTableCell align="center">{group && group.name}</StyledTableCell>
                <StyledTableCell align="center">{userGrade}</StyledTableCell>
                <StyledTableCell align="center">{userEtc}</StyledTableCell>
                <StyledTableCell align="center">{cdate}</StyledTableCell>
                <StyledTableCell align="center">
                  <Buttons userIdx={userIdx}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.paging}>
        {/* <Pagination count={10} defaultPage={page && parseInt(page)}  color="primary" onChange={goPage} /> */}
        <Pagination count={pages} page={currentPage} onChange={goPage}  />
      </div>
    </Container>
  )
}

export default DataListPage;