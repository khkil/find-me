import React, { useState } from 'react';
import { Form, Button, Row} from 'react-bootstrap';

const UserRegistPage = () => {

  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    setValidated(true);
 
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
              Start
          </Button>
    
        </Row>

      </Form>
    </div>
    
  )
}

export default UserRegistPage;