const core = require("@actions/core");
const fs = require("fs").promises;
module.exports = async function (originalName, binaryPath) {
  // Update the shim to use the correct path
  let shim = (await fs.readFile(__dirname + "/shim.js")).toString();
  shim = shim.replace(
    'const binaryName = "";',
    `const binaryName = "${binaryPath}";`
  );

  // Install a wrapper in the current directory
  const shimDir = __dirname;
  const newBinaryPath = `${shimDir}/${originalName}`;
  await fs.writeFile(newBinaryPath, shim);
  await fs.chmod(newBinaryPath, "700");

  // Add the path to the shim
  core.addPath(shimDir);
};
