const core = require("@actions/core");
const fs = require("fs").promises;
const path = require("path");
let shim = require("./shim").toString();
module.exports = async function (binaryPath, shimBinaryPath) {
  // Update the shim to use the correct path
  shim = shim.replace(
    'const binaryName = "";',
    `const binaryName = "${binaryPath}";`
  );

  // Prefix with a shebang + required imports so that they're not changed by NCC
  shim = `#!/usr/bin/env node

  const util = require("util");
  const exec = util.promisify(require("child_process").exec);

  ${shim}`;

  // Execute the included function
  shim += `\n\nshim();`;

  // Write out the shim and make it executable
  await fs.writeFile(shimBinaryPath, shim);
  await fs.chmod(shimBinaryPath, "700");

  // Add the shshimDestination
  const shimDestination = path.dirname(shimBinaryPath);
  core.addPath(shimDestination);
};
