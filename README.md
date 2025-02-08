## CrunchyrollCloneApp

The CrunchyrollClone is a platform to watch movies, tv shows and e animation, with a design inspirated on the old version of Crunchyroll.

## Hosting

The project is hosted on firebase, you can accesss then in the link below:  
**[https://crunchyroll-clone-app-f6419.web.app](https://crunchyroll-clone-app-f6419.web.app)**

## How to run the project in a local environment
## 1. Clone the repository
Clone the repository to your local machine using the command:

```bash
git clone https://github.com/fabriciosouza0/crunchyrollclone.git
```

## 2. Install the Angular CLI
If you don't already have Angular CLI installed, run the following command to install it globally:

```bash
npm install -g @angular/cli
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create two files in the src/environments/ directory:
##### - environment.ts for the development environment
##### - environment.prod.ts or the production environment
### For the development environment, use:

```bash
export const environment = { 
  production: false,
  apiKey: "", 
  baseApiUrl: "https://api.themoviedb.org/3/",
  baseImgUrl: "https://image.tmdb.org/t/p/",
  baseStreamUrl: "https://embed.warezcdn.link/",
};
```

### For the production environment, use:
```bash
export const environment = { 
  production: true,
  apiKey: "", 
  baseApiUrl: "https://api.themoviedb.org/3/",
  baseImgUrl: "https://image.tmdb.org/t/p/",
  baseStreamUrl: "https://embed.warezcdn.link/",
};
```

## 5. Get an API Key from The Movie Database (TMDb)
Create a TMDb account if you don't already have one.
After logging in, go to the API section.
Request an API Key.
Copy the provided JWT Token and paste it into the apiKey field of the environment.ts and environment.prod.ts files.

## 6. Running the Project
After configuring the environment files and installing dependencies, you can start the development server with the following command:

```bash
ng serve
```

Now, the project will be available at:
http://localhost:4200/

## Used technologies
### Angular
### Firebase Hosting
### The Movie Database API (TMDb)

## License
This project is under the MIT license. Please feel free to use, modify and distribute it. Please if you'll use it put my name in the project too :).