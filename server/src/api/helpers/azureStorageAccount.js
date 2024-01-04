require("dotenv").config({ path: "../../../.env" });

const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");

const connStr = process.env.AZURE_CONNECTION_STRING || null;

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

async function displayContainers() {
  let i = 1;
  let containers = blobServiceClient.listContainers();
  for await (const container of containers) {
    console.log(`Container ${i++}: ${container.name}`);
  }
}
const containerName = "photo-shav";

async function displayFiles() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  let i = 1;
  let blobs = containerClient.listBlobsFlat();
  for await (const blob of blobs) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}

async function createFile() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = "Hello world!";
  const blobName = "newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length
  );
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);
}

async function uploadFileToBlob(filePath, containerName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = Date.now().toString() + "_" + path.basename(filePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const fileStream = fs.createReadStream(filePath);

  const uploadBlobResponse = await blockBlobClient.uploadStream(
    fileStream,
    fs.statSync(filePath).size
  );

  console.log(`Upload file ${blobName} successfully`, uploadBlobResponse);
}

// createFile();
// displayFiles();
uploadFileToBlob(
  "D:\\Dev\\WebApps\\PhotoShav\\server\\src\\upload\\20231209_222249.jpg",
  containerName
);
