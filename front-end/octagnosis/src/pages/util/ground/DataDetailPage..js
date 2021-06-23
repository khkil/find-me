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
import { getGroupList, registGroup } from '../../../redux/actions/groupActions';
import { getUserAnswers, registUserAnswers } from '../../../redux/actions/userActions';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});




const DataDetailPage = ({ history, match }) => {

  const classes = useStyles();
  const { data } = useSelector(state => state.dataReducer);

  const [dataForm, setDataForm] = useState({
    inspection_idx: 3,
    user_info: {},
    user_answers: []
  });

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(history);
    if(confirm("등록하시겠습니까?")){
      dispatch(registUserAnswers(dataForm))
      .then(() => {
        const { data } = userReducer.data;
        if(data){
          const { user_idx } = data;
          history.push(`/ground/users/${user_idx}`);
        }
      });
    }
  }

  const filteredValue = (questionIdx, answerIdx) => {
    const { user_answers } = dataForm;
    const values = user_answers.map(answer => answer.question_idx);
    const containedIndex = values.indexOf(questionIdx);
    const filteredAnswers = user_answers.filter((answer, index) => index !== containedIndex);

    setDataForm({
      ...dataForm,
      user_answers: [...(containedIndex > -1 ? filteredAnswers : user_answers), {
        question_idx: questionIdx,
        answer_idx: answerIdx
      }]
    })
    
  }
  useEffect(() => {
    console.log(match);
    const { user_idx } = match.params;
    dispatch(getUserAnswers(user_idx));
  }, [])

  


  return (
    <Container maxWidth="lg">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      
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
            
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4} style={{textAlign:"center", paddingTop:"50px"}}>
            <Paper className={classes.paper}>

            <Button variant="contained" color="primary" size="large" type="submit">
              등록
            </Button>

            </Paper>
          </Grid>
          <Grid item xs={4}/>
        </Grid>
        
      </form>
    </Container>
  )
}

export default DataDetailPage;