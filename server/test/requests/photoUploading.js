const fs = require("fs");
const axios = require("axios");

const directoryPath = "D:\\Dev\\WebApps\\PhotoShav\\upload\\";
// Replace with the actual directory path

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach(async (file) => {
    const filePath = `${directoryPath}/${file}`;
    const fileData = fs.readFileSync(filePath);

    try {
      const response = await axios.put(
        "http://localhost:3000/api/photos/",
        {
          url: filePath,
          title: "Test Photo",
          description: "This is a test photo",
          location: "Sri Lanka",
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXZpbiIsInVzZXJJZCI6MSwiaWF0IjoxNzA0MTkxNjMzLCJleHAiOjE3MDQ1NTE2MzN9.4Uhbvp3PCz8FA641_zvJLXYHHiKKa5EpYAItzQu9Mjg",
          },
        }
      );

      console.log(`Uploaded ${file} successfully. Response:`, response.data);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error.message);
    }
  });
});
