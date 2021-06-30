#!/usr/bin/env node
module.exports = async function shim() {
  function escapeData(s) {
    return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  }

  function setOutput(name, data) {
    console.log(`::set-output name=${name}::` + escapeData(data));
  }

  const binaryName = "";
  const args = process.argv.slice(2);

  const { stdout, stderr } = await exec(`${binaryName} ${args.join(" ")}`);

  setOutput("stdout", stdout);
  setOutput("stderr", stderr);
};
