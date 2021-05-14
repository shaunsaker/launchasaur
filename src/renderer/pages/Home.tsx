import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      Home
      <Link to="/settings">
        <button type="button">Settings</button>
      </Link>
    </div>
  );
};
