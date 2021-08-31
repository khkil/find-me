import React, { useCallback, useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components/macro";

import Helmet from "react-helmet";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Paper as MuiPaper,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../../../components/MenuBar";
import { getInspectionList } from "../../../redux/actions/inspectionActions";
import { Col, Row, Tabs, Table } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Loader from "../../../components/Loader";
import { getResultList } from "../../../redux/actions/resultActions";
const Divider = styled(MuiDivider)(spacing);

const Result = () => {

}
const ResultList = ({ selectedInspection }) => {

  const disptach = useDispatch();
  const inspectionReducer = useSelector(state => state.inspectionReducer);
  const { loading, response } = useSelector(state => state.resultReducer);
  const { inspectionIdx } = inspectionReducer.response.data[selectedInspection];

  const [selectedResult, setSelectedResult] = useState(0);
  
  useEffect(() => {
    console.log("result 리렌더링")
    const param = { inspectionIdx: inspectionIdx };
    disptach(getResultList(param));

    setSelectedResult(0);

  }, [selectedInspection])
  
  if(!response) return null;
  return (
    <Grid container spacing={4}>
      <Grid item xs={0.5} borderColor="grey.500">
      
        <Tab.Container 
          id="left-tabs-example" 
          defaultActiveKey={selectedResult}
          onSelect={(v) => setSelectedResult(v)}
        >
          <Row>
            <Col>
              <Nav variant="pills" className="flex-column">
                {response.data.map(({ resultIdx, resultName }, index) => (
                  <Nav.Item>
                    <Nav.Link eventKey={index}>{resultName}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          
          </Row>
        </Tab.Container>

      
        
      </Grid>
      <Grid item xs={11.5}>
      
      
      </Grid>
    </Grid>
  )

}
const AdminQuestionListPage = ({ match }) => {

  const dispatch = useDispatch();
  const { response, loading } = useSelector(state => state.inspectionReducer);

  const [selectedInspection, setSelectedInspection] = useState(0);
  const [result, setResult] = useState(1);
  const firstUpdate = useRef(true);
  const payYn = match.path.includes("free") ? "N" : "Y";


  const changeResult = (event, value) => {
    setResult(value);
  };

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
          <Tab eventKey={index} title={inspectionName}/>
        )}
      </Tabs>
      <ResultList selectedInspection={selectedInspection}/>
    </React.Fragment>
  );
}

export default AdminQuestionListPage;
