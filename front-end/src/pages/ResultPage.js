import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';
import { gerUserResult } from '../modules/result'
import Loading from '../components/common/Loading';
import { Row, Col, Carousel, Card } from 'react-bootstrap';

const ResultPage = ({ history }) => {

  const inspection = useSelector(state => state.inspection);
  const { state } = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {

    if (!state || !state.userInfo) return <Redirect to="/" />;
    const { answerState } = state;
    let highScore = 0;
    let allAnswers = [];

    for (const key in answerState) {
      const result = key.replace('result_', '');
      const answers = answerState[key];
      let totalScore = 0;
      answers.forEach(answer => {
        totalScore += parseInt(answer.score);
      });

      if (highScore < totalScore) {
        highScore = totalScore;
      }
      allAnswers = allAnswers.concat({
        result: result,
        totalScore: totalScore
      });
    }

    let params = {};
    const results = allAnswers.filter(allAnswer => allAnswer.totalScore === highScore);
    const { inspection_idx } = inspection.data;
    params = {
      inspection_idx: inspection_idx,
      results: results.map(result => result.result)
    }
    dispatch(gerUserResult(params));

    return (e) => {

      //unblock();
    };


  }, []);

  const { data, loading, error } = useSelector(state => state.result);
  if (loading || !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <Row className="justify-content-md-center">
        <Col>
          <Carousel>
            {data.map(({ result_name, result_title, main_sentence, sub_sentence }) => {
              return (
              <Carousel.Item>
                <Card bg="dark" text="light" className="text-center" style={{ minHeight: '200px' }}>
                  <blockquote className="blockquote mb-0 card-body">
                    <h2>{result_title}</h2>
                    <p>{main_sentence}</p>
                    <div contentEditable='true' dangerouslySetInnerHTML={{ __html: sub_sentence }}></div>

                  </blockquote>
                </Card>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            )
            })}

          </Carousel>

        </Col>
      </Row>

      {JSON.stringify(data)}
    </>
  )
}

export default ResultPage;