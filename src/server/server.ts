AddEventHandler("playerConnecting", (_: any, _1: any, deferrals: any) => {
  deferrals.handover({
    serverName: GetConvar("sv_projectName", "FiveM server"),
    icon: GetConvar("sv_icon", ""),
  });
});
