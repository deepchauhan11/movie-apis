Movie API Documentation
Overview
The Movie API provides endpoints for creating, retrieving, updating, and deleting movies. It is built using Node.js and MongoDB. The API allows clients to perform CRUD operations on movies in the database using RESTful API calls.

Endpoints
1. Get a list of movies
Retrieves a list of all movies in the database.
URL: /movies
HTTP Method: GET
Request Body: None
Response Body:

2. Get a single movie
Retrieves a single movie from the database based on its ID.
URL: /movies/:id
HTTP Method: GET
Request Body: None
Response Body:

3. Delete a movie
Deletes a movie from the database based on its ID.
URL: /movies/:id
HTTP Method: DELETE
Request Body: None
Response Body:

4. Update a movie
Updates a movie in the database based on its ID.
URL: /movies/:id
HTTP Method: PUT
Request Body:
{
    "name": "string",
    "year": "number",
    "genre": "string",
}

5. Create a movie
Creates a new movie in the database.
URL: /movies
HTTP Method: POST
Request Body:
{
    "name": "string",
    "year": "number",
    "genre": "string",
}

6. Get movies based on name search
Retrieves a list of movies from the database based on a search query for the movie name.
URL: /movies/search
HTTP Method: GET
Request Body: None
Query Parameters: name
