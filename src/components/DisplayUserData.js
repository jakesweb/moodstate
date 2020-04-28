import React from "react";
import Async from "react-async";

const loadUserData = async () => {
  const res = await fetch("http://localhost:3001/user/data", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const DisplayUserData = () => (
  <div>
    <p>Mood Data</p>
    <Async promiseFn={loadUserData}>
      {({ data, err, isLoading }) => {
        if (isLoading) return "Loading....";
        if (err) return `Something went wrong : ${err.message}`;
        console.log(data);
        if (data)
          return (
            <div>
              {data.map((mood) => (
                <div key={mood.date}>
                  <p>{mood.name}</p>
                  <p>{mood.date}</p>
                </div>
              ))}
            </div>
          );
      }}
    </Async>
  </div>
);

export default DisplayUserData;
