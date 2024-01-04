const { v4: uuidv4 } = require("uuid");

// ...

const blobName = Date.now() + "_" + uuidv4();
console.log(blobName);
