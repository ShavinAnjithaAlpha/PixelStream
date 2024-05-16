const getColors = require("get-image-colors");
const { getImageType } = require("./extractMetaData");

async function extractPhotoColors(fileData) {
  try {
    const mimeType = await getImageType(fileData);

    if (mimeType === "image/jpeg" || mimeType === "image/png") {
      const colors = await getColors(fileData, mimeType);
      const colorData = colors.map((color) => color.hex());
      return colorData;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
}

module.exports = extractPhotoColors;
