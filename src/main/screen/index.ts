import { BrowserWindow, ipcMain, IpcMainInvokeEvent, screen } from "electron";
import { IPC } from "../ipc/models";

const getDisplays = () => screen.getAllDisplays();

const getPrimaryDisplay = () => screen.getPrimaryDisplay();

export const startGetDisplaysIPC = () => {
  ipcMain.handle(IPC.GetDisplays, () => {
    const displays = getDisplays();
    const primaryDisplay = getPrimaryDisplay();
    const displaysWithPrimary = displays.map((display) => ({
      ...display,
      primary: primaryDisplay.id === display.id,
    }));

    return displaysWithPrimary;
  });
};

export const startSetDisplayIPC = (window: BrowserWindow) => {
  ipcMain.handle(
    IPC.SetDisplay,
    async (_event: IpcMainInvokeEvent, displayId: number) => {
      const display = getDisplays().find((display) => display.id === displayId);

      if (display) {
        window.setBounds(display.bounds);

        return true; // display exists
      } else {
        return false;
      }
    },
  );
};
