const createShim = require("./create-shim");
const rename = require("./rename");

module.exports = async function (originalName, newName) {
  newName = newName || `${originalName}-original`;

  // Rename the original binary to a new name
  const binaryPath = await rename(originalName, newName);

  // Install the shim
  await createShim(originalName, binaryPath);
};
