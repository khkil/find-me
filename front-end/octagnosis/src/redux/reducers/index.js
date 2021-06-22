import { combineReducers } from "redux";
import dataReducer from "./dataReducer"
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import memberReducer from "./memberReducer";
import smsReducer from "./smsReducer";
import groupReducer from "./groupReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  dataReducer,
  themeReducer,
  authReducer,
  memberReducer,
  smsReducer,
  groupReducer,
  userReducer
});
