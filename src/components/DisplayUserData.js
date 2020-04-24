import React from "react";
import Async from "react-async";

const loadUserData = () => {
  fetch("http://localhost:3000/user/data")
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());
};

const DisplayUserData = () => (
  <div>
    <Async promiseFn={loadUserData}>
      {({ data, err, isLoading }) => {
        if (isLoading) return "Loading....";
        if (err) return `Something went wrong : ${err.message}`;
        if (data)
          return (
            <div>
              {data.mood.map((mood) => (
                <div key={mood.date}>
                  <p>{mood.name}</p>
                </div>
              ))}
            </div>
          );
      }}
    </Async>
  </div>
);

export default DisplayUserData;
