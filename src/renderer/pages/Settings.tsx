import React from "react";
import { Link } from "react-router-dom";

export const Settings = () => {
  return (
    <div>
      Settings
      <Link to="/">
        <button type="button">Back</button>
      </Link>
    </div>
  );
};
