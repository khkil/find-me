import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import { getQuestionDetail } from '../../../services/questionService';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AdminQuestionDetail = ({ selectedQuestionIdx, setSelectedQuestionIdx}) => {

  const classes = useStyles();
  const open = useMemo(() => selectedQuestionIdx > 0);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});


  const handleClose = () => {
    setSelectedQuestionIdx(0)
  };

  useEffect(() => {
    if(open){
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
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            {loading ? 
              <Loader/> : 

              <div className={classes.paper}>
                <h2 id="transition-modal-title">{question.questionText}</h2>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    답변
                  </Typography>
                  <Grid container spacing={1}>
                  {question.answers.map((answer, index) => (
                    <Grid item xs>
                      <DropzoneArea filesLimit={1} dropzoneText={"tge"} maxWidth={"100"}/>
                      <TextField
                        label="텍스트"
                        id="outlined-margin-dense"
                        value="Default Value"
                        className={classes.textField}
                        helperText="Some important text"
                        margin="dense"
                        variant="outlined"
                      />
                      <TextField
                        label="배점"
                        id="outlined-margin-dense"
                        defaultValue="Default Value"
                        className={classes.textField}
                        helperText="Some important text"
                        margin="dense"
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                  </Grid>
                </Box>
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <Button variant="contained" color="primary" onClick={handleClose}>닫기</Button>
                </Box>
              </div>
            }
          
        </Fade>
      </Modal>
    </div>
  );
}

export default AdminQuestionDetail;