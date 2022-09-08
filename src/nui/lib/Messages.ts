export type InitFunctionType =
  | "INIT_CORE"
  | "INIT_BEFORE_MAP_LOADED"
  | "INIT_AFTER_MAP_LOADED"
  | "INIT_SESSION"
  | "INIT_UNKNOWN";

interface MessageBase {
  eventName: string;
}

export interface LoadProgressMessage extends MessageBase {
  eventName: "loadProgress";
  loadFraction: number;
}
export interface EndDataFileEntriesMessage extends MessageBase {
  eventName: "endDataFileEntries";
}
export interface StartInitFunctionMessage extends MessageBase {
  eventName: "startInitFunction";
  type: InitFunctionType;
}
export interface StartInitFunctionOrderMessage extends MessageBase {
  eventName: "startInitFunctionOrder";
  type: InitFunctionType;
  order: number;
  count: number;
}
export interface InitFunctionInvokingMessage extends MessageBase {
  eventName: "initFunctionInvoking";
  type: InitFunctionType;
  name: string;
  idx: number;
}
export interface InitFunctionInvokedMessage extends MessageBase {
  eventName: "initFunctionInvoked";
  type: InitFunctionType;
  name: string;
}
export interface EndInitFunctionMessage extends MessageBase {
  eventName: "endInitFunction";
  type: InitFunctionType;
}
export interface OnLogLineMessage extends MessageBase {
  eventName: "onLogLine";
  message: string;
}
export interface StartDataFileEntriesMessage extends MessageBase {
  eventName: "startDataFileEntries";
  count: number;
}
export interface PerformMapLoadFunctionMessage extends MessageBase {
  eventName: "performMapLoadFunction";
  idx: number;
}
export interface OnDataFileEntryMessage extends MessageBase {
  eventName: "onDataFileEntry";
  type: string;
  isNew: boolean;
  name: string;
}

export type Message =
  | LoadProgressMessage
  | EndDataFileEntriesMessage
  | StartInitFunctionMessage
  | StartInitFunctionOrderMessage
  | InitFunctionInvokingMessage
  | InitFunctionInvokedMessage
  | EndInitFunctionMessage
  | OnLogLineMessage
  | StartDataFileEntriesMessage
  | PerformMapLoadFunctionMessage
  | OnDataFileEntryMessage;
