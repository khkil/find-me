import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components/macro";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Chip as MuiChip,
  Divider as MuiDivider,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  Paper,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import { DragHandle, Delete, Assignment } from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import { getInspectionList } from "../../../redux/actions/inspectionActions";
import { Col, Row, Tabs, Table } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Loader from "../../../components/Loader";
import { getResultList } from "../../../redux/actions/resultActions";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AddIcon } from "@material-ui/data-grid";
import { deleteQuestion } from "../../../services/questionService";
import AlertDialog from "../../../components/common/AlertDialog";

const Divider = styled(MuiDivider)(spacing);
const useStyles = makeStyles({
  results_tab: {
    borderRight: "1px solid #cccc"
  },
  deleteIcon: {
    cursor: "pointer",
    float: "right"
  },
  questionList: {
    paddingTop: 4,
    paddingBottom: 0,
  },
  question: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "white",
    borderRadius: "40px",
    border: "1px solid #cccc"
  }
});
const Question = memo(({ question, questionOrders, setQuestionOrders, index }) => {
  const classes = useStyles();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const { questionIdx, questionNumber, questionText } = question; 

  const onDelete = (questionIdx) => {
    
    deleteQuestion(questionIdx)
    .then(() => {
      const questions = questionOrders.filter(question => question.questionIdx !== questionIdx);
      setQuestionOrders(questions);
      setShowDeleteDialog(false);
      
    }).catch(e => {
      console.error(e);
      alert("server error");
    });
  }
  return (
    <List>
      <AlertDialog 
        title={"해당 문항을 삭제 하시겠습니까?"}
        desc={"삭제 후 복원 가능합니다"}
        open={showDeleteDialog} 
        setOpen={setShowDeleteDialog} 
        callback={() => { onDelete(questionIdx) }}
      />
        
      <Draggable key={questionIdx} draggableId={`question_${questionIdx}`} index={index}>
        
        {(provided, snapshot) => (

          <ListItem
            className={classes.question}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DragHandle/>
            <ListItemText primary={<Typography variant="h6">{questionNumber}. {questionText}</Typography>}/>
            <IconButton edge="end" aria-label="delete" children={<Assignment color="secondary"/>}/>
            <IconButton edge="end" aria-label="delete" children={<Delete color="error"/>} onClick={() => { setShowDeleteDialog(true) }}/>
          </ListItem>
        )}
      </Draggable>
    </List>

  )
}
  
)

const QuestionList = memo(({ results, selectedResult}) => {
  //https://codesandbox.io/s/zqwz5n5p9x?file=/src/index.js:1575-1582
  const initialQuestions = useMemo(() => results[selectedResult] && results[selectedResult].questionList ? results[selectedResult].questionList.sort((a, b) => a.questionIdx - b.questionIdx) : []);
  const minNumber = useMemo(() => Math.min(...initialQuestions.map(({ questionNumber }) => Number(questionNumber))));
  const [questionOrders, setQuestionOrders] = useState(initialQuestions);

  const onDragEnd = (e) => {
    const { destination, source } = e;
    const orderedList = reOrder(questionOrders, source.index, destination.index);
    setQuestionOrders(orderedList);
  }

  const reOrder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list.map((obj,index) => ({...obj, questionNumber : minNumber + index }));
  }
  
  useEffect(() => {
    setQuestionOrders(initialQuestions);
  }, [selectedResult]);

  return (
    <Grid>
      <Grid justify="space-between" container spacing={24}>
        <Grid item>
        <FormControlLabel
            control={<Checkbox name="gilad" />}
            label="삭제 된 문항 포함"
          />
        </Grid>
        <Grid item>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {questionOrders.map((question, index) => (
                <Question question={question} questionOrders={questionOrders} setQuestionOrders={setQuestionOrders} key={index} index={index}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  )
})
const ResultList = ({ selectedInspection }) => {

  const classes = useStyles();

  const disptach = useDispatch();
  const inspectionReducer = useSelector(state => state.inspectionReducer);
  const { loading, response } = useSelector(state => state.resultReducer);
  const { inspectionIdx } = inspectionReducer.response.data[selectedInspection];

  const [selectedResult, setSelectedResult] = useState(0);
  
  useEffect(() => {
    const param = { inspectionIdx: inspectionIdx };
    disptach(getResultList(param));
    setSelectedResult(0);

  }, [selectedInspection])
  
  if(!response) return null;
  return (
    <Grid container spacing={4}>
      <Grid item className={classes.results_tab} item xs={1}>
      
        <Tab.Container 
          id="left-tabs-example" 
          defaultActiveKey={selectedResult}
          onSelect={(v) => setSelectedResult(v)}
        >
          <Row>
            <Col className="taC">
              <Nav variant="pills" className="flex-column">
                {response.data.map(({ resultName }, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={index}>{resultName}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </Grid>
      <Grid item xs={11}>
        <QuestionList results={response.data} selectedResult={selectedResult}/>
      </Grid>
    </Grid>
  )

}
const AdminQuestionListPage = ({ match }) => {

  const dispatch = useDispatch();
  const { response, loading } = useSelector(state => state.inspectionReducer);

  const [selectedInspection, setSelectedInspection] = useState(0);
  const firstUpdate = useRef(true);
  const payYn = match.path.includes("free") ? "N" : "Y";

  useEffect(() => {
    
    const params = {
      payYn: payYn
    }
    dispatch(getInspectionList(params));

    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  }, []);

  
  if(loading) return <Loader/>;
  if(!response || firstUpdate.current) return null;

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
      <Divider my={3} />
      <Tabs 
        activeKey={selectedInspection}
        onSelect={(value) => setSelectedInspection(value)} 
        className="mb-3">
        {response.data.map(({ inspectionName }, index) => 
          <Tab key={index} eventKey={index} title={inspectionName}/>
        )}
      </Tabs>
      <ResultList selectedInspection={selectedInspection}/>
    </React.Fragment>
  );
}

export default AdminQuestionListPage;
