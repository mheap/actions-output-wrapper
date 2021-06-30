const io = require("@actions/io");
module.exports = async function (originalName, newName) {
  // Find the original binary path
  const binaryPath = await io.which(originalName, true);
  const newPath = binaryPath.replace(originalName, newName);

  // Rename the old binary to <binary>-original
  await io.mv(binaryPath, newPath);
  return newPath;
};
