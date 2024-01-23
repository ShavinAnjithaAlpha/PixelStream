const sharp = require("sharp");
const fs = require("fs");

async function resizeImage(inputFile, outputFile, width, height) {
  try {
    await sharp(inputFile)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFile(outputFile);
    return true;
  } catch (err) {
    return false;
  }
}
module.exports = resizeImage;
