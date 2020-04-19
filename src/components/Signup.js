import React from "react";

const Signup = () => (
  <div>
    <form method="post" action="http://localhost:3001/user/signup">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <br />
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" />
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" />
      <br />
      <label for="tel">Phone Number:</label>
      <input type="text" id="phone" name="phone" />
      <br />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Signup;
