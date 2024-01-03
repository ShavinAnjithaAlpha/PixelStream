const axios = require("axios");

const url = "http://localhost:3000/photos"; // your API endpoint
const formData = new FormData();

const file = new Blob([""], {
  type: "text/plain",
});
formData.append("photo", file); // file is a File object

axios
  .post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then((response) => {
    console.log("Success:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
