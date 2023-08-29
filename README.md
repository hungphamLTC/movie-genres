# Movie Rental Application

Description: This project is a movie rental application that allows users to browse and rent movies. It utilizes Node.js, Express.js, and MongoDB for the backend, and provides RESTful APIs for managing genres, customers, movies, and rentals.

## Usage:

- Make sure the application is running.
- Use an API testing tool like Postman to interact with the provided API routes.
- Refer to the API documentation below for details on the available routes and their usage.

#### /api/genres

- GET: Get all genres
- GET /:id - Get a specific genre by ID
- POST: Create a new genre
- PUT /:id - Update a genre by ID
- DELETE /:id - Delete a genre by ID

#### /api/customers

- GET: Get all customers
- GET /:id : Get a specific customer by ID
- POST: Create a new customer
- PUT /:id : Update a customer by ID
- DELETE /:id : Delete a customer by ID

#### /api/movies

- GET: Get all movies
- GET /:id : Get a specific movie by ID
- POST: Create a new movie
- PUT /:id : Update a movie by ID
- DELETE /:id : Delete a movie by ID

#### /api/rentals

- GET: Get all rentals
- GET /:id : Get a specific rental by ID
- POST: Create a new rental

#### /api/users

- GET /me: Get the logged user information by verifying token
- POST: Register a new user

#### /api/auth

POST: Authenticate a user and generate a token
