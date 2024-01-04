const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const connStr = process.env.AZURE_CONNECTION_STRING || null;

// storage account credentials
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerName = process.env.BLOB_CONTAINER_NAME;

async function uploadFileToBlob(filePath) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // make a unique name for the uploaded blob
    const blobName =
      Date.now() + "_" + uuidv4() + "_" + path.basename(filePath);

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

function generateBlobUrl(blobName) {
  return `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${containerName}/${blobName}`;
}

module.exports = {
  uploadFileToBlob,
};
