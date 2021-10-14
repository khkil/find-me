import React, { memo, useEffect, useMemo, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, CardActionArea, CardMedia, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography, RadioGroup, Radio, FormControlLabel, Divider } from '@material-ui/core';
import { DropzoneAreaBase, DropzoneDialog } from "material-ui-dropzone";
import * as questionService from '../../../services/questionService';
import Loader from '../../../components/Loader';
import { CloseIcon } from '@material-ui/data-grid';
import { fileUpload } from '../../../services/fileService';
import { FTP_URL } from "../../../constants/index";
import { Delete, Refresh } from "@material-ui/icons"
import SaveIcon from '@material-ui/icons/Save';;

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
    padding: 5

  },
  dropzone: {
    minHeight: "200px"
  },
  preview: {
    padding: "0px",
    margin: "0 auto",
    marginTop: "15px",
  },
  imageBox: {
    height: "250px",
    border: "1px solid #e0e0e0"
  },
  plusArea: {
    padding: 50
  }
}));

const AnswerImage = memo(({ answerIdx, file, changeAnswer }) => {
  const classes = useStyles();
  const imageUrl = FTP_URL + file.path;
  
  const deleteImage = () => {
    const emptyFile = {
      filePath: null
    }
    changeAnswer(answerIdx, null, emptyFile );
  }
  return (
    <Card className={classes.imageBox}>
      <Grid item xs={8}>
        <IconButton edge="end" aria-label="delete" children={<Delete color="error"/>} onClick={deleteImage}/> 
      </Grid>
      <Divider my={3}/>
      <img src={imageUrl}/>
    </Card>
  )
});

const Answer = memo(({ answer, changeAnswer }) => {
  const classes = useStyles();
  const { answerIdx, answerText, answerScore, filePath } = answer;
  const files = typeof filePath === "string" ? JSON.parse(filePath) : filePath;

  const uploadFile = useCallback(files => {
    
    if(files.length && files.length > 0){
      const { file } = files[0];
      fileUpload(file)
      .then(({ success }) => {
        if(success){
          const uploadedFile = { name: file.name, path: `/${file.path}` };
          const uploadedFiles = [uploadedFile];
          changeAnswer(answerIdx, null, { filePath: JSON.stringify(uploadedFiles)});
        }else{
          alert("업로드에 실패 하였습니다");
        }
      })
      .catch(e => {
        alert("server error");
        console.error(e);
      });
    }
  });


  return (
    <Grid  key={answerIdx} item xs className={classes.answer}>
      {!filePath ? 
        <DropzoneAreaBase 
          filesLimit={1}
          onAdd={uploadFile}
          previewGridClasses={{
            item: classes.preview,
          }}
        /> :
        <AnswerImage answerIdx={answerIdx} file={files[0]} changeAnswer={changeAnswer}/>
          
      }
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

  const changeAnswer = (answerIdx, e, obj) => {

    let { answers } = question;
    const index = answers.map(answer => answer.answerIdx).indexOf(answerIdx);
    const answer = answers[index];
    let changedValue;
    if(e && e.target){
      const { name, value } = e.target;
      changedValue = {
        [name]: value
      }
    }else if(!e && obj){
      changedValue = obj;
    }

    if(!changedValue) return false;
    const changedAnswser = {...answer, ...changedValue };
    answers.splice(index, 1, changedAnswser);

    setQuestion({
      ...question,
      answers: answers
    });
  }

  const updateQuestion = () => {
    const questionIdx = selectedQuestionIdx;
    questionService.updateQuestion(questionIdx, question)
    .then(response => {
      console.log(response);
      alert("수정되었습니다");
    })
    .catch(e => {
      console.error(e);
      alert("server error");

    })
    
  }

  useEffect(() => { 
    
  }, [question])

  const onClose = () => {
    setSelectedQuestionIdx(0)
  };

  const initQuestion = () => {
   
    setQuestion({ questionIdx: selectedQuestionIdx });
      setLoading(true);
      questionService.getQuestionDetail(selectedQuestionIdx)
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

  useEffect(() => {
    
    if(open){
      initQuestion();
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
                <Grid className={classes.plusArea}>

                  <IconButton edge="end" aria-label="delete" children={<Delete color="error"/>}/> 
                </Grid>
              </Grid>
            </Box>
            {JSON.stringify(question)}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" size="large" startIcon={<Refresh />} onClick={initQuestion}>
              초기화
            </Button>
            <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={updateQuestion}>
              저장
            </Button>
          </DialogActions>
          
        </>
      }
    </Dialog>

  );
}

export default AdminQuestionDetail;