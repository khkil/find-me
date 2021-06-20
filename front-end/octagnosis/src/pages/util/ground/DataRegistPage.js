import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionList } from '../../../redux/actions/questionActions';
import { columnsTotalWidthSelector } from '@material-ui/data-grid';

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

export const resultList = [
  {
    idx: 10,
    title : "운동형",
  },
  {
    idx: 1,
    title : "운동형",
  },
  {
    idx: 6,
    title : "분석형",
  },
  {
    idx: 3,
    title : "규범형",
  },
  {
    idx: 13,
    title : "진취형",
  },
  {
    idx: 8,
    title : "소통형",
  },
  {
    idx: 9,
    title : "실용형",
  },
  {
    idx: 7,
    title : "생명형",
  },
  {
    idx: 12,
    title : "제작형",
  },
  {
    idx: 4,
    title : "복합형",
  },
  {
    idx: 11,
    title : "원리형",
  },
  {
    idx: 14,
    title : "창조형",
  },
  {
    idx: 15,
    title : "추리형",
  },
  {
    idx: 2,
    title : "교육형",
  },
  {
    idx: 5,
    title : "봉사형",
  }
]
const getQuestions = (questions, resultIdx) => {
  questions.filter(question => {
    console.log(question, resultIdx);

    return resultIdx === question.result_idx;
  })
}
const CustomizedTables = () => {

  const classes = useStyles();
  const { data } = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestionList(3));
  }, [])
  
  if(!data) return null;


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">-</TableCell>
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
          {resultList.map((result, index) => (
            
            <StyledTableRow key={result.idx}>
              <StyledTableCell align="center" component="th" scope="row">
                문항 {index + 1}<br/>
                {result.title}
              </StyledTableCell>
              
              {
                index === 0 && JSON.stringify(getQuestions(data.questions, result.idx))
              }
              <StyledTableCell align="center">test</StyledTableCell>
              <StyledTableCell align="center">test</StyledTableCell>
              <StyledTableCell align="center">test</StyledTableCell>
              <StyledTableCell align="center">test</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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