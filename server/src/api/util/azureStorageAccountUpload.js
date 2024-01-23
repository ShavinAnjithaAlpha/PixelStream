const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const resizeImage = require("./resizeImage");

const connStr = process.env.AZURE_CONNECTION_STRING || null;

// storage account credentials
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerName = process.env.BLOB_CONTAINER_NAME;

// resized image width and height
const WIDTH = 1000;
const HEIGHT = 800;

function getNormalBlobName(filePath) {
  return Date.now() + "_" + uuidv4() + "_" + path.basename(filePath);
}

function getResizedBlobName(filePath, tailName) {
  return (
    Date.now() +
    "_" +
    uuidv4() +
    "_" +
    path.basename(filePath, path.extname(filePath)) +
    "-" +
    tailName +
    path.extname(filePath)
  );
}

function getResizedOutputFile(filePath) {
  return (
    path.dirname(filePath) +
    "\\" +
    path.basename(filePath, path.extname(filePath)) +
    "-thumb" +
    path.extname(filePath)
  );
}

async function uploadFileToBlob(filePath) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // make a unique name for the uploaded blob
    const blobName = getNormalBlobName(filePath);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const fileStream = fs.createReadStream(filePath);

    // upload the file to the blob storage
    const uploadBlobResponse = await blockBlobClient.uploadStream(
      fileStream,
      fs.statSync(filePath).size
    );

    return generateBlobUrl(blobName);
  } catch (err) {
    return { error: err.message };
  }
}

async function uploadResizedImage(filePath) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // make a unique name for the uploaded blob
    const blobName = getResizedBlobName(filePath, "thumb");

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // get the output file path to be uploaded
    const outputFile = getResizedOutputFile(filePath);
    // lets resize the image using resizing function
    const status = await resizeImage(filePath, outputFile, WIDTH, HEIGHT);

    const fileStream = fs.createReadStream(outputFile);

    if (status) {
      // upload the file to the blob storage
      const uploadBlobResponse = await blockBlobClient.uploadStream(
        fileStream,
        fs.statSync(filePath).size
      );

      return generateBlobUrl(blobName);
    } else {
      return { error: "error while image processing." };
    }
  } catch (err) {
    return { error: err.message };
  }
}

function generateBlobUrl(blobName) {
  return `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${containerName}/${blobName}`;
}

module.exports = {
  uploadFileToBlob,
  uploadResizedImage,
};
