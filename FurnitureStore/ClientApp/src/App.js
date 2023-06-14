import React, { Component, lazy, Suspense } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import { CSpinner } from "@coreui/react";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import { checkTokenExpiration } from "./views/adminViews/loginPage/reducer";
import { connect } from "react-redux";
import Loader from "./components/loader/loader";
const UserLayout = lazy(() => import("./layouts/userLayout/userLayout"));
const AdminLayout = lazy(() => import("./layouts/adminLayout/adminLayout"));
const LoginPage = lazy(() => import("./views/adminViews/loginPage/LoginPage"));

class App extends Component {
  componentDidMount() {
    this.props.checkTokenExpiration();
  }
  render() {
    return (
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              exact
              path="/adminlogin"
              name="LoginPage"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              path="/admin"
              name="AdminLayout"
              render={(props) => (
                <AdminLayout {...props}>
                  <Switch>
                    {adminRoutes.map((route, idx) => (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ))}
                  </Switch>
                </AdminLayout>
              )}
            />
            <Route
              path="/"
              name="UserLayout"
              render={(props) => (
                <UserLayout {...props}>
                  <Switch>
                    {userRoutes.map((route, idx) => (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ))}
                  </Switch>
                </UserLayout>
              )}
            />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default connect(null, { checkTokenExpiration })(App);
