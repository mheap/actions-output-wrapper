#!/usr/bin/env node
(async function () {
  const core = require("@actions/core");
  const exec = require("@actions/exec");

  const binaryName = "";
  const args = process.argv.slice(2);

  let stdout = "";
  let stderr = "";

  const options = {};
  options.listeners = {
    stdout: (data) => {
      stdout += data.toString();
    },
    stderr: (data) => {
      stderr += data.toString();
    },
  };

  const exitCode = await exec.exec(binaryName, args, options);

  core.setOutput("stdout", stdout);
  core.setOutput("stderr", stderr);
  core.setOutput("exitcode", exitCode);
})();
