#!/usr/bin/env node
const run = require("./index");
(async function () {
  const args = process.argv.slice(2);
  await run({
    originalName: args[0], // e.g. /usr/bin/foo
    newName: args[1], // e.g. /usr/bin/foo-original
    shimBinaryPath: args[2], // e.g. /usr/bin/foo
  });
})();
