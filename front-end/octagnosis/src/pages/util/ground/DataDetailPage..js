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
import { Badge, Box, Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getGroupList, registGroup } from '../../../redux/actions/groupActions';
import { getUserAnswers, registUserAnswers } from '../../../redux/actions/userActions';
import { resultMap } from './DataRegistPage';
import { X } from 'react-feather';

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
  root: {
    maxWidth : "1600px"
  },
  table: {
    minWidth: 700,
  },
  rank1: {
    backgroundColor: "#fdcb4d",
    fontSize: "20px"
  },
  rank2: {
    backgroundColor: "#cec4c4",
    fontSize: "20px"
  }
  ,rank3: {
    backgroundColor: "#cd7f32",
    fontSize: "20px"
  },
  resultTable: {
    margin: "50px",
    maxWidth: "800px"
  }
  
});

const rows = [

];

const ResultTable = ({ ranks }) => {

  const classes = useStyles();
  let results = new Object();
  const grades = [1,2,3];
  grades.forEach(grade => {
    let result = [];
    Object.keys(ranks).forEach(key => {
      const { ranking }  = ranks[key];
      ranks[key].resultIdx = key;
      if(grade === ranking){
        result = [...result, ranks[key], ];
      }
    });
    results[grade] = result;
  });

  let maxCount = 0;
  Object.keys(results).forEach(key => {
    const count = results[key].length;
    maxCount = (maxCount < count && count);
  });
 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.resultTable} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              최종순위
            </TableCell>
          </TableRow>
          <TableRow>
            {grades.map((grade, index) => <TableCell key={index} align="center">{`${grade}순위`}</TableCell> )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(Array(maxCount), (e, x) => 
            <TableRow key={x}>
              {grades.map((grade, y) => {
                const result = results[grade];
                const resultIdx = result[x] ? result[x].resultIdx : null;
                return (
                  <TableCell key={y} align="center">
                    <Typography variant="h6">
                    {resultIdx && resultMap[resultIdx].title}  
                    </Typography>
                  </TableCell> 
                )
              })}
            </TableRow>
          )}
{/* 
          <TableRow>
            <TableCell align="center">
              운동형
            </TableCell>
            <TableCell align="center">
              운동형
            </TableCell>
            <TableCell align="center">
              운동형
            </TableCell>
          </TableRow>
           */}
        
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const UserInfoInput = ({ dataForm, setDataForm, user }) => {

  const dispatch = useDispatch();
  const { userName, userGrade, userEtc } = user;
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
              readOnly={true}
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
            readOnly={true}
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
            readOnly={true}
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
    const { user_idx } = match.params;
    dispatch(getUserAnswers(user_idx));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
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
      question.answer_idx = "test";
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

  const getRank = (questions, answers) => {

    let ranks = {};
    const answerMap = getAnswer(answers);
    Object.keys(questions).forEach(key => {
      const scoreList = questions[key].map(question => {
        const { question_idx } = question;
        const score = answerMap[question_idx] ? answerMap[question_idx] : 0;
        return score;
      });
      const totalScore = scoreList.reduce((a, b) => a + b);
      const info = {
        totalScore: totalScore,
      }
      ranks[key] = info;
    });

    Object.keys(ranks).map(x => {
      let rank = ranks[x];
      const { totalScore } = rank;
      let ranking = Object.keys(ranks).length + 1;
      Object.keys(ranks).map(y => { 
        if(ranks[y].totalScore <= totalScore){
          ranking--;
        }
      })
      rank.ranking = ranking;
      return rank;
    });
    return ranks;
  }


  const { data } = userReducer;

  if(!data || !data.questions || !data.answers) return null;

  const { user, answers } = data;
  const questions = getQuestions(data.questions);
  const rank = getRank(questions, answers);
  
  
  return (
    <Container maxWidth="lg" className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      
        <UserInfoInput user={data.user} dataForm={dataForm} setDataForm={setDataForm}/>

        <TableContainer component={Paper}>
        
          <Table className={classes.table} aria-label="customized table" size="small"> 
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">-</TableCell>
                {Object.keys(questions).map((key, x) => {
                  const question = questions[key];
                  return (
                    <TableCell key={x} align="center" width="5%">
                      {`${x + 1}번`}
                    </TableCell>
                  )
                })}
                
                
                <TableCell align="center" width="5%">총점</TableCell>
                <TableCell align="center" width="7%">성향 순위</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(questions).map((key, x) => {
                
                const question = questions[key];
                const { totalScore, ranking } = rank[key];
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
                            InputProps={{ inputProps: { min: 1, max: 5, style: {textAlign: 'center'} } }} 
                            value={answerValue}
                            readOnly={true}
                            onChange={(e) => {
                              const { question_idx } = value;
                              const answer_idx = e.target.value;
                              filteredValue(question_idx, answer_idx);
                            }}
                          />
                        </StyledTableCell>
                      )
                    })}
                    <StyledTableCell align="center" component="th" scope="row">
                      <Typography variant="h6" >
                        {totalScore}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                    
                      {ranking < 4 ?
                        <Chip
                          size="medium"
                          mr={5}
                          mb={5}
                          label={ranking}
                          className={classes[`rank${ranking}`]}
                        /> :
                        <Typography variant="h6" className={classes[`rank${ranking}`]}>
                          {ranking}
                        </Typography>

                      }
                     
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <ResultTable ranks={rank}/>
       {/*  <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}/>
          <Grid item xs={4} style={{textAlign:"center", paddingTop:"50px"}}>
            <Paper className={classes.paper}>

            <Button variant="contained" color="primary" size="large" type="submit">
              등록
            </Button>
         
            </Paper>
          </Grid>
          <Grid item xs={4}/>
        </Grid> */}
        
      </form>
    </Container>
  )
}

export default DataDetailPage;