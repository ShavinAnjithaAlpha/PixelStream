<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ShavinAnjithaAlpha/PixelStream">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h1 align="center">PixelStream - Stock Photography Platform</h1>

  <p align="center">
    An awesome photo streaming platform for photographers and photo enthusiasts!
    <br />
    <a href="https://github.com/ShavinAnjithaAlpha/PixelStream"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ShavinAnjithaAlpha/PixelStream">View Demo</a>
    ·
    <a href="https://github.com/ShavinAnjithaAlpha/PixelStream/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/ShavinAnjithaAlpha/PixelStream/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
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

![PixelStream-final-25](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/dbc3837a-1c17-41cf-aa09-011d64139ac5)

PixelStream is a photo streaming platform for photographers and photo enthusiasts. It allows users to upload, share, and view photos from around the world. The platform provides a simple and intuitive interface for users to interact with the photos and photographers they love. Also, it provides a platform for photographers to showcase their work and connect with other photographers, so they can learn and grow together.

### Features of PixelStream

- **Photo Uploading**: Easily upload images along with relevant information such as properties, camera specifications, and tags.
- **Collection Management**: Customize and manage collections, include related photos, and edit collection properties.
- **Profile Management**: Showcase your work to the public and connect with other users through profile management. folow other users and get followed by other users. Also tracked the liked photos and downloaded photos.
- **Content Searching**: advanced searching capabilities for photos, collections, and users using tags and properties.
- **Unique UI**: Experience a unique user interface with a dynamic background and a modern dark color theme for a seamless user experience.
- **Photo Management**: manage your photos by editing their properties, adding tags, and viewing their statistics.
- **Engagement Featured**: Easily manage your photos by expressing your preferences through liking or disliking, and download them for convenient access. Leave comments to provide feedback and engage with others.
- **Statistics Tracking**: Track the statistics of your photos, collections, and user profile to understand your audience and improve your content.

PixelStream is a web-based application that operates its user interface directly in the browser. Its server-side backend is constructed entirely with Node.js and Express.js, which provides a RESTful API for the frontend to consume. The frontend, on the other hand, is built with React.js and employs the React Context API for efficient state management. Additionally, the application uses Vanilla CSS for styling and is designed as a single-page application (SPA) that relies on React Router for navigation. Redis is used as a http cache between the backend and the frontend to improve the performance of the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- - [![React][React.js]][React-url] -->

<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" alt="nodejs" height="40"/> </a>
<a href="https://redis.io" rel="noreferrer"><img src="https://www.svgrepo.com/show/303460/redis-logo.svg" alt="Redis" width="40" /> </a>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<img src="https://www.svgrepo.com/show/349330/css3.svg" alt="CSS3" width="40" />

- Backend and API: **Node.js with Express**
- Database: **MySQL**
- Cache: **Redis**
- Frontend: **React with Vanilla CSS**

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

4. Setup the Azure blob storage account

   create an azure blob storage account and get the nessasary credentials and urls mentioned in the `.env.axample` file

5. Create the `.env` file for the server

   use the template procide in the `.env.example` file and create a new `.env` file in the `server` folder. Update the values with the actual values.

   ```js
   PORT={PORT}
   NODE_ENV={node environment mode}
   AZURE_CONNECTION_STRING={azure connection string}
   BLOB_CONTAINER_NAME={blob container name}
   AZURE_STORAGE_ACCOUNT={azure storage account}
   NEW_RELIC_APP_NAME={new relic app name} // optional
   NEW_RELIC_LICENSE_KEY={new relic license key} // optional

   REDIS_URL={redis url}

   // database configurations (ldevelopment database)
   MYSQL_HOST={database hostname}
   MYSQL_USER={database username}
   MYSQL_PASSWORD={database password}
   MYSQL_DATABASE={database name} // default: pixelstream
   MYSQL_PORT={database port} // default: 3306

   // optional (only if you use a production database)
   MYSQL_HOST_PROD={production database hostname}
   MYSQL_USER_PROD={production database username}
   MYSQL_PASSWORD_PROD={production database password}
   MYSQL_DATABASE_PROD={production database name} // default: pixelstream
   MYSQL_PORT_PROD={production database port} // default: 3306
   ```

   **Note**: The `NEW_RELIC_APP_NAME` and `NEW_RELIC_LICENSE_KEY` are optional. If you want to use the new relic monitoring you can add these values to the `.env` file.
   Also, production database confogurations are optional, only use if you have a production database.

6. Create the `.env` file for the frontend
7. use the template procide in the `.env.example` file and create a new `.env` file in the `client` folder. Update the values with the actual values.

   ```js
   VITE_PORT={PORT}
   VITE_APP_API_URL={backend api url}

   VITE_LOCATION_API_URL={geoapify api url}
   VITE_LOCATION_API_KEY={geoapify api key}

   ```

   **Note**: The `VITE_REDIS_URL` is optional. If you want to use the redis cache you can add this value to the `.env` file.

8. Start the backend server

   ```sh
   cd server
   npm start
   ```

9. Run the frontend server

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

Here are some screenshots of the PixelStream Web platform:

![PixelStream-final-8](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/4cd410bf-f132-4a4f-9971-7778e9a662af)
<br />
![PixelStream-final-14](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/cbc3a991-c1e5-4f1b-97a5-1d07c3f1fd78)
<br />
![PixelStream-final-19](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/080aa64c-c9ac-43e6-8ac7-b95e1aa501c5)
<br />
![PixelStream-final-20](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/95e82381-a418-444d-b3dc-1af07e954bfb)
<br />
![PixelStream-final-21](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/28c92ec5-cf5b-452b-a063-59794f0c27b2)
<br />
![PixelStream-final-22](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/ebeaf75d-f0db-4e53-871b-1c2880322d8f)
<br />
![PixelStream-final-28](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/e24ac255-2db0-4a1b-a17a-84af0d98382e)
<br />
![PixelStream-final-30](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/38c06b45-fb52-49c0-8bf6-b546061c7af6)
<br />
![PixelStream-final-13](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/599e0c00-779a-4252-a0a8-cdd9e32fce8d)
<br />
![PixelStream-final-10](https://github.com/ShavinAnjithaAlpha/PixelStream/assets/85817726/ebedc5b2-0c59-4602-92d5-e27e189d472a)
<br />

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

- Shavin Anjitha ([shavin@shavin.live](mailto:shavin@shavin.live))
  ([LinkedIn](https://www.linkedin.com/in/shavin-anjitha-chandrawansha-555323229/)) ([Portfolio](https://shavinanjitha.me))

- Project Link: [https://github.com/ShavinAnjithaAlpha/PixelStream](https://github.com/ShavinAnjithaAlpha/game-of-life)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Redis](https://redis.io/)
- [Font Awesome Icons](https://fontawesome.com)
- [Material UI Icons](https://mui.com/material-ui/material-icons/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
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
