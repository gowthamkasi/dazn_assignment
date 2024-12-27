# Movie Lobby API

## Overview

The Movie Lobby API is a RESTful API designed for managing a collection of movies. It allows users to list, search, add, update, and delete movies in a lobby. The API is built using TypeScript, Express, and MongoDB.

## Features

- List all movies
- Search for movies by title or genre
- Add new movies (admin only)
- Update existing movie information (admin only)
- Delete movies (admin only)

## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/movie-lobby-api.git
   cd movie-lobby-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the MongoDB connection in `.env` with your MongoDB URI. See `.env.example`

4. Start the application:
   ```
   npm run start
   ```

## API Documentation

[Documentation](https://b44ebz6dfl.apidog.io/)

### Endpoints

#### 1. List all movies

- **URL:** `/movies`
- **Method:** `GET`
- **Response:**
  - 200 OK: Returns a list of all movies.

#### 2. Search for a movie

- **URL:** `/search?q={query}`
- **Method:** `GET`
- **Response:**
  - 200 OK: Returns a list of movies matching the query.

#### 3. Add a new movie

- **URL:** `/movies`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Movie Title",
    "genre": "Movie Genre",
    "rating": "Movie Rating",
    "streamingLink": "Streaming Link"
  }
  ```
- **Response:**
  - 201 Created: Returns the added movie.

#### 4. Update an existing movie

- **URL:** `/movies/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "title": "Updated Movie Title",
    "genre": "Updated Movie Genre",
    "rating": "Updated Movie Rating",
    "streamingLink": "Updated Streaming Link"
  }
  ```
- **Response:**
  - 200 OK: Returns the updated movie.

#### 5. Delete a movie

- **URL:** `/movies/:id`
- **Method:** `DELETE`
- **Response:**
  - 200  Successfully deleted the movie.

## Testing

To run the tests, use the following command:

```
npm run test
```

## Code Quality

This project uses ESLint for code quality checks. To run ESLint, use:

```
npm run lint
```

## License

This project is licensed under the MIT License.
