import esbuild from "esbuild";

const onRebuild = (context) => {
  return async (err, res) => {
    if (err) {
      return console.error(`[${context}]: Rebuild failed`, err);
    }

    console.log(`[${context}]: Rebuild succeeded, warnings:`, res.warnings);
  };
};

const server = {
  entryPoints: [`src/server/server.ts`],
  outfile: `dist/server.js`,
  platform: "node",
  target: ["node16"],
  format: "cjs",
};

const client = {
  entryPoints: [`src/client/client.ts`],
  outfile: `dist/client.js`,
  platform: "browser",
  target: ["chrome93"],
  format: "iife",
};

export function build(watch) {
  for (const context of [client, server]) {
    esbuild
      .build({
        ...context,
        bundle: true,
        watch: watch && {
          onRebuild: onRebuild(context.outfile),
        },
      })
      .then(() => console.log(`[${context.outfile}]: Built successfully!`))
      .catch(() => process.exit(1));
  }
}
