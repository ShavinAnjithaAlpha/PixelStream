const axios = require("axios");
const fs = require("fs");

const directoryPath = "C:\\Users\\User\\Downloads\\public";

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

function getRandomDescription() {
  const descriptions = [
    "A breathtaking photo that captures the essence of the moment.",
    "An awe-inspiring scene that will leave you speechless.",
    "A picture-perfect moment frozen in time.",
    "A visual masterpiece that evokes a sense of wonder.",
    "A stunning display of nature's beauty.",
    "An enchanting image that tells a story.",
    "A captivating view that will transport you to another world.",
    "A work of art that celebrates the beauty of our surroundings.",
    "A mesmerizing photo that demands your attention.",
    "A snapshot of pure serenity and tranquility.",
    "A glimpse into a world filled with endless possibilities.",
    "A visual feast for the eyes.",
    "A moment of pure bliss captured on camera.",
    "A striking image that leaves a lasting impression.",
    "A testament to the power of photography.",
    "A window into a world of imagination and creativity.",
    "A picture that speaks a thousand words.",
    "A sight that will take your breath away.",
    "A reminder of the beauty that surrounds us.",
    "A snapshot of a fleeting moment in time.",
    "A visual symphony of colors and textures.",
    "A photo that captures the essence of a place or event.",
    "A glimpse into the extraordinary.",
    "A celebration of the ordinary made extraordinary.",
    "A visual journey that invites you to explore.",
    "A moment of pure joy frozen in time.",
    "A reflection of the world as seen through the lens of a camera.",
    "A testament to the power of observation and perspective.",
    "A reminder of the beauty that lies in the details.",
    "A snapshot of life's fleeting moments.",
    "A visual escape from the ordinary.",
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function getRandomLocation() {
  const locations = [
    "Paris, France",
    "New York City, USA",
    "Tokyo, Japan",
    "Rome, Italy",
    "Sydney, Australia",
    "London, UK",
    "Barcelona, Spain",
    "Cape Town, South Africa",
    "Rio de Janeiro, Brazil",
    "Amsterdam, Netherlands",
    "Dubai, UAE",
    "San Francisco, USA",
    "Bali, Indonesia",
    "Prague, Czech Republic",
    "Santorini, Greece",
    "Havana, Cuba",
    "Venice, Italy",
    "Machu Picchu, Peru",
    "Serengeti National Park, Tanzania",
    "Great Barrier Reef, Australia",
    "Grand Canyon, USA",
    "Petra, Jordan",
    "Marrakech, Morocco",
    "Iguazu Falls, Argentina/Brazil",
    "Chichen Itza, Mexico",
    "Taj Mahal, India",
    "Eiffel Tower, France",
    "Mount Everest, Nepal",
    "Victoria Falls, Zambia/Zimbabwe",
    "Pyramids of Giza, Egypt",
    "Niagara Falls, Canada/USA",
  ];

  return locations[Math.floor(Math.random() * locations.length)];
}

const photoData = [];

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach(async (file) => {
    const filePath = `${directoryPath}/${file}`;
    // const fileData = fs.readFileSync(filePath);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/photos/",
        {
          url: filePath,
          title: getRandomTitle(),
          description: getRandomDescription(),
          location: getRandomLocation(),
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN1cHVuIiwidXNlcklkIjozLCJpYXQiOjE3MDU4MTU2OTMsImV4cCI6MTcwNjE3NTY5M30.glqeyVWTgtvNsLTNs9WtMn55ITOIDSjRu1NpioE6xT8",
          },
        }
      );

      console.log(`Uploaded ${file} successfully. Response:`, response.data);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error.message);
    }
  });
});
