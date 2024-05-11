const axios = require("axios");
const fs = require("fs");

// Replace 'YOUR_ACCESS_KEY' with your Unsplash access key
const accessKey = "uK2sSJyK7kRJFIAcFZDpdwUZ3-Huw0rlvuqdyY0PDBI";
const apiUrl = "https://api.unsplash.com/photos/random";
const numberOfPhotos = 50; // Specify the number of photos you want to download

function getRandomTitle() {
  const titles = [
    "Majestic Waterfalls",
    "Enchanting Sunsets",
    "Urban Exploration",
    "Captivating Landscapes",
    "Colorful Adventures",
    "Hidden Treasures",
    "Mountain Majesty",
    "Coastal Serenity",
    "Whispering Woods",
    "Architectural Marvels",
    "Tranquil Waters",
    "Rural Charm",
    "Aerial Perspectives",
    "Historical Wonders",
    "Dreamy Skies",
    "Wildlife Encounters",
    "Artistic Expressions",
    "Magical Moments",
    "Reflective Beauty",
    "Thrilling Expeditions",
    "Charming Streets",
    "Serenity Unleashed",
    "Exquisite Details",
    "Dramatic Horizons",
    "Peaceful Retreats",
    "Dynamic Cityscapes",
    "Whimsical Delights",
    "Timeless Elegance",
    "Natural Marvels",
    "Architectural Gems",
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}

async function getRandomPhotos() {
  try {
    const response = await axios.get(
      `${apiUrl}?count=${numberOfPhotos}&client_id=${accessKey}`
    );
    const photos = response.data;

    // Download each photo
    photos.forEach(async (photo, index) => {
      const photoUrl = photo.urls.full;
      await downloadPhoto(
        photoUrl,
        `C:/Users/User/Downloads/photo_${getRandomTitle()}_${Date.now()}.jpg`
      );
    });

    console.log(`${numberOfPhotos} photos downloaded successfully.`);
  } catch (error) {
    console.error("Error fetching random photos:", error.message);
  }
}

async function downloadPhoto(url, destination) {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(destination);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Error downloading photo:", error.message);
  }
}

getRandomPhotos();
