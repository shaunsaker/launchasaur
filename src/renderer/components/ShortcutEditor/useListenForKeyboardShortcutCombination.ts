import * as React from "react";

import { keyCodeMap } from "./keymap";

export function useListenForKeyboardShortcutCombination(
  listen: boolean,
  callback: (combination?: string) => void,
) {
  React.useEffect(() => {
    if (listen) {
      const done = (combination?: string) => {
        window.removeEventListener("keydown", listenDown, true);

        callback(combination);
      };

      const listenDown = (ev: KeyboardEvent) => {
        ev.stopPropagation();
        ev.preventDefault();

        // treat windows AltGr as Alt
        const altKey = ev.key.startsWith("Alt");

        const isModifier =
          ev.key === "Control" ||
          ev.key === "Meta" ||
          altKey ||
          ev.key === "Shift";

        // don't record single modifier presses
        if (isModifier) {
          return;
        }

        const key = keyCodeMap[ev.keyCode];
        const noModifier =
          !ev.ctrlKey && !ev.metaKey && !ev.altKey && !ev.shiftKey;
        // escape aborts
        if (key === "escape" && noModifier) {
          done(undefined);
          return;
        }

        const keyCombination = [];

        if (ev.ctrlKey) {
          keyCombination.push("Ctrl");
        }

        if (ev.metaKey) {
          keyCombination.push("Command");
        }

        if (ev.altKey) {
          keyCombination.push("Alt");
        }

        if (ev.shiftKey) {
          keyCombination.push("Shift");
        }

        keyCombination.push(key);

        done(keyCombination.join("+"));
      };

      window.addEventListener("keydown", listenDown, true);

      return () => {};
    }
  }, [listen, callback]);
}
