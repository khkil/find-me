import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import memberReducer from "./memberReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  memberReducer
});
