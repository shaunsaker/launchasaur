import { OpenDialogReturnValue } from "electron";
import { createAsyncAction } from "typesafe-actions";
import { DisplayId, ExtendedDisplay } from "../settings/models";

export const getFilepath = createAsyncAction(
  "IPC/getFilepathRequest",
  "IPC/getFilepathSuccess",
  "IPC/getFilepathFailure",
)<void, OpenDialogReturnValue, Error>();

export const openFile = createAsyncAction(
  "IPC/openFileRequest",
  "IPC/openFileSuccess",
  "IPC/openFileFailure",
)<{ filepath: string }, void, Error>();

export const closeFile = createAsyncAction(
  "IPC/closeFileRequest",
  "IPC/closeFileSuccess",
  "IPC/closeFileFailure",
)<{ filepath: string }, void, Error>();

export const openLink = createAsyncAction(
  "IPC/openLinkRequest",
  "IPC/openLinkSuccess",
  "IPC/openLinkFailure",
)<{ url: string }, void, Error>();

export const checkShortcutRegistered = createAsyncAction(
  "IPC/checkShortcutRegisteredRequest",
  "IPC/checkShortcutRegisteredSuccess",
  "IPC/checkShortcutRegisteredFailure",
)<{ shortcut: string }, boolean, Error>();

export const unregisterShortcut = createAsyncAction(
  "IPC/unregisterShortcutRequest",
  "IPC/unregisterShortcutSuccess",
  "IPC/unregisterShortcutFailure",
)<{ shortcut: string }, void, Error>();

export const registerShortcut = createAsyncAction(
  "IPC/registerShortcutRequest",
  "IPC/registerShortcutSuccess",
  "IPC/registerShortcutFailure",
)<{ shortcut: string }, void, Error>();

export const hideWindow = createAsyncAction(
  "IPC/hideWindowRequest",
  "IPC/hideWindowSuccess",
  "IPC/hideWindowFailure",
)<void, void, Error>();

export const getDisplays = createAsyncAction(
  "IPC/getDisplaysRequest",
  "IPC/getDisplaysSuccess",
  "IPC/getDisplaysFailure",
)<void, ExtendedDisplay[], Error>();

export const setDisplay = createAsyncAction(
  "IPC/setDisplayRequest",
  "IPC/setDisplaySuccess",
  "IPC/setDisplayFailure",
)<DisplayId, DisplayId, Error>();

export const runScript = createAsyncAction(
  "IPC/runScriptRequest",
  "IPC/runScriptSuccess",
  "IPC/runScriptFailure",
)<string, void, Error>();
