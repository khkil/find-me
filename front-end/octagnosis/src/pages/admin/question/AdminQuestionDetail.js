import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Typography } from '@material-ui/core';
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

const AdminQuestionDetail = ({ selectedQuestionIdx, setSelectedQuestionIdx}) => {

  const classes = useStyles();
  const open = useMemo(() => selectedQuestionIdx > 0);

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const [updatedQuestion, setUpdatedQuestion] = useState({});

  const changeAnswers = (answerIdx, e) => {

    const { name, value } = e.target;
    const inintialAnswers = updatedQuestion.answers ? updatedQuestion.answers : [];
    const answer = inintialAnswers.find(answer => answer.answerIdx === answerIdx);
     
    const answers = Boolean(answer) ? [...inintialAnswers.filter(answer => answer.answerIdx !== answerIdx), { ...answer, [name]: value} ] : [...inintialAnswers, { answerIdx: answerIdx, [name]: value }];

      setUpdatedQuestion({
        ...updatedQuestion,
        answers: answers
      })
  }

  useEffect(() => { 
    
  }, [updatedQuestion])

  const onClose = () => {3
    setSelectedQuestionIdx(0)
  };

  useEffect(() => {
    console.log("selectedQuestionIdx", selectedQuestionIdx);
    if(open){
      setUpdatedQuestion({ questionIdx: selectedQuestionIdx });
      setLoading(true);
      getQuestionDetail(selectedQuestionIdx)
      .then(response => {
        setQuestion(response);
        setLoading(false);
      })
    }
    
  }, [selectedQuestionIdx])
  if(!question.questionIdx) return null;
  return (
    <div>
      <Dialog open={open} maxWidth={"xl"} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        {loading ? 
          <Loader/> : 
          <>
            <DialogTitle >
              <Typography variant="h6">{question.questionText}</Typography>
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} children={<CloseIcon />} />
            </DialogTitle>
            <DialogContent dividers>
              <Box>
                
              </Box>
              <Box>
                <DialogContentText id="alert-dialog-description">
                  <Typography variant="h6" gutterBottom>
                    답변
                  </Typography>
                  <Grid container spacing={2} xs={'auto'}>
                  {question.answers.map(({ answerIdx, answerText, answerScore }, index) => (
                    <Grid key={answerIdx} item xs spacing={2} className={classes.answer}>

                      <DropzoneArea 
                        filesLimit={1}
                        dropzoneText={""} 
                        dropzoneClass={classes.dropzone}
                        style={{padding:"0px"}}
                        previewGridClasses={{
                          item: classes.preview,
                      }}
                      />
                      <TextField
                        label="텍스트"
                        name="answerText"
                        defaultValue={answerText}
                        className={classes.textField}
                        onChange={(e) => changeAnswers(answerIdx, e)}
                        helperText="Some important text"
                        margin="dense"
                        variant="outlined"
                      />
                      <TextField
                        label="배점"
                        type="number"
                        name="answerScore"
                        defaultValue={answerScore}
                        className={classes.textField}
                        onChange={(e) => changeAnswers(answerIdx, e)}
                        helperText="Some important text"
                        margin="dense"
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                  </Grid>
                </DialogContentText>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button color="primary" variant="contained">수정</Button>
            </DialogActions>
          </>
        
        }
        
      </Dialog>
    </div>

  );
}

export default AdminQuestionDetail;