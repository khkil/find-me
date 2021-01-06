const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const MULTIPLE = 'counter/MULTIPLE';
const DIVISION = 'counter/DIVISION';

// 해당 파일에서는 리듀서를 정의한다.
// reducer는 상태 변화를 어떻게 시킬지 관리하는 역할을 한다.

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const multple = () => ({ type: MULTIPLE });
export const division = () => ({ type: DIVISION });

const initialState = 0;

// counter라는 reducer를 정의한다.
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case MULTIPLE:
      return state * 2;
    case DIVISION:
      return state / 2;
    default:
      return state;
  }
};

export default counter;