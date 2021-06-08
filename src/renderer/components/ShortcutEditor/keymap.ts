// valid key codes taken from https://github.com/electron/electron/blob/master/shell/common/keyboard_util.cc
// reversed using https://github.com/chromium/chromium/blob/6efa1184771ace08f3e2162b0255c93526d1750d/ui/events/keycodes/keyboard_codes_win.h
// and https://github.com/chromium/chromium/blob/6efa1184771ace08f3e2162b0255c93526d1750d/ui/events/keycodes/keyboard_codes_posix.h

export const keyCodeMap: { [keyCode: number]: string } = {
  0x08: "backspace",
  0x09: "tab",
  0x0d: "return",
  0x10: "shift",
  0x11: "control",
  0x12: "alt",
  0x14: "capslock",

  0x1b: "escape",
  0x20: "space",
  0x21: "pageup",
  0x22: "pagedown",
  0x23: "end",
  0x24: "home",
  0x25: "left",
  0x26: "up",
  0x27: "right",
  0x28: "down",

  0x2c: "printscreen",
  0x2d: "insert",
  0x2e: "delete",

  0x30: "0",
  0x31: "1",
  0x32: "2",
  0x33: "3",
  0x34: "4",
  0x35: "5",
  0x36: "6",
  0x37: "7",
  0x38: "8",
  0x39: "9",
  0x41: "A",
  0x42: "B",
  0x43: "C",
  0x44: "D",
  0x45: "E",
  0x46: "F",
  0x47: "G",
  0x48: "H",
  0x49: "I",
  0x4a: "J",
  0x4b: "K",
  0x4c: "L",
  0x4d: "M",
  0x4e: "N",
  0x4f: "O",
  0x50: "P",
  0x51: "Q",
  0x52: "R",
  0x53: "S",
  0x54: "T",
  0x55: "U",
  0x56: "V",
  0x57: "W",
  0x58: "X",
  0x59: "Y",
  0x5a: "Z",

  0x5b: "command",

  0x60: "num0",
  0x61: "num1",
  0x62: "num2",
  0x63: "num3",
  0x64: "num4",
  0x65: "num5",
  0x66: "num6",
  0x67: "num7",
  0x68: "num8",
  0x69: "num9",
  0x6a: "nummult",
  0x6b: "numadd",
  0x6c: "SEPARATOR",
  0x6d: "numsub",
  0x6e: "numdec",
  0x6f: "numdiv",
  0x70: "F1",
  0x71: "F2",
  0x72: "F3",
  0x73: "F4",
  0x74: "F5",
  0x75: "F6",
  0x76: "F7",
  0x77: "F8",
  0x78: "F9",
  0x79: "F10",
  0x7a: "F11",
  0x7b: "F12",
  0x7c: "F13",
  0x7d: "F14",
  0x7e: "F15",
  0x7f: "F16",
  0x80: "F17",
  0x81: "F18",
  0x82: "F19",
  0x83: "F20",
  0x84: "F21",
  0x85: "F22",
  0x86: "F23",
  0x87: "F24",
  0x90: "numlock",
  0x91: "scrolllock",

  0xad: "volumemute",
  0xae: "volumedown",
  0xaf: "volumeup",
  0xb0: "medianexttrack",
  0xb1: "mediaprevioustrack",
  0xb2: "mediastop",
  0xb3: "mediaplaypause",

  0xba: ";",
  0xbb: "=",
  0xbc: ",",
  0xbd: "-",
  0xbe: ".",
  0xbf: "/",
  0xc0: "`",
  0xdb: "[",
  0xdc: "\\",
  0xdd: "]",
  0xde: "'",
};