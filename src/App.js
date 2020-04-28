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
        <header>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/userdata">User Data</Link>
        </header>
      </div>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/userdata" component={DisplayUserData} />
    </>
  );
}

export default App;
