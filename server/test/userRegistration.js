const { faker } = require("@faker-js/faker");
const axios = require("axios");
const registerUser = async (user) => {
  try {
    const response = await axios.post(
      "https://localhost:3000/api/auth/register",
      user
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const registerRandomUsers = async (count) => {
  for (let i = 0; i < count; i++) {
    const username = faker.internet.userName();
    const user = {
      username: username,
      email: faker.internet.email(),
      password: username,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      bio: faker.lorem.sentences(),
    };
    console.log(user);
    await registerUser(user);
  }
};

registerRandomUsers(1);
