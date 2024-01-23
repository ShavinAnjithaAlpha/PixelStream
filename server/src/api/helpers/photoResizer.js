const sharp = require("sharp");
const fs = require("fs");

const inputFile = "C:\\Users\\User\\Downloads\\public\\books.jpg";
const outputFile = "C:\\Users\\User\\Downloads\\public\\books-small.jpg";

const width = 1000;
const height = 800;

const writeStream = fs.createWriteStream(outputFile);

sharp(inputFile)
  .resize(width, height, {
    fit: "inside",
    withoutEnlargement: true,
  })
  .pipe(writeStream)
  .on("finish", () => {
    console.log("resized image");
  })
  .on("error", (err) => {
    console.log(err);
  });
