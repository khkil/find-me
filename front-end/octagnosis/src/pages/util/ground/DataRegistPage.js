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
import { registUserAnswers } from '../../../redux/actions/userActions';

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

const UserInfoInput = ({ dataForm, setDataForm }) => {

  const dispatch = useDispatch();
  const [groupForm, setGroupForm] = useState({ flag: -1});
  const [showGroupForm, setShowGroupForm] = useState(false);

  const toggleForm = () => {
    setShowGroupForm(!showGroupForm);
  }

  const handleChangeGroup = (e) => {
    const { name, value } = e.target;
    setGroupForm({
      ...groupForm,
      [name]: value
    })
  }

  const onCreateGroup = () => {
    const { name } = groupForm;
    if(!name){
      alert("기관명을 입력해주세요"); 
      return false;
    } 
    dispatch(registGroup(groupForm))
    .then(() => {
      if(groupReducer.error){
        alert("등록시 오류 발생")
      }else{
        alert(`${name} 기관이 등록되었습니다`)
        setShowGroupForm(false);
        setGroupForm({});
      }
    }); 
  }
  
  useEffect(() => {
    dispatch(getGroupList());
  }, [groupReducer])

  const groupReducer = useSelector(state => state.groupReducer);
  
  if(!groupReducer.data) return null;
  return (
    <Grid item xs={12}>
      <Box style={{padding: "20px"}}>
        <Button variant="contained" color={showGroupForm ? "default" : "primary"} onClick={toggleForm}>{showGroupForm ? "- 등록취소" : "+ 기관등록"}</Button>
      </Box> 
      {showGroupForm ? (
        <Box style={{padding: "20px"}}>
          <TextField label="기관명" margin="normal" name="name" onChange={handleChangeGroup} defaultValue={groupForm.name}/><br/>
          <Button variant="contained" color="primary" onClick={onCreateGroup}>등록</Button>
        </Box>
        ) : (
        <Autocomplete
          options={groupReducer.data.filter(group => group.name !== null)}
          getOptionLabel={(group) => group.name}
          onChange={(event, value) => { 
            if(value){
              const { idx } = value;
              setDataForm({
                ...dataForm,
                user_info : {
                  ...dataForm.user_info,
                  group_idx: idx
                }
              })
            }
          }}
          style={{ width: 300 }}
          renderInput={(params) =>
            <TextField {...params} 
              label="기관" 
              variant="outlined" 
            />
          }
        />
      )}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TextField 
              name="user_name" 
              label="이름"  
              margin="normal"
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


const DataRegistPage = ({ history }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.dataReducer);
  const userReducer = useSelector(state => state.userReducer);

  const [dataForm, setDataForm] = useState({
    inspection_idx: 3,
    user_info: {},
    user_answers: []
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirm("등록하시겠습니까?")){
      dispatch(registUserAnswers(dataForm, history));
    }
  }
  useEffect(() => {
    console.log(userReducer);
    const { data } = userReducer;
    if(data && data.user_idx){
      history.push(`/ground/users/${data.user_idx}`);
    }
  }, [userReducer])


  useEffect(() => {
    dispatch(getQuestionList(3));
  }, [])

  
  if(!data) return null;


  return (
    <Container maxWidth="lg">
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      
        <UserInfoInput dataForm={dataForm} setDataForm={setDataForm}/>
      
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
                  
                  {getQuestions(data.questions)[key].map((value, y) =>  (
                    <StyledTableCell align="center" component="th" scope="row" key={y}>
                      <TextField 
                        size="medium" 
                        type="number" 
                        InputProps={{ inputProps: { min: 1, max: 5 } }} 
                        onChange={(e) => {
                          const { question_idx } = value;
                          const answer_idx = e.target.value;
                          filteredValue(question_idx, answer_idx);
                        }}
                      />
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

export default DataRegistPage;