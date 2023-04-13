#!/usr/bin/env node
module.exports = async function shim() {
  function escapeData(s) {
    return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  }

  function setOutput(name, data) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `${name}=${escapeData(data)}${os.EOL}`,
      {
        encoding: "utf8",
      }
    );
  }

  const binaryName = "";
  const args = process.argv.slice(2);

  const { stdout, stderr } = await exec(`${binaryName} ${args.join(" ")}`);

  setOutput("stdout", stdout);
  setOutput("stderr", stderr);
};
