const { faker } = require("@faker-js/faker");
const axios = require("axios");
const registerUser = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      user
    );
    console.log("User registered successfully!");
    console.log(response.data);
  } catch (error) {
    console.log("Error registering user!");
    console.error(error);
  }
};

const registerRandomUsers = async (count) => {
  const maxBioLength = 100;

  for (let i = 0; i < count; i++) {
    const username = faker.internet.userName();
    let bio = faker.lorem.sentences();
    if (bio.length > maxBioLength) {
      bio = bio.substring(0, maxBioLength);
    }

    const user = {
      username: username,
      email: faker.internet.email(),
      password: username,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      bio: bio,
    };
    // console.log(user);
    await registerUser(user);
  }
};

registerRandomUsers(20);
