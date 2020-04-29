import React from "react";
import styled from "styled-components";

const FormStyle = styled.form`
  width: 70%;
  font-size: 120%;
  margin: 5%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  input {
    margin: 2%;
    border: black 2px solid;
    border-radius: 10px;
    padding-left: 2%;
    height: 30px;
  }
  .submit {
    width: 20%;
    margin-left: 20%;
  }
`;

const Signin = () => (
  <div>
    <FormStyle method="post" action="http://localhost:3001/user/signin">
      <input type="email" id="email" name="email" placeholder="Email" />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <input type="submit" value="Submit" class="submit" />
    </FormStyle>
  </div>
);

export default Signin;
