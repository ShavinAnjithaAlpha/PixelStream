### Architeture of the Backend

The backend of the application is constructed using Node.js and Express.js. To facilitate communication with the frontend, it employs a RESTful API. This API can be adapted and integrated with other applications, such as mobile apps, with the appropriate customizations and permissions. The backend utilizes MySQL as its database to store all data. Additionally, Azure Blob Storage is employed to store images uploaded by users.

The architecture of the backend is typical three layered architecture that most of the web applications and API services use. The three layers are:

- <b>Controller Layer</b>

  The controller layer is responsible for handling the incoming requests from the frontend and sending the response back to the frontend. The controller layer is the entry point of the backend server. It is responsible for routing the requests to the appropriate service layer and sending the response back to the frontend.

- <b>Service Layer</b>

  The service layer is responsible for handling the business logic of the application. It is responsible for processing the data and sending it to the database layer for storage. The service layer is the core of the backend server. It is responsible for processing the data and sending it to the database layer for storage.

- <b>Data Access Layer</b>

  The data access layer is responsible for interacting with the database. It is responsible for fetching the data from the database and sending it to the service layer for processing. The data access layer is the interface between the backend server and the database. It is responsible for fetching the data from the database and sending it to the service layer for processing.

### RESTful API Endpoints

#### 1. `/api/auth`

- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Login to an existing user account
- `POST /api/auth/change-password` - Change the password of the user account (<span style="color:blue">Authenticated</span>)

#### 2. `/api/account` (<span style="color:blue">Authenticated</span>)

- `POST /api/account/:username/` - Update the user account
- `DELETE /api/account/:username/` - Delete the user account
- `GET /api/account/:username/downloads` - Get the downloads of the user account
- `POST /api/account/:username/interrest` - Update the interrest of the user account
- `POST /api/account/:username/change-profile-image` - Change the profile image of the user account

#### 3. `/api/photos`

- `GET /api/photos` - Get photos with paginations
- `GET /api/photos/:id` - Get a photo by id
- `POST /api/photos` - Upload a new photo (<span style="color:blue">Authenticated</span>)
- `POST /api/photos/:id/like` - Like a photo (<span style="color:blue">Authenticated</span>)
- `POST /api/photos/:id/dislike` - Dislike a photo (<span style="color:blue">Authenticated</span>)
- `POST /api/photos/:id/download` - Download a photo with user tracking (<span style="color:blue">Authenticated</span>)
- `GET /api/photos/:id/get` - download a photo without user tracking
- `GET /api/photos/random` - Get random photo/s based on teh query parameters
- `GET /api/photos/:id/statistics` - Get the statistics of a photo
- `GET /api/photos/tags` - Get all the tags with paginations
- `POST /api/photos/likes` - Get all the likes related with a user
- `DELETE /api/photos/:id/like` - Delete a like from a photo (<span style="color:blue">Authenticated</span>)
- `DELETE /api/photos/:id/dislike` - Delete a dislike from a photo (<span style="color:blue">Authenticated</span>)
- `GET /api/photos/:id/tags` - Get all the tags related with a photo
- `POST /api/photos/:id/tags` - Add new tags to a photo (<span style="color:blue">Authenticated</span>)
- `GET /api/photos/:id/like` - Get the like status of a photo (<span style="color:blue">Authenticated</span>)
- `GET /api/photos/:id/dislike` - Get the dislike status of a photo (<span style="color:blue">Authenticated</span>)

#### 4. `/api/collections`

- `GET /api/collections` - Get all the collections with paginations
- `GET /api/collections/:id` - Get a collection by id
- `POST /api/collections` - Create a new collection (<span style="color:blue">Authenticated</span>)
- `PUT /api/collections/:id` - Update a collection (<span style="color:blue">Authenticated</span>)
- `DELETE /api/collections/:id` - Delete a collection (<span style="color:blue">Authenticated</span>)
- `GET /api/collections/:id/photos` - Get all the photos related with a collection
- `POST /api/collections/:id` - Add a photo to a collection (<span style="color:blue">Authenticated</span>)
- `GET /api/colletions/:id/related` - Get all the related collections with a collection

#### 5. `/api/search`

- `GET /api/search/photos` - Search photos with paginations
- `GET /api/search/collections` - Search collections with paginations
- `GET /api/search/users` - Search users with paginations

#### 6. `/api/stats`

- `GET /api/stats/total` - Get the total statistics of the platform
- `GET /api/stats/month` - Get the monthly statistics of the platform

#### 7. `/api/users`

- `GET /api/users` - Get all the users with paginations
- `GET /api/users/:username` - Get a public profile of a user by username
- `GET /api/users/:username/intereests` - Get the interrests of a user
- `GET /api/users/:username/photos` - Get all the photos uploaded by a user
- `GET /api/users/:username/collections` - Get all the collections created by a user
- `GET /api/users/:username/likes` - Get all the likes of a user
- `GET /api/users/:username/stat` - Get the statistics of a user
- `POST /api/users/:username/follow` - Follow a user
- `GET /api/users/:username/portfolio` - Get the portfolio of a user

#### Special Notes

- The endpoints marked with <span style="color:blue">Authenticated</span> are protected routes. The user must be authenticated to access these routes. The user must provide a valid JWT token in the Authorization header to access these routes.
