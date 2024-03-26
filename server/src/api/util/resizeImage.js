const sharp = require("sharp");
const fs = require("fs");

async function resizeImage(fileData, width, height) {
  try {
    const outputBuffer = await sharp(fileData)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer();

    return outputBuffer;
  } catch (err) {
    return false;
  }
}
module.exports = resizeImage;
