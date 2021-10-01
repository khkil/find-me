import React, { memo, useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography, RadioGroup, Radio, FormControlLabel, Divider } from '@material-ui/core';
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import { getQuestionDetail } from '../../../services/questionService';
import Loader from '../../../components/Loader';
import { CloseIcon } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  answer: {
    maxWidth: "200px",

  },
  dropzone: {
    minHeight: "200px"
  },
  preview: {
    padding: "0px",
    margin: "0 auto",
    marginTop: "15px",
    
  }
}));

const Answer = memo(({ answer, changeAnswer }) => {
  const classes = useStyles();
  const { answerIdx, answerText, answerScore } = answer;
  return (
    <Grid  key={answerIdx} item xs className={classes.answer}>
      <DropzoneArea 
        filesLimit={1}
        onChange={(e) => { console.log(e) }}
        getPreviewIcon={(file) => {
          if (file.file.type.split('/')[0] === 'image')
            return (
              <img role="presentation" src="https://storage.googleapis.com/careercompany/1.jpg"/>
            );
        }}
        previewGridClasses={{
          item: classes.preview,
        }}
      />
      <TextField
        label="답변명"
        name="answerText"
        defaultValue={answerText}
        className={classes.textField}
        onChange={(e) => changeAnswer(answerIdx, e)}
        margin="dense"
        variant="outlined"
      />
      <TextField
        label="배점"
        type="number"
        name="answerScore"
        defaultValue={answerScore}
        className={classes.textField}
        onChange={(e) => changeAnswer(answerIdx, e)}
        margin="dense"
        variant="outlined"
      />
    </Grid>
  )

});

const AdminQuestionDetail = ({ selectedQuestionIdx, setSelectedQuestionIdx}) => {

  const classes = useStyles();
  const open = useMemo(() => selectedQuestionIdx > 0);

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});

  const changeQuestion = (e) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: value
    })
  }

  const changeAnswer = (answerIdx, e) => {

    const { name, value } = e.target;
    let { answers } = question;
    
    const index = answers.map(answer => answer.answerIdx).indexOf(answerIdx);
    answers.splice(index, 1, { ...answers[index], [name] : value });

    setQuestion({
      ...question,
      answers: answers
    });
  }

  useEffect(() => { 
    
  }, [question])

  const onClose = () => {
    setSelectedQuestionIdx(0)
  };

  useEffect(() => {
    console.log("selectedQuestionIdx", selectedQuestionIdx);
    if(open){
      setQuestion({ questionIdx: selectedQuestionIdx });
      setLoading(true);
      getQuestionDetail(selectedQuestionIdx)
      .then(response => {
        setQuestion(response);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert("server error");
        setLoading(false);
      })
    }
    
  }, [selectedQuestionIdx])
  if(!question.questionIdx) return null;
  return (
    <Dialog open={open} maxWidth={"xl"} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {!loading &&
        <>
          <DialogTitle >
            <Typography variant="h4" component="div">{`${question.questionNumber}. ${question.questionText}`}</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} children={<CloseIcon />} />
          </DialogTitle>
          <DialogContent dividers>
            

            <Box mb={6}>
              <Typography variant="h6" gutterBottom component="div">- 문항</Typography>

              <RadioGroup row aria-label="position" name="questionType" defaultValue={question.questionType === "TEXT" ? "0" : "1"} onChange={changeQuestion}>
                <FormControlLabel value="0" control={<Radio color="primary" />} label="텍스트형" />
                <FormControlLabel value="1" control={<Radio color="primary" />} label="이미지형" />
              </RadioGroup>
              <TextField
                fullWidth
                label="문항명"
                name="questionText"
                defaultValue={question.questionText}
                margin="dense"
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom component="div">- 답변</Typography>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel value="text" control={<Radio color="primary" />} label="텍스트형" />
                <FormControlLabel value="image" control={<Radio color="primary" />} label="이미지형" />
              </RadioGroup>
              <Grid container >
                
                {question.answers.map((answer, index) => (
                  <Answer key={index} answer={answer} changeAnswer={changeAnswer}/>
                ))}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained">수정</Button>
          </DialogActions>
          {JSON.stringify(question)}
        </>
      }
    </Dialog>

  );
}

export default AdminQuestionDetail;