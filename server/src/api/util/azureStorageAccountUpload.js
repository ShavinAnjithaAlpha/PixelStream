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

function getNormalBlobName(fileName) {
  return Date.now() + "_" + uuidv4() + "_" + fileName;
}

function getResizedBlobName(fileName, tailName) {
  return (
    Date.now() +
    "_" +
    uuidv4() +
    "_" +
    path.basename(fileName, path.extname(fileName)) +
    "-" +
    tailName +
    path.extname(fileName)
  );
}

function getResizedOutputFile(fileName) {
  return (
    path.dirname(filePath) +
    "\\" +
    path.basename(filePath, path.extname(filePath)) +
    "-thumb" +
    path.extname(filePath)
  );
}

async function uploadFileToBlob(file) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // make a unique name for the uploaded blob
    const blobName = getNormalBlobName(file.originalname);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // upload the file to the blob storage
    const uploadBlobResponse = await blockBlobClient.uploadData(
      file.buffer,
      file.size
    );

    return generateBlobUrl(blobName);
  } catch (err) {
    return { error: err.message };
  }
}

async function uploadResizedImage(file) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // make a unique name for the uploaded blob
    const blobName = getResizedBlobName(file.originalname, "thumb");

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // lets resize the image using resizing function
    const resizedImage = await resizeImage(file.buffer, WIDTH, HEIGHT);
    if (resizedImage) {
      // upload the file to the blob storage
      const uploadBlobResponse = await blockBlobClient.uploadData(
        resizedImage.buffer,
        resizedImage.size
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
