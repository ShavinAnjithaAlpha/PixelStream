const fs = require("fs");
const axios = require("axios");

const directoryPath = "D:\\Dev\\WebApps\\PhotoShav\\upload\\";
// Replace with the actual directory path

const titles = [
  "Beautiful Sunset",
  "Exploring Nature",
  "City Lights",
  "Adventures Await",
  "Serene Beach",
  "Majestic Mountains",
  "Urban Jungle",
  "Tranquil Forest",
  "Vibrant Street Art",
  "Captivating Waterfall",
  "Ancient Ruins",
  "Colorful Landscapes",
  "Hidden Gems",
  "Rural Charm",
  "Architectural Marvels",
  "Wildlife Encounter",
  "Picturesque Countryside",
  "Iconic Landmarks",
  "Magical Gardens",
  "Aerial Perspectives",
];

const descriptions = [
  "A breathtaking view of the sunset over the horizon.",
  "Exploring the beauty of nature and discovering hidden gems.",
  "The vibrant lights of the city at night.",
  "Embarking on exciting adventures and creating lasting memories.",
  "Relaxing on a serene beach with crystal clear waters.",
  "Witnessing the grandeur of majestic mountains.",
  "Immersing in the hustle and bustle of the urban jungle.",
  "Finding peace and tranquility in a lush forest.",
  "Appreciating the creativity and colors of street art.",
  "Being mesmerized by the power and beauty of a waterfall.",
  "Exploring the remnants of ancient civilizations.",
  "Marveling at the diverse and colorful landscapes.",
  "Discovering hidden gems off the beaten path.",
  "Experiencing the charm of rural life.",
  "Admiring the architectural marvels of the world.",
  "Encountering fascinating wildlife in their natural habitat.",
  "Enjoying the picturesque beauty of the countryside.",
  "Visiting iconic landmarks and capturing their essence.",
  "Getting lost in the magic of enchanting gardens.",
  "Seeing the world from a different perspective with aerial photography.",
];

const locations = [
  "New York, USA",
  "Paris, France",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Rio de Janeiro, Brazil",
  "Cape Town, South Africa",
  "Rome, Italy",
  "Amsterdam, Netherlands",
  "Bali, Indonesia",
  "Machu Picchu, Peru",
  "Santorini, Greece",
  "Dubai, United Arab Emirates",
  "Barcelona, Spain",
  "Cairo, Egypt",
  "Havana, Cuba",
  "Reykjavik, Iceland",
  "Moscow, Russia",
  "Cape Verde",
  "Banff National Park, Canada",
  "Marrakech, Morocco",
];

const getRandomTitle = () => {
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomDescription = () => {
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomLocation = () => {
  return locations[Math.floor(Math.random() * locations.length)];
};

const photoData = [];

for (let i = 0; i < 20; i++) {
  const title = getRandomTitle();
  const description = getRandomDescription();
  const location = getRandomLocation();

  photoData.push({ title, description, location });
}

console.log(photoData);

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
          title: getRandomTitle(),
          description: getRandomDescription(),
          location: getRandomLocation(),
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
