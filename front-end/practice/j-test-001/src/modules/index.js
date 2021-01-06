import { combineReducers } from 'redux';
import counter from './counter';
import paging from './paging';

// combineReducers를 통해 여러 개의 Reducer들을 하나로 합쳐 하나의 Reducer로 관리한다.
// 현재는 counter라는 reducer만 있다.
const rootReducer = combineReducers({
  counter,
  paging,
});

export default rootReducer;