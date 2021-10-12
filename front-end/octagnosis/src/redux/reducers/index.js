import { combineReducers } from "redux";
import inspectionReducer from "./inspectionReducer"
import resultReducer from "./resultReducer"
import dataReducer from "./dataReducer"
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import memberReducer from "./memberReducer";
import smsReducer from "./smsReducer";
import groupReducer from "./groupReducer";
import userReducer from "./userReducer";
import excelReducer from "./excelReducer";

export const rootReducer = combineReducers({
  inspectionReducer,
  resultReducer,
  dataReducer,
  themeReducer,
  authReducer,
  memberReducer,
  smsReducer,
  groupReducer,
  userReducer,
  excelReducer
});
