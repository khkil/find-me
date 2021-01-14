import React from 'react';
import { Row, Col, Alert, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
const StartPage = () => {
  return (
    <div>
      <Row className="justify-content-md-center">
     
        <Col md={8}>
          <Alert variant="dark" className="text-center">
            <Alert.Heading> 
              <h2>나를 찾아줘!!</h2>
            </Alert.Heading>
            <br/><br/>
            <span>
              10만 1천 4백명의 성공을 만든<br/>
              옥타그노시스 검사의 <br/><br/>
              ‘나를 찾아줘!’ 버전을<br/>
              지금 시작하세요!<br/><br/>

            </span>
            <Link to={{pathname: "/pages/user"}}>
              <Button variant="secondary" size="lg" style={{minWidth: '70%'}}>
                시작
              </Button>
            </Link>
            <hr />
            <Form.Text id="passwordHelpBlock" muted>
              * 본  무료테스트는 옥타그노시스 검사의 축약본으로<br/>
              옥타그노시스 온라인검사에서 나타나는 성향들 중에서<br/>
              일부 성향만 보여질 수 있습니다.

            </Form.Text>
          </Alert>
        </Col>
      </Row>
    </div>
  )
}

export default StartPage;