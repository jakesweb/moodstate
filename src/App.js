import React from "react";
import { Route, Link } from "react-router-dom";

import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Secret from "./components/Secret";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <header>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
          <Link to="/secret">Secret</Link>
        </header>
      </div>
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/secret" component={Secret} />
    </>
  );
}

export default App;
