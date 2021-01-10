import React, { useState } from 'react';
import { Form, Button, Row} from 'react-bootstrap';
import { useLocation } from "react-router";

const UserRegistPage = ({ history }) => {

  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const { state } = useLocation();
  console.log(state);
  if(state && state.userInfo){
    delete state.userInfo;
  }
  
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);

    }else{
      console.log(inputs);
      history.push({pathname: '/pages/1', state: {userInfo: inputs} });
    }
    
      
  };

  return (
    <div className="user_regist_page">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustomUsername">
          <Form.Label>이름</Form.Label>
          <Form.Control
            name="user_name"
            type="text"
            placeholder="이름을 입력하세요."
            aria-describedby="inputGroupPrepend"
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            이름은 필수값 입니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustomUserAge">
          <Form.Label>나이</Form.Label>
          <Form.Control
            name="user_age"
            type="number"
            placeholder="나이를 입력하세요."
            aria-describedby="inputGroupPrepend"
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            나이는 필수값 입니다.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Row className="justify-content-md-center">
          <Button variant="primary" type="submit"size="lg">
            시작
          </Button>
        </Row>

      </Form>
    </div>
    
  )
}

export default UserRegistPage;