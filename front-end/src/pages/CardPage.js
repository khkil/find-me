import { Card, Row, Col } from 'react-bootstrap'

const CardPage = () => {

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col md="auto">
        <Card bg="light" text="dark" className="text-center">
          <blockquote className="blockquote mb-0 card-body">
            <p>평소의 나와 가장 가까울 수록 6점에 가깝게,</p>
            <p>평소의 나와 같지 않을 수록 1점에 가깝게 체크하세요.</p>
          </blockquote>
        </Card>

        </Col>
      </Row>
  </div>
    )
}

export default CardPage;
