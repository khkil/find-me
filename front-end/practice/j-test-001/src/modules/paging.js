const START = 'paging/START';

export const start = () => ({ type: START });

const initialState = '예?';

// counter라는 reducer를 정의한다.
const paging = (state = initialState, action) => {
    switch (action.type) {
      case START:
        return state = '뭐요?';
      default:
        return state;
    }
  };
  
  export default paging;