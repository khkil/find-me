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
import { resultMap } from './DataRegistPage';

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

const UserInfoInput = ({ dataForm, setDataForm, user }) => {

  const dispatch = useDispatch();
  const { userName, userGrade, userEtc } = user;
  console.log(user);
  useEffect(() => {
    dispatch(getGroupList());
  }, [groupReducer])

  const groupReducer = useSelector(state => state.groupReducer);
  const { data, error } = groupReducer;  
  
  if(!data) return null;
  return (
    <Grid item xs={12}>
      
      <Autocomplete
        options={data.filter(group => group.name !== null)}
        getOptionLabel={(group) => group.name}
        onChange={(event, value) => { 
          const { idx } = value;
          setDataForm({
            ...dataForm,
            user_info : {
              ...dataForm.user_info,
              group_idx: idx
            }
          })
        }}
        style={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params} 
            label="기관" 
            variant="outlined" 
          />
        }
      />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField 
              name="user_name" 
              label="이름"  
              margin="normal"
              disabled={true}
              value={userName}
              onChange={(e) => {
                const { name, value } = e.target;
                setDataForm({
                  ...dataForm,
                  user_info : {
                    ...dataForm.user_info,
                    [name]: value
                  }
                })
              }
            }
          />
        </Grid> 
        <Grid item xs={6}>
          <TextField 
            name="user_grade" 
            type="number"
            label="학년"  
            margin="normal"
            disabled={true}
            value={userGrade}
            onChange={(e) => {
              const { name, value } = e.target;
              setDataForm({
                ...dataForm,
                user_info : {
                  ...dataForm.user_info,
                  [name]: value
                }
              })
            }
          }/>
          <TextField 
            name="user_etc"
            label="반" 
            margin="normal"
            disabled={true}
            value={userEtc}
            onChange={(e) => {
              const { name, value } = e.target;
              setDataForm({
                ...dataForm,
                user_info : {
                  ...dataForm.user_info,
                  [name]: value
                }
              })

            }}
          />
        </Grid>
        
      </Grid>
     
    </Grid>
  );
}



const DataDetailPage = ({ history, match }) => {

  const classes = useStyles();

  const [dataForm, setDataForm] = useState({
    inspection_idx: 3,
    user_info: {},
    user_answers: []
  });

  const dispatch = useDispatch();

  const userReducer = useSelector(state => state.userReducer);

  useEffect(() => {
    console.log("useEffect");
    const { user_idx } = match.params;
    dispatch(getUserAnswers(user_idx));
  }, [])

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

  const getAnswer = (answers) => {
    let map = {};
    answers.forEach(answer => {
      const { question_idx, answer_idx } = answer;
      map[question_idx] = answer_idx
    })
    return map;
  }

  

  const { data } = userReducer;

  if(!data || !data.questions || !data.answers) return null;

  const { user, questions, answers } = data;
  return (
    <Container maxWidth="lg">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      
        <UserInfoInput user={data.user} dataForm={dataForm} setDataForm={setDataForm}/>

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
              {Object.keys(getQuestions(questions)).map((key, x) => {
                const question = getQuestions(questions)[key];
                return (
                  <StyledTableRow key={x}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Chip
                        size="small"
                        label={`문항 ${x + 1}  ${resultMap[x + 1].title}`}
                        color="primary"
                    />
                    </StyledTableCell>
                    {question.map((value, y) => {
                      const answer = getAnswer(answers);
                      const answerValue = answer[value.question_idx];
                      return (
                        <StyledTableCell align="center" component="th" scope="row" key={y}>
                          <TextField 
                            size="medium" 
                            type="number" 
                            InputProps={{ inputProps: { min: 1, max: 5 } }} 
                            value={answerValue}
                            disabled={true}
                            onChange={(e) => {
                              const { question_idx } = value;
                              const answer_idx = e.target.value;
                              filteredValue(question_idx, answer_idx);
                            }}
                          />
                        </StyledTableCell>
                      )
                    })}


                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4} style={{textAlign:"center", paddingTop:"50px"}}>
            <Paper className={classes.paper}>

           {/*  <Button variant="contained" color="primary" size="large" type="submit">
              등록
            </Button>
 */}
            </Paper>
          </Grid>
          <Grid item xs={4}/>
        </Grid>
        
      </form>
    </Container>
  )
}

export default DataDetailPage;