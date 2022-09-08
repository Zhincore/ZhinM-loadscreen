// With help from https://github.com/DevTestingPizza/JoinTransition/blob/master/cloading.lua

RegisterNuiCallbackType("ended");

toggleSound(false);
clearScreen();
const clearscreenTick = setTick(() => clearScreen());

(async () => {
  toggleSound(false);
  SwitchOutPlayer(PlayerPedId(), 1, 1);

  // Wait for idle
  while (GetPlayerSwitchState() != 5) await sleep();

  ShutdownLoadingScreen();

  await endLoadingScreen();
  ShutdownLoadingScreenNui();

  toggleSound(true);

  await sleep(1000);

  SwitchInPlayer(PlayerPedId());

  while (GetPlayerSwitchState() != 12) await sleep();

  clearTick(clearscreenTick);
  ClearDrawOrigin();
})();

function toggleSound(state: boolean) {
  if (state) StopAudioScene("MP_LEADERBOARD_SCENE");
  else StartAudioScene("MP_LEADERBOARD_SCENE");
}

function clearScreen() {
  HideHudAndRadarThisFrame();

  SetDrawOrigin(0.0, 0.0, 0.0, 0);
}

async function endLoadingScreen() {
  SendLoadingScreenMessage(JSON.stringify({ eventName: "end" }));
  return new Promise((r) => on("__cfx_nui:ended", (_data: any, cb: () => void) => r(cb())));
}

async function sleep(ms?: number) {
  return new Promise((r) => setTimeout(r, ms, null));
}
