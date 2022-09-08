import type { Message } from "$lib/Messages";

export function emulator(log: (msg: Message) => void) {
  let lastFn = "";

  let testTimeout: CitizenTimer;

  const run = () => {
    testTimeout = setTimeout(() => {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          log({
            eventName: "onDataFileEntry",
            isNew: true,
            name: "dlcMPHipsterCRC:/content.xml",
            type: Math.random() + "",
          });
          break;
        case 1:
          lastFn = "CVehicleRecordingMgr" + Math.random();
          log({
            eventName: "initFunctionInvoking",
            type: "INIT_SESSION",
            name: lastFn,
            idx: 0,
          });
          break;
        case 2:
          log({
            eventName: "initFunctionInvoked",
            type: "INIT_SESSION",
            name: lastFn,
          });
          break;
      }
      run();
    }, 500 * Math.random());
  };
  run();

  return () => testTimeout && clearTimeout(testTimeout);
}
