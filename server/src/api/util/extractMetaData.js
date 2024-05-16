const exif = require("exiftool");
// const exif = require("exiftool-vendored").exiftool;

async function extractMetaData(fileData) {
  try {
    try {
      const metadata = await exifPromise(fileData);
      return {
        fileSize: calculateBytes(metadata.fileSize) || 0,
        resolution: calculateResolution(metadata),
        capturedFrom: metadata.cameraModelName || "Unknown",
        orientation: getOrientation(metadata),
      };
    } catch (err) {
      return { error: "Cannot read metadata" };
    }
  } catch (err) {
    return { error: "Cannot read file" };
  }
}

async function getImageType(fileData) {
  try {
    const metadata = await exifPromise(fileData);
    return metadata.mimeType;
  } catch (err) {
    return "Unknown";
  }
}

function exifPromise(data) {
  return new Promise((resolve, reject) => {
    exif.metadata(data, function (err, metadata) {
      if (err) reject(err);
      resolve(metadata);
    });
  });
}

function calculateResolution(metadata) {
  if (metadata.imageSize) return metadata.imageSize;
  else if (metadata.resolution) return metadata.resolution;
  else if (metadata.imageWidth && metadata.imageHeight) {
    return `${metadata.imageWidth}x${metadata.imageHeight}`;
  } else if (
    metadata.xResolution &&
    metadata.yResolution &&
    metadata.resolutionUnit
  ) {
    return `${metadata.xResolution}x${metadata.yResolution} ${metadata.resolutionUnit}`;
  } else {
    return "0x0";
  }
}

function getOrientation(metadata) {
  const imageWidth = metadata.imageWidth;
  const imageHeight = metadata.imageHeight;

  if (imageWidth > imageHeight) {
    return "landscape";
  } else if (imageWidth < imageHeight) {
    return "portrait";
  } else {
    return "square";
  }
}

function calculateBytes(fileSizeString) {
  const [size, unit] = fileSizeString.split(" ");
  let bytes = 0;
  switch (unit) {
    case "GB":
      bytes = size * 1024 * 1024 * 1024;
      break;
    case "MB":
      bytes = size * 1024 * 1024;
      break;
    case "kB":
      bytes = size * 1024;
      break;
    case "KB":
      bytes = size * 1024;
    case "B":
      bytes = size;
      break;
    default:
      bytes = 0;
  }

  return parseInt(bytes);
}

function sizeStringFromBytes(bytes) {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  } else if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} kB`;
  } else {
    return `${bytes.toFixed(2)} B`;
  }
}

module.exports = {
  extractMetaData,
  sizeStringFromBytes,
  getImageType,
};
