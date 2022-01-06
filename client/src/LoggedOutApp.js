import React from "react";
import { Switch, Route, Navigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function LoggedOutApp({ setCurrentUser }) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          element={<LoginForm setCurrentUser={setCurrentUser} />}
        />

        <Route
          exact
          path="/signup"
          element={<SignupForm setCurrentUser={setCurrentUser} />}
        />
      </Switch>
    </div>
  );
}

export default LoggedOutApp;
