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
import { Button, Container, Menu, MenuItem, ListItemIcon, IconButton, Link, Typography, Tabs, Tab, Box } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserList, modifyUser } from '../../../redux/actions/userActions';
import Loading from '../../../components/common/Loading';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import InputAdornment from "@material-ui/core/InputAdornment";
import {
 TextField,
} from "@material-ui/core"
import { SearchIcon } from '@material-ui/data-grid';
import { getGroupDetail, getGroupList } from '../../../redux/actions/groupActions';
import { dateFormat } from '../../../utils/util';
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

const useStyles = makeStyles((theme) => ({
  root : {
    paddingTop: "100px"
  },
  table: {
    minWidth: 700,
  },
  searchBar: {
    minWidth: "40%",
  },
  groupBar: {
    float: "right",
    padding: 10
  },
  refreshButton: {
    float: "right",
  },
  tab : {
    marginTop: 20,
    marginBottom: 20
  },
  paging: {
    '& > *': {
      marginTop: theme.spacing(2),
      justifyContent:"center",
      display:'flex'
    },
  },
}));

const Groups = ({ selectGroup, selectedGroup, setSelectedGroup, selectedGrade, setSelectedGrade, query, searchParams }) => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { data } = useSelector(state => state.groupReducer);
  const { group_idx } = query;
  

  
  const changeGroup = (groupIdx) => {
    searchParams.delete("grade");
    setSelectedGrade("");
    setSelectedGroup(groupIdx);
    selectGroup(groupIdx);
  }
  useEffect(() => {
    dispatch(getGroupList());
    

  }, [])
  if(!data) return null;
  console.log(data);
  
  return (
    <>
    {
      (Array.from(group_idx && data ? data.find(group => group.idx == group_idx).grades : []).length > 0) &&
      <Autocomplete
        className={classes.groupBar}
        options={Array.from(group_idx && data ? data.find(group => group.idx == group_idx).grades : [])}
        getOptionLabel={grade => grade.toString()}
        name="grade"
        onChange={(e, value) => { 
          if(value){
            searchParams.set("grade", value);
          }else{
            searchParams.delete("grade");
          }
          
          history.push({
            pathname: location.pathname,
            search: searchParams.toString()
          })
          
          setSelectedGrade(value);
        }}
        value={selectedGrade}
        
        style={{ width: 200 }}
        renderInput={(params) =>
          <TextField {...params} 
            label="학년(나이)" 
            variant="outlined" 
          />
        }
      />
      }
      
      <Autocomplete
        className={classes.groupBar}
        options={data.filter(group => group.name !== null)}
        getOptionLabel={(group) => group.name}
        name="group_idx"
        onChange={(e, v) => { 
          const groupIdx = (v ? v.idx : "");
          changeGroup(groupIdx);
          
        }}
      
        value={data.find(group => group.idx == group_idx)}
        style={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params} 
            label="기관(학교명)" 
            variant="outlined" 
          />
        }
      />
    </>
  )
}

const Buttons = ({ userIdx, history, currentPage, value, setValue }) => {
  const dispatch = useDispatch();
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

  const onDelete = () => {
    if(confirm("해당 유저를 삭제 하시겠습니까?")){
      dispatch(deleteUser(userIdx))
      .then(() => {
        dispatch(getUserList(3, currentPage, {}));
      });
    }
  }

  const onRestore = () => {
    if(confirm("해당 유저를 복원 하시겠습니까?")){
      const params = {
        user: {userIdx: userIdx, delYn: "N"}
      }
      dispatch(modifyUser(userIdx, params))
      .then(() => {
        setValue(0);
        history.push("/ground/users");
        dispatch(getUserList(3, currentPage, {}));
      });
    }
  }

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
        {value === 0 ? 
          <MenuItem onClick={onDelete}>삭제</MenuItem> :
          <MenuItem onClick={onRestore}>복원</MenuItem>
        }
        
        <MenuItem onClick={handleClose}>닫기</MenuItem>
      </Menu>
    </>
  )
}


const DataListPage = ({ history, location }) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const query = queryString.parse(location.search);
  const { page, text, del_yn, group_idx, grade } = query;
  let searchParams = new URLSearchParams(location.search); 

  const [searchText, setSearchText] = useState(text || "");
  const [selectedGroup, setSelectedGroup] = useState(Number(group_idx) || "");
  const [selectedGrade, setSelectedGrade] = useState(Number(grade) || "");
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [value, setValue] = useState(del_yn && del_yn === "Y" ? 1 : 0);

  const handleChangeTab = (event, newValue) => {
    const path = '/ground/users'  + (newValue === 1 ? `?del_yn=Y` : '');
    history.push(path);
    setValue(newValue);
  };

  const goPage = (event, page) => {
    searchParams.set("page", page);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    })
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchText(value);
  }

  const handleKeyDown = (e) => {
    const { key } = e;
    if(key === "Enter"){
      search();
    }
  }
  const search = () => {
    setCurrentPage(1);
    searchParams.delete("page");
    searchParams.set("text", searchText);
    searchParams.set("group_idx", selectedGroup);
    searchParams.set("grade", selectedGrade);

    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }

  const selectGroup = (groupIdx) => {
    setCurrentPage(1);
    searchParams.delete("page");
    searchParams.set("group_idx", groupIdx);

    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }

  const refresh = () => {
    dispatch(getUserList(3, 1, {}));
    history.push("/ground/users");
  }

  const { data, loading } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getUserList(3, currentPage, query));
  }, []);

  if(loading) return <Loading/>;
  if(!data || !data.list) return null;

  const { list, pages, total, startRow } = data;
  let startNum = total - startRow + 1;
  
  return (
    <Container maxWidth="lg" className={classes.root}>

      <Box display="inline-block">
        <Button color="primary" variant="contained" className={classes.refreshButton} onClick={refresh}>
          검색 초기화
        </Button>
      </Box>
      <Box>
        <TextField
          className={classes.searchBar}
          label="이름, 기관(학교명)명을 입력하세요"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={search}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Groups selectGroup={selectGroup} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} query={query} searchParams={searchParams}></Groups>
      </Box>
      <Paper square>
        <Tabs
          className={classes.tab}
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          aria-label="disabled tabs example"
        >
          <Tab label="사용 중 유저" />
          <Tab label="삭제된 유저"/>
        </Tabs>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">기관(학교명)</TableCell>
              <TableCell align="center">나이(학년)</TableCell>
              <TableCell align="center">반</TableCell>
              <TableCell align="center">시행일</TableCell>
              <TableCell align="center">기능</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ userIdx, userName, userGrade, userEtc, cdate, group }) => (
              <StyledTableRow key={ userIdx }>
                <StyledTableCell component="th" scope="row">
                  {startNum--}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link onClick={() => {history.push(`/ground/users/${userIdx}`)}}>
                    <Typography variant="h5">
                      {userName}
                    </Typography>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">{group && group.name}</StyledTableCell>
                <StyledTableCell align="center">{userGrade}</StyledTableCell>
                <StyledTableCell align="center">{userEtc}</StyledTableCell>
                <StyledTableCell align="center">{dateFormat(cdate)}</StyledTableCell>
                <StyledTableCell align="center">
                  <Buttons userIdx={userIdx} history={history} currentPage={currentPage} value={value} setValue={setValue}/>
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