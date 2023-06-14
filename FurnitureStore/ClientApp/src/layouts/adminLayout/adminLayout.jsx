import React, { Suspense, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { logout } from "../../views/adminViews/loginPage/reducer";
import routes from "../../routes/adminRoutes";
import { connect } from "react-redux";
import get from "lodash.get";
import "../../accests/css/adminLayoutStyle.css";
import AdminNavbar from "./navBar";
import AdminSideBar from "./sideBar";

const AdminLayout = ({ login, logout, history }) => {
  const [visible, setVisible] = useState(true);

  const onVisibleChange = () => {
    setVisible(!visible);
  };
  const signOut = (e) => {
    e.preventDefault();
    logout();
    history.push("/");
  };

  let isAccess = false;
  if (login.isAuthenticated === undefined) {
    return <Redirect to="/loginadmin" />;
  }
  if (login.isAuthenticated) {
    const { roles } = login.user;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === "Admin") isAccess = true;
    }
    console.log("auth", roles);
  }

  const content = (
    <div className="app">
      <Suspense>
        <AdminSideBar visible={visible} onVisibleChange={onVisibleChange} />
      </Suspense>
      <div className="app-body">
        <div
          className={`side-bar ${
            visible ? "side-bar-visible" : "side-bar-hidden"
          }`}
        >
          <Suspense>
            <AdminNavbar
              onLogout={(e) => signOut(e)}
              name={login.user.name}
              onVisibleChange={onVisibleChange}
            />
          </Suspense>
          <Suspense>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect from="/adminlogin" to="/admin" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );

  return isAccess ? content : <Redirect to="/" />;
};

const mapStateToProps = (state) => {
  return {
    login: get(state, "login"),
  };
};

export default connect(mapStateToProps, { logout })(AdminLayout);
