import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";
import { withCookies, useCookies } from 'react-cookie';

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";

import createTheme from "./theme";
import Routes from "./routes/Routes";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {

  const theme = useSelector((state) => state.themeReducer);
  let titleTemplate = "%s | 옥타그노시스";
  let defaultTitle = "옥타그노시스 관리자 페이지";
  titleTemplate = "%s | 관리자";
  defaultTitle = "관리자 페이지"

  return (
    <React.Fragment>
      <Helmet
        titleTemplate={titleTemplate}
        defaultTitle={defaultTitle}
      />
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
            <ThemeProvider theme={createTheme(theme.currentTheme)}>
              <Routes/>
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;