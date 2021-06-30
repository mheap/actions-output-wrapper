const createShim = require("./create-shim");
const rename = require("./rename");

module.exports = async function ({ originalName, newName, shimBinaryPath }) {
  newName = newName || `${originalName}-original`;

  // Rename the original binary to a new name
  const { existingBinaryPath, newBinaryPath } = await rename(
    originalName,
    newName
  );

  // Replace the existing binary with our shim
  shimBinaryPath = shimBinaryPath || existingBinaryPath;

  // Install the shim
  return await createShim(newBinaryPath, shimBinaryPath);
};
