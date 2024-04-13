<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h1 align="center">PixelStream - Photo Streaming Platform</h1>

  <p align="center">
    An awesome photo streaming platform for photographers and photo enthusiasts!
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![alt text](image.png)

PixelStream is a photo streaming platform for photographers and photo enthusiasts. It allows users to upload, share, and view photos from around the world. The platform provides a simple and intuitive interface for users to interact with the photos and photographers they love. Also, it provides a platform for photographers to showcase their work and connect with other photographers, so they can learn and grow together.

### Features of PixelStream

- Create photographer profiles
- Upload photos
- Photo Collections
- Like/Dislike on photos
- Search for photos, collections and photographers
- Follow/Unfollow photographers
- Track photo views, downloads, and likes
- View your profile and stats
- View other photographers' profiles and stats

PixelStream is a web-based application that operates its user interface directly in the browser. Its server-side backend is constructed entirely with Node.js and Express.js, which provides a RESTful API for the frontend to consume. The frontend, on the other hand, is built with React.js and employs the React Context API for efficient state management. Additionally, the application uses Vanilla CSS for styling and is designed as a single-page application (SPA) that relies on React Router for navigation.

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Node][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- NPM package manager
  ```sh
  npm install npm@latest -g
  ```
- MySQL
- Vite (for the frontend)

Also you want to have an Azure Blob Storage account to store the images uploaded by the users.
if you don't have an Azure account you can create a free account [here](https://azure.microsoft.com/en-us/free/)

if you want to use the **new relic** monitoring you can create a new relic account and get the license key and app name.
[New Relic](https://newrelic.com/)

### Installation

To get a local copy up and running follow these simple steps.

1. Clone the repo

   ```sh
   git clone https://github.com/ShavinAnjithaAlpha/PhotoShav
   ```

2. Install NPM packages for the frontend

   ```sh
   cd client
   npm install
   ```

3. Install NPM packages for the backend

   ```sh
   cd server
   npm install
   ```

4. Setup the MySQL database

   ```sh
   cd server/src/config
   ```

   open the config.json and update the database credentials and configurations for the development environment

5. Setup the Azure blob storage account

   create an azure blob storage account and get the nessasary credentials and urls mentioned in the `.env.axample` file

6. Create the `.env` file for the server

   use the template procide in the `.env.example` file and create a new `.env` file in the `server` folder. Update the values with the actual values.

   ```js
   PORT={PORT}
   NODE_ENV={node environment mode}
   AZURE_CONNECTION_STRING={azure connection string}
   BLOB_CONTAINER_NAME={blob container name}
   AZURE_STORAGE_ACCOUNT={azure storage account}
   NEW_RELIC_APP_NAME={new relic app name} // optional
   NEW_RELIC_LICENSE_KEY={new relic license key} // optional
   ```

   **Note**: The `NEW_RELIC_APP_NAME` and `NEW_RELIC_LICENSE_KEY` are optional. If you want to use the new relic monitoring you can add these values to the `.env` file.

7. Start the backend server

   ```sh
   cd server
   npm start
   ```

8. Run the frontend server

   ```sh
   cd client
   npm start
   ```

   If you want to run the server and client at the same time you can use the following command

   ```sh
    npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Shavin Anjitha - [@twitter_handle](https://twitter.com/twitter_handle) - shavin@shavin.live

Project Link: [https://github.com/ShavinAnjithaAlpha/PhotoShav](https://github.com/ShavinAnjithaAlpha/PhotoShav)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white

```

```
