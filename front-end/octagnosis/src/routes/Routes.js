import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  dashboardLayoutRoutes,
  authLayoutRoutes,
  presentationLayoutRoutes,
  protectedRoutes,
  inspectionRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import PresentationLayout from "../layouts/Presentation";
import Page404 from "../pages/auth/Page404";
import AuthGuard from "../components/AuthGuard";
import InspectionLayout from "../layouts/Inspection";

const childRoutes = (Layout, routes) => {
  return (
    routes.map(({ component: Component, children, path, auth }, index) => {
      return children ? (
        children.map((element, index) => {
          
          return (
            <Route
              key={index}
              path={element.path}
              exact
              render={(props) => (
                auth ? (
                  <AuthGuard path={path}>
                    <Layout>
                      <element.component {...props} />
                    </Layout> 
                  </AuthGuard> 
                ) : (
                  <Layout>
                    <element.component {...props} />
                  </Layout>
                )
              )}
            />
          );
        })
      ) : Component ? (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            auth ? (
              <AuthGuard path={path}>
                <Layout>
                  <Component {...props} />
                </Layout>
              </AuthGuard>
            ) : (
              <Layout>
                <Component {...props} />
              </Layout>
            )
          )}
        />
      ) : null;
    })
  )
}


const Routes = () => (
  <Router>

    <Switch>
      {childRoutes(InspectionLayout, inspectionRoutes)}
      {childRoutes(AuthLayout, authLayoutRoutes)}
      {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
      {childRoutes(DashboardLayout, protectedRoutes)}
      {childRoutes(DashboardLayout, presentationLayoutRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
        />
    </Switch>

  </Router>
);

export default Routes;
