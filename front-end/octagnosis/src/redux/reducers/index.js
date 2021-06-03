import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import memberReducer from "./memberReducer";
import smsReducer from "./smsReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  memberReducer,
  smsReducer
});
