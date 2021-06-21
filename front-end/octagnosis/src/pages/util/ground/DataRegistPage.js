import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionList } from '../../../redux/actions/questionActions';
import { columnsTotalWidthSelector } from '@material-ui/data-grid';
import { Box, Button, Chip, Container, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getGroupList } from '../../../redux/actions/groupActions';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export const resultMap = {
  1: {title: "운동형"}
  ,2: {title: "교육형"}
  ,3: {title: "규범형"}
  ,4: {title: "복합형"}
  ,5: {title: "봉사형"}
  ,6: {title: "분석형"}
  ,7: {title: "생명형"}
  ,8: {title: "소통형"}
  ,9: {title: "실용형"}
  ,10: {title: "운동형"}
  ,11: {title: "원리형"}
  ,12: {title: "제작형"}
  ,13: {title: "진취형"}
  ,14: {title: "창조형"}
  ,15: {title: "추리형"} 
}
const getQuestions = (questions) => {
  
  let result = new Object();
  questions.forEach(question => {
    const key = question.result_idx;
    if(!result[key]){
      result[key] = [question];
    }else{
      result[key] = [...result[key], question];
    }
    
  });
  return result;
}

const GroupComboBox = () => {

  const dispatch = useDispatch();
  const [form, setForm] = useState({ flag: -1});
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const registGroup = () => {
    
  }
  
  
  useEffect(() => {
    dispatch(getGroupList());
  }, [group])

  const group = useSelector(state => state.groupReducer);
  const { data } = group;
  if(!data) return null;
  return (
    <>
      <Box style={{padding: "20px"}}>
        <Button variant="contained" color="primary" onClick={toggleForm}>{showForm ? "- 등록취소" : "+ 기관등록"}</Button>
      </Box>
      {showForm ? (
          <Box style={{padding: "20px"}}>
            <TextField label="기관명" margin="normal" name="name" onChange={handleChange}/><br/>
            <Button variant="contained" color="primary">등록</Button>
          </Box>
        ) : (
          <Autocomplete
            options={data}
            getOptionLabel={(group) => group.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="기관" variant="outlined" />}
      />)
      }
    </>
  );
}

const groups = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];


const CustomizedTables = () => {

  const classes = useStyles();
  const { data } = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
  }
  useEffect(() => {
    dispatch(getQuestionList(3));
  }, [])

  
  if(!data) return null;


  return (
    <Container maxWidth="lg">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <GroupComboBox/>
        <TextField label="학년" margin="normal"/>
        <TextField label="반" margin="normal"/>
      </Grid>
      
        <TableContainer component={Paper}>
        
          <Table className={classes.table} aria-label="customized table" size="small"> 
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">-</TableCell>
                <TableCell align="center">1번</TableCell>
                <TableCell align="center">2번</TableCell>
                <TableCell align="center">3번</TableCell>
                <TableCell align="center">4번</TableCell>
                <TableCell align="center">5번</TableCell>
                <TableCell align="center">6번</TableCell>
                <TableCell align="center">7번</TableCell>
                <TableCell align="center">8번</TableCell>
                <TableCell align="center">9번</TableCell>
                <TableCell align="center">10번</TableCell>
                <TableCell align="center">11번</TableCell>
                <TableCell align="center">12번</TableCell>
                <TableCell align="center">13번</TableCell>
                <TableCell align="center">14번</TableCell>
                <TableCell align="center">15번</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(getQuestions(data.questions)).map((key, x) => (
                
                <StyledTableRow key={x}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <Chip
                      size="small"
                      label={`문항 ${x + 1}  ${resultMap[x + 1].title}`}
                      color="primary"
                  />
                  </StyledTableCell>
                  
                  {getQuestions(data.questions)[key].map((value, y) => (
                    <StyledTableCell align="center" component="th" scope="row" key={y}>
                      <TextField size="small" type="number" required={true}/>
                    </StyledTableCell>
                  ))}
                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4} style={{textAlign:"center", paddingTop:"50px"}}>
            <Paper className={classes.paper}>

            <Button variant="contained" color="primary" type="submit">
              등록
            </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}/>
        </Grid>
        
      </form>
    </Container>
  );
}

const DataRegistPage = () => {
  return (
    <div>
      <CustomizedTables></CustomizedTables>
    </div>
  )
}

export default DataRegistPage;