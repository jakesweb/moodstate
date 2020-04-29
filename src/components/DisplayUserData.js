import React from "react";
import Async from "react-async";
import styled from "styled-components";

const DivStyle = styled.div`
  color: #282c34;
  font-size: 120%;
  font-style: bold;
  margin: 0 2%;
  .title {
    text-decoration: underline;
    font-size: 160%;
  }
  .mood-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 0.2em;
    row-gap: 0.2em;
    justify-content: center;
    align-items: center;
  }
  .mood-div {
    background-color: #282c34;
    color: #61dafb;
    display: flex;
    flex-direction: row;
    border: 2px black solid;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
  }
  span {
    margin: 0 3%;
  }
`;

const loadUserData = async () => {
  const res = await fetch("http://localhost:3001/user/data", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const convertTime = (date) => {
  var time = new Date(date);
  time = time.toLocaleString();
  return time.slice(time.length - 11);
};

const DisplayUserData = () => (
  <DivStyle>
    <p class="title">Your Moods</p>
    <Async promiseFn={loadUserData}>
      {({ data, err, isLoading }) => {
        if (isLoading) return "Loading....";
        if (err) return `Something went wrong : ${err.message}`;
        if (data)
          return (
            <div class="mood-grid">
              {data.map((mood) => (
                <div key={mood.date} class="mood-div">
                  <span>{new Date(mood.date).toISOString().slice(0, 10)}</span>
                  <span>{convertTime(mood.date)}</span>
                  <span>{mood.name}</span>
                </div>
              ))}
            </div>
          );
      }}
    </Async>
  </DivStyle>
);

export default DisplayUserData;
