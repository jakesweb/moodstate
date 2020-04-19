import React from "react";

const Secret = () => (
  <div>
    <form method="get" action="http://localhost:3001/secret">
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Secret;
