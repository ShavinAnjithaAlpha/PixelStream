require("dotenv").config({ path: "../../../.env" });
const sharp = require("sharp");
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

async function resizeImage(inputFile, outputFile) {
  const width = 1000;
  const height = 800;

  const result = await sharp(inputFile)
    .resize(width, height, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .toFile(outputFile);
}

async function uploadFileToBlob(filePath, containerName, outputFile) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = Date.now().toString() + "_" + path.basename(filePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await resizeImage(filePath, outputFile);

  const fileStream = fs.createReadStream(outputFile);

  const uploadBlobResponse = await blockBlobClient.uploadStream(
    fileStream,
    fs.statSync(outputFile).size
  );

  console.log("uploaded!");
}

// createFile();
// displayFiles();
uploadFileToBlob(
  "C:\\Users\\User\\Downloads\\public\\books.jpg",
  containerName,
  "C:\\Users\\User\\Downloads\\public\\books-small.jpg"
);
