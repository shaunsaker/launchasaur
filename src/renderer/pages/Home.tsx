import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export const Home = (): ReactElement => {
  return (
    <div>
      Home
      <Link to="/settings">
        <button type="button">Settings</button>
      </Link>
    </div>
  );
};
