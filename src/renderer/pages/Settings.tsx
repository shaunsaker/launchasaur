import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { EditAppShortcut } from "../components/EditAppShortcut";

export const Settings = (): ReactElement => {
  return (
    <div>
      Settings
      <Link to="/">
        <button type="button">Back</button>
      </Link>
      <div>
        <EditAppShortcut />
      </div>
    </div>
  );
};
