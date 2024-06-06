import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes/userRoutes";
import UserNavbar from "./navBar";
import UserFooter from "./footer";
const UserLayout = () => {
  return (
    <div className="app">
      <Suspense>
        <UserNavbar />
      </Suspense>
      <div className="app-body">
        <main>
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
              <Redirect from="/" to="/" />
            </Switch>
          </Suspense>
        </main>
      </div>
      {/* <footer>
        <UserFooter />
      </footer> */}
    </div>
  );
};
export default UserLayout;
