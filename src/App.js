import React from "react";
import { Route, Link } from "react-router-dom";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import DisplayUserData from "./components/DisplayUserData";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <header class="app-header">
          <Link to="/" class="app-title">
            MoodState
          </Link>
          <Link to="/signup" class="app-link">
            Signup
          </Link>
          <Link to="/signin" class="app-link">
            Signin
          </Link>
          <Link to="/userdata" class="app-link">
            User Data
          </Link>
        </header>
      </div>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/userdata" component={DisplayUserData} />
    </>
  );
}

export default App;
