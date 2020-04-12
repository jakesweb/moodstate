import React from "react";
import { Route, Link } from "react-router-dom";

import Signup from "./components/Signup";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Link to="/signup">Signup</Link>
        </header>
      </div>
      <Route path="/signup" component={Signup} />
    </>
  );
}

export default App;
