export function getHandoverData() {
  return Object.assign(
    {
      serverName: "GTA Online",
      icon: "",
    },
    window["nuiHandoverData" as any] as unknown,
  );
}
