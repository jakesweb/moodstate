import React from "react";

const Signin = () => (
  <div>
    <form method="post" action="http://localhost:3001/user/signin">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" />
      <br />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Signin;
