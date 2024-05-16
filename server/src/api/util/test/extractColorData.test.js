const extractPhotoColors = require("../extractColorData");
const { describe, it, expect } = require("@jest/globals");
const fs = require("fs");

async function readColors() {
  const data = fs.readFileSync("./blue.jpg");
  const colors = await extractPhotoColors(data);
  console.log(colors);
}

// beforeAll(() => {
//   const data = fs.readFileSync("./blue.jpg");
//   global.photoData = data;
// });

// describe("Extract color data", () => {
//   it("should return an array of colors", async () => {
//     const colors = await extractPhotoColors(global.photoData);
//     expect(colors).toBeInstanceOf(Array);
//   });
// });
