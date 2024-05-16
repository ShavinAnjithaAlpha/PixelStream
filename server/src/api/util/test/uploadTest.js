require("dotenv").config({ path: "../../../.env" });
const { uploadResizedImage } = require("../azureStorageAccountUpload");

inputFile = "C:\\Users\\User\\Downloads\\public\\books.jpg";

async function resizeAndUpload(inputFile) {
  const name = await uploadResizedImage(inputFile);
  console.log(name);
}

resizeAndUpload(inputFile);
